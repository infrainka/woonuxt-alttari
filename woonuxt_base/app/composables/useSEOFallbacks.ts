import type { ProductDetail, WooNuxtSEOItem } from '#types/gql';

import type { SeoHeadData } from '#types/seo-provider';

export function useSEOFallbacks(info: ProductDetail, path: string): SeoHeadData {
  const { frontEndUrl, stripHtml, wooNuxtSEO } = useHelpers();
  const img = useImage();

  const title = info.name || 'WooNuxt';
  const canonical = frontEndUrl ? `${frontEndUrl}${path}` : path;
  const siteName = process.env.SITE_TITLE ?? 'WooNuxt';
  const imageURL = info.image?.sourceUrl ?? '/images/placeholder.jpg';

  const ogImageSrc = img(imageURL, { width: 1200, height: 630, quality: 90 });
  const twitterImageSrc = img(imageURL, { width: 1600, height: 900, quality: 90 });

  const makeAbsolute = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (!frontEndUrl) return url;
    return `${frontEndUrl}${url.startsWith('/') ? url : `/${url}`}`;
  };

  const ogImage = makeAbsolute(ogImageSrc);
  const twitterImage = makeAbsolute(twitterImageSrc);
  const description = stripHtml(info.shortDescription || info.description || '');

  const facebook = (wooNuxtSEO as WooNuxtSEOItem[] | undefined)?.find((item) => item?.provider === 'facebook') ?? null;
  const xAccount = (wooNuxtSEO as WooNuxtSEOItem[] | undefined)?.find((item) => item?.provider === 'x' || item?.provider === 'twitter') ?? null;

  const meta = [
    description ? { name: 'description' as const, content: description } : undefined,
    { name: 'image' as const, content: ogImage },
    { property: 'og:site_name' as const, content: siteName },
    { property: 'og:url' as const, content: canonical },
    info.name ? { property: 'og:title' as const, content: info.name } : undefined,
    description ? { property: 'og:description' as const, content: description } : undefined,
    { property: 'og:image' as const, content: ogImage },
    facebook && facebook.url ? { property: 'article:publisher' as const, content: facebook.url } : undefined,
    { name: 'twitter:card' as const, content: 'summary_large_image' },
    xAccount?.handle ? { name: 'twitter:site' as const, content: xAccount.handle } : undefined,
    info.name ? { name: 'twitter:title' as const, content: info.name } : undefined,
    description ? { name: 'twitter:description' as const, content: description } : undefined,
    { name: 'twitter:image' as const, content: twitterImage },
    { name: 'twitter:url' as const, content: canonical },
  ].filter(Boolean) as SeoHeadData['meta'];

  const link = [{ rel: 'canonical', href: canonical }];

  // ── Product structured data (schema.org Product + Offer) ──
  // Uses only what the GraphQL query returns, so it renders even when Yoast's own
  // schema is absent or stripped by sanitize. mergeSEOFallbacks keeps Yoast scripts
  // and appends these; a Yoast Product block + this fallback block can coexist but
  // Google validates each independently, so the fallback is always well-formed.
  const script: SeoHeadData['script'] = [];

  const priceTarget = info as Partial<
    Pick<ProductDetail, 'rawPrice' | 'rawRegularPrice' | 'rawSalePrice' | 'sku' | 'stockStatus'>
  >;

  const toNumber = (raw?: string | null): number => {
    if (!raw) return NaN;
    // Prices come formatted per locale — "19,99 €" (fi) or "19.99" (en)
    const normalized = raw.includes(',') && !raw.includes('.') ? raw.replace(/[^\d,]/g, '').replace(',', '.') : raw.replace(/[^\d.]/g, '');
    return Number.parseFloat(normalized);
  };

  const rawPrice = toNumber(priceTarget.rawPrice);
  const rawRegular = toNumber(priceTarget.rawRegularPrice);
  const rawSale = toNumber(priceTarget.rawSalePrice);
  const salePrice = Number.isFinite(rawSale) && rawSale > 0 ? rawSale : NaN;
  const price = Number.isFinite(rawPrice) && rawPrice > 0 ? rawPrice : salePrice || rawRegular;

  if (info.name && Number.isFinite(price) && price > 0) {
    const currency = useRuntimeConfig().public?.CURRENCY_CODE || 'EUR';

    const offer: Record<string, unknown> = {
      '@type': 'Offer',
      url: canonical,
      price: price.toFixed(2),
      priceCurrency: currency,
      availability:
        priceTarget.stockStatus === 'IN_STOCK'
          ? 'https://schema.org/InStock'
          : priceTarget.stockStatus === 'ONBACKORDER'
            ? 'https://schema.org/BackOrder'
            : 'https://schema.org/OutOfStock',
    };

    // Only send a sale price when it's genuinely lower than regular, otherwise
    // Google complains about price mismatch between Offer.price and spec.
    if (salePrice && rawRegular && salePrice < rawRegular) {
      offer.priceSpecification = {
        '@type': 'UnitPriceSpecification',
        price: salePrice.toFixed(2),
        priceCurrency: currency,
      };
    }

    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: info.name,
      description,
      image: ogImage,
      sku: priceTarget.sku || undefined,
      offers: offer,
    };

    script.push({ type: 'application/ld+json', innerHTML: JSON.stringify(schema) });
  }

  return {
    title,
    meta,
    link,
    script,
  };
}

export function mergeSEOFallbacks(providerData: SeoHeadData, fallbacks: SeoHeadData): SeoHeadData {
  const merged: SeoHeadData = {
    title: providerData.title || fallbacks.title,
    meta: [...providerData.meta],
    link: [...providerData.link],
    script: [...providerData.script],
  };
  const existingMetaKeys = new Set(merged.meta.map((m) => m.property || m.name).filter(Boolean));

  fallbacks.meta.forEach((fallbackMeta) => {
    const key = fallbackMeta.property || fallbackMeta.name;
    if (key && !existingMetaKeys.has(key)) {
      merged.meta.push(fallbackMeta);
    }
  });

  const existingLinkRels = new Set(merged.link.map((l) => l.rel));
  fallbacks.link.forEach((fallbackLink) => {
    if (!existingLinkRels.has(fallbackLink.rel)) {
      merged.link.push(fallbackLink);
    }
  });

  return merged;
}
