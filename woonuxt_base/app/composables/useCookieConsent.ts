const COOKIE_NAME = 'cookie-consent';

/**
 * @name useCookieConsent
 * @description Shared cookie-consent state (useCookie caches by name, so every caller reads/writes the same value).
 */
export function useCookieConsent() {
  const consent = useCookie<string | null>(COOKIE_NAME, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });

  const acceptCookies = (): void => {
    consent.value = 'accepted';
  };

  // Reopens the banner so the user can change/withdraw their choice, as promised in the privacy policy.
  const openCookieSettings = (): void => {
    consent.value = null;
  };

  return { consent, acceptCookies, openCookieSettings };
}
