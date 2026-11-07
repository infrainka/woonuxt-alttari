// Ambient globals for the third-party analytics scripts injected by
// app/plugins/gtm.client.ts and app/plugins/meta-pixel.client.ts.

export {};

declare global {
  type GtagFunction = (...args: unknown[]) => void;

  type FbqFunction = {
    (...args: unknown[]): void;
    callMethod?: (...args: unknown[]) => void;
    push?: FbqFunction;
    loaded?: boolean;
    version?: string;
    queue?: unknown[][];
  };

  interface Window {
    dataLayer: unknown[];
    gtag?: GtagFunction;
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}
