export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const pixelId = config.public.metaPixelId;

  if (!pixelId) return;

  const { hasAnalyticsConsent } = useCookieConsent();
  let initialized = false;

  // Sets up the fbq() stub/queue exactly like Meta's official base code, then injects
  // fbevents.js (which replaces the stub with the real implementation and drains the queue).
  // Deliberately no <noscript> fallback pixel image here: that pattern fires an unconditional
  // request to Meta regardless of JS/consent state, which would bypass the gating below.
  const loadPixelScript = (): void => {
    if (window.fbq) return;

    const fbq: FbqFunction = Object.assign(
      (...args: unknown[]) => {
        if (fbq.callMethod) fbq.callMethod(...args);
        else fbq.queue?.push(args);
      },
      { loaded: true, version: '2.0', queue: [] as unknown[][] },
    );
    fbq.push = fbq;

    window.fbq = fbq;
    window._fbq = window._fbq || fbq;

    if (!document.querySelector('script[src*="connect.facebook.net"][src*="fbevents.js"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);
    }
  };

  const initPixel = (): void => {
    if (initialized) return;
    initialized = true;

    loadPixelScript();
    window.fbq?.('init', pixelId);
    window.fbq?.('track', 'PageView');
  };

  if (hasAnalyticsConsent.value) {
    initPixel();
  }

  // Listen to changes in the user's analytics consent and start/stop Meta Pixel accordingly
  watch(hasAnalyticsConsent, (granted) => {
    if (granted) {
      if (initialized) window.fbq?.('consent', 'grant');
      else initPixel();
    } else if (initialized) {
      window.fbq?.('consent', 'revoke');
    }
  });

  nuxtApp.hook('page:finish', () => {
    if (!hasAnalyticsConsent.value || !initialized) return;
    setTimeout(() => {
      window.fbq?.('track', 'PageView');
    }, 50);
  });
});
