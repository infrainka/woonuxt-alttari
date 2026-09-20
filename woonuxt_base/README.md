# woonuxt_base

This is the **WooNuxt parent layer** :the storefront engine (pages, components, composables, GraphQL queries, i18n, PWA/module config) that powers a WooCommerce front-end built on [Nuxt](https://nuxt.com) + [WPGraphQL](https://www.wpgraphql.com/) + [WooGraphQL](https://woographql.com/).

> **This folder is not a standalone app.** It's consumed via Nuxt's [layers](https://nuxt.com/docs/getting-started/layers) feature by the root project (one directory up), which does:
> ```ts
> export default defineNuxtConfig({ extends: ['./woonuxt_base'] });
> ```
> Run `npm install`, `npm run dev`, etc. from the **repository root**, not from here. See the root [README.md](../README.md) for setup, environment variables, and deployment instructions.

## What lives here

| Path | Purpose |
| --- | --- |
| `app/pages/` | Storefront routes: home, products, categories, cart, checkout, order summary, my-account, oauth |
| `app/components/` | UI components, grouped by domain (`cartElements`, `productElements`, `shopElements`, `filtering`, `forms`, `payments`, `generalElements`, `ui`) |
| `app/composables/` | Stateful logic — `useCart`, `useCheckout`, `useAuth`, `useProducts`, `useFiltering`, `useSearch`, `useWishlist`, `useHooks`, etc. |
| `app/queries/` | GraphQL documents (`.gql`) sent to WPGraphQL/WooGraphQL, plus shared `fragments/` |
| `app/gql/` | Generated GraphQL types/SDK output (`graphql-codegen`) — not hand-edited |
| `app/plugins/` | Nuxt plugins: auth/session bootstrap (`init.ts`, `gql-auth.ts`) and payment gateway registrations (`payment-gateways/`) |
| `app/app.config.ts` | Store-facing config: branding, `storeSettings` feature flags (cart mode, badges, reviews, etc.) |
| `modules/woonuxt-bridge.ts` | Nuxt module that validates required env vars and pulls WooNuxt Settings (branding, colors, Stripe config, SEO) from WordPress at build/runtime |
| `i18n/locales/` | Translation JSON files. Only `fi-FI` and `en-US` are actually registered in `nuxt.config.ts`; the rest exist but aren't wired up |
| `nuxt.config.ts` | Base layer config: modules, plugins, route rules (ISR for catalog routes), aliases, i18n setup |

## Key subsystems

### Checkout & payment gateways
Payment gateways are plugins that implement a `PaymentGatewayPlugin` interface and self-register via `usePaymentGateways()` (see `app/composables/usePaymentGateways.ts`). The checkout page only coordinates the *selected* gateway. All gateway-specific UI, validation, and payment processing lives in the plugin. See [app/plugins/payment-gateways/README.md](app/plugins/payment-gateways/README.md) for the full list and how to add a new gateway.

`CheckoutProcessingOverlay.vue` shows a full-screen "don't close this window" overlay spanning both the client-side payment step (e.g. Stripe `confirmPayment`) and the WooCommerce order-creation mutation.

### Cart & session init
To keep cached catalog pages fast, WooNuxt avoids a full session/cart fetch on first paint for anonymous visitors: only a lightweight cart summary is fetched for returning/logged-in users, and the full cart loads on demand (opening the cart drawer, checkout, account pages). Controlled by `storeSettings.initStoreOnUserActionToReduceServerLoad` in `app/app.config.ts`.

### Hooks (extension points)
`useHooks()` (`app/composables/useHooks.ts`) lets consumers register components at predefined locations (e.g. `layout.header.beforeNav`, `product.summary.afterPrice`, `checkout.review.after`) without forking base templates. Rendered via `<HookOutlet>`.

### i18n
Multilingual via `@nuxtjs/i18n`, `no_prefix` strategy. Default locale is `fi_FI`. Only locales registered in `nuxt.config.ts`'s `i18n.locales` array actually take effect at runtime.

### Rendering strategy
- `/` is fully prerendered.
- Catalog routes (`/product/**`, `/product-category/**`, `/products`, `/collections`, `/about`) use ISR (`CATALOG_ISR_TTL` env var, default 3600s) for large catalogs.
- `/checkout/order-received/**` and `/order-summary/**` are excluded from prerendering (dynamic, per-order data).

### PWA
`@vite-pwa/nuxt` is enabled by default; manifest defaults (name, theme color, description) are assembled in `modules/woonuxt-bridge.ts` from WordPress/WooNuxt Settings first, falling back to `app.config.ts`.

## Site-specific fork

This is the customized Alttari web shop. Changes are made directly in this layer. For the original, unmodified base, see the [upstream woonuxt repo](https://github.com/scottyzen/woonuxt).

## Related docs

- Root project [README.md](../README.md) — install, dev, deployment (Netlify/Vercel), ISR setup
- [CHANGELOG.md](CHANGELOG.md) — release notes for this layer
- [app/plugins/payment-gateways/README.md](app/plugins/payment-gateways/README.md) — payment gateway plugin guide
