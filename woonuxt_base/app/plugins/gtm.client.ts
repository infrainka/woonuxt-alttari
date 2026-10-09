

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const gtmId = config.public.gtmId;

  if (!gtmId) return;

  const { hasAnalyticsConsent } = useCookieConsent();

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  const consentState = (granted: boolean) => {
    const v = granted ? 'granted' : 'denied';
    return { analytics_storage: v, ad_storage: v, ad_user_data: v, ad_personalization: v };
  };

  gtag('consent', 'default', consentState(hasAnalyticsConsent.value));

  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });

  // Inject directly: useHead in a client plugin can be skipped after hydration
  if (!document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${gtmId}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
  }

  nuxtApp.hook('page:finish', () => {
    setTimeout(() => {
      window.dataLayer.push({
        event: 'virtual_page_view',
        page_location: window.location.href,
        page_title: document.title
      });
    }, 50);
  });

  // Listen to changes in the user's analytics consent and update GTM accordingly
  watch(
    hasAnalyticsConsent,
    (granted) => {
      gtag('consent', 'update', consentState(granted));
    }
  );
});