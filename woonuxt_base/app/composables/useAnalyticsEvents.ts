export interface AnalyticsItem {
  id: string;
  name?: string | null;
  price: number;
  quantity: number;
}

const round2 = (value: number): number => Math.round((value + Number.EPSILON) * 100) / 100;

const sumValue = (items: AnalyticsItem[]): number => round2(items.reduce((total, item) => total + item.price * item.quantity, 0));

const toGa4Item = (item: AnalyticsItem) => ({
  item_id: item.id,
  item_name: item.name ?? undefined,
  price: item.price,
  quantity: item.quantity,
});

const toPixelContent = (item: AnalyticsItem) => ({ id: item.id, quantity: item.quantity, item_price: item.price });

/**
 * @name useAnalyticsEvents
 * @description Shared ecommerce event tracking pushed to both the GTM dataLayer (GA4 event
 * schema) and Meta Pixel (standard events). Mirrors the consent gating in gtm.client.ts /
 * meta-pixel.client.ts: nothing is pushed or sent to either vendor unless the visitor has
 * accepted analytics cookies, so declining consent means no ecommerce data is collected at all.
 */
export function useAnalyticsEvents() {
  const { hasAnalyticsConsent } = useCookieConsent();
  const config = useRuntimeConfig();
  const currency = computed(() => config.public?.CURRENCY_CODE || 'EUR');

  const pushDataLayer = (payload: Record<string, unknown>): void => {
    if (!import.meta.client) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  };

  const trackPixelEvent = (eventName: string, params: Record<string, unknown>, eventId?: string): void => {
    if (!import.meta.client || typeof window.fbq !== 'function') return;
    if (eventId) window.fbq('track', eventName, params, { eventID: eventId });
    else window.fbq('track', eventName, params);
  };

  /**
   * Fire when a product is added to the cart (product detail page "Add to cart").
   */
  const trackAddToCart = (item: AnalyticsItem): void => {
    if (!hasAnalyticsConsent.value) return;
    const value = round2(item.price * item.quantity);

    pushDataLayer({
      event: 'add_to_cart',
      ecommerce: { currency: currency.value, value, items: [toGa4Item(item)] },
    });

    trackPixelEvent('AddToCart', {
      content_ids: [item.id],
      content_type: 'product',
      content_name: item.name ?? undefined,
      value,
      currency: currency.value,
      contents: [toPixelContent(item)],
    });
  };

  /**
   * Fire once per checkout attempt, when the checkout page loads with a non-empty cart.
   */
  const trackInitiateCheckout = (items: AnalyticsItem[], value?: number): void => {
    if (!hasAnalyticsConsent.value || !items.length) return;
    const checkoutValue = value ?? sumValue(items);
    const numItems = items.reduce((total, item) => total + item.quantity, 0);

    pushDataLayer({
      event: 'begin_checkout',
      ecommerce: { currency: currency.value, value: checkoutValue, items: items.map(toGa4Item) },
    });

    trackPixelEvent('InitiateCheckout', {
      content_ids: items.map((item) => item.id),
      contents: items.map(toPixelContent),
      value: checkoutValue,
      currency: currency.value,
      num_items: numItems,
    });
  };

  /**
   * Fire once per completed order, on the order-received page. `transactionId` is passed to Meta
   * as the Pixel `eventID` so a retried/refreshed page load doesn't get counted as a second sale.
   */
  const trackPurchase = (transactionId: string, items: AnalyticsItem[], value?: number): void => {
    if (!hasAnalyticsConsent.value) return;
    const orderValue = value ?? sumValue(items);
    const numItems = items.reduce((total, item) => total + item.quantity, 0);

    pushDataLayer({
      event: 'purchase',
      ecommerce: { transaction_id: transactionId, currency: currency.value, value: orderValue, items: items.map(toGa4Item) },
    });

    trackPixelEvent(
      'Purchase',
      {
        content_ids: items.map((item) => item.id),
        contents: items.map(toPixelContent),
        value: orderValue,
        currency: currency.value,
        num_items: numItems,
      },
      transactionId,
    );
  };

  return { trackAddToCart, trackInitiateCheckout, trackPurchase };
}
