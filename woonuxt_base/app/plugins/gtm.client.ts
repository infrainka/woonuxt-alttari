export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const gtmId = config.public.gtmId;

  if (!gtmId) return;

  const { hasAnalyticsConsent } = useCookieConsent();

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  gtag('consent', 'default', {
    'analytics_storage': hasAnalyticsConsent.value ? 'granted' : 'denied',
    'ad_storage': hasAnalyticsConsent.value ? 'granted' : 'denied'
  });

  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });

  useHead({
    script: [
      { src: `https://www.googletagmanager.com/gtm.js?id=${gtmId}`, async: true }
    ]
  });

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
      gtag('consent', 'update', {
        'analytics_storage': granted ? 'granted' : 'denied',
        'ad_storage': granted ? 'granted' : 'denied'
      });
    }
  );
});