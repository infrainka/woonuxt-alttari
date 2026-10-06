const COOKIE_NAME = 'cookie-consent';

export interface CookieConsentChoice {
  necessary: true;
  analytics: boolean;
}

/**
 * @name useCookieConsent
 * @description Shared cookie-consent state (useCookie caches by name, so every caller reads/writes the same value).
 * Legacy values (the old plain "accepted" string) are treated as "necessary only" so analytics stays opt-in.
 */
export function useCookieConsent() {
  const consent = useCookie<CookieConsentChoice | string | null>(COOKIE_NAME, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });

  // GTM (plugins/gtm.client.ts) reads this to decide whether analytics scripts may load.
  const hasAnalyticsConsent = computed(() => typeof consent.value === 'object' && consent.value?.analytics === true);

  const acceptAllCookies = (): void => {
    consent.value = { necessary: true, analytics: true };
  };

  const acceptNecessaryCookies = (): void => {
    consent.value = { necessary: true, analytics: false };
  };

  // Reopens the banner so the user can change/withdraw their choice, as promised in the privacy policy.
  const openCookieSettings = (): void => {
    consent.value = null;
  };

  return { consent, hasAnalyticsConsent, acceptAllCookies, acceptNecessaryCookies, openCookieSettings };
}
