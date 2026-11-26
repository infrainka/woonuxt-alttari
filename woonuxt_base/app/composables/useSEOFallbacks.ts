import type { ProductDetail, WooNuxtSEOItem } from '#types/gql';
import { StockStatusEnum } from '#gql/default';
import { withTrailingSlash } from 'ufo';

import type { SeoHeadData } from '#types/seo-provider';

// Site-wide URL form is "/path/" (Netlify 301s the slashless form). Keep query/hash intact.
export const toCanonicalUrl = (url: string): string => {
  if (!url) return url;
  const [base = '', rest = ''] = url.split(/(?=[?#])/, 2);
  return withTrailingSlash(base) + rest;
};

const URL_META_KEYS = new Set(['og:url', 'twitter:url']);

export function useSEOFallbacks(info: ProductDetail, path: string): SeoHeadData {
  const { frontEndUrl, stripHtml, wooNuxtSEO } = useHelpers();
  const img = useImage();

  const title = info.name || 'WooNuxt';
  const canonical = toCanonicalUrl(frontEndUrl ? `${frontEndUrl}${path}` : path);
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
    // WooGraphQL returns variable-product price ranges as "18, 18" or "18 - 99".
    // Split on ", " (range comma) or " - " / " – " and take the first (lowest) price.
    const first = raw.split(/,\s+|\s[-\u2013]\s/)[0] ?? '';
    // Prices come formatted per locale — "19,99 €" (fi) or "19.99" (en)
    const normalized = first.includes(',') && !first.includes('.') ? first.replace(/[^\d,]/g, '').replace(',', '.') : first.replace(/[^\d.]/g, '');
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
        priceTarget.stockStatus === StockStatusEnum.InStock
          ? 'https://schema.org/InStock'
          : priceTarget.stockStatus === StockStatusEnum.OnBackorder
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
      // Use the direct, original product image (no /_ipx/ proxy, no 1200x630 crop) —
      // Google prefers the original, high-resolution product image for Product schema.
      image: makeAbsolute(imageURL) || undefined,
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
    meta: providerData.meta.map((m) => (m.content && URL_META_KEYS.has(m.property || m.name || '') ? { ...m, content: toCanonicalUrl(m.content) } : m)),
    link: providerData.link.map((l) => (l.rel === 'canonical' && l.href ? { ...l, href: toCanonicalUrl(l.href) } : l)),
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

  // Append fallback scripts (e.g. Product JSON-LD) that aren't already present.
  // Deduplicate by exact innerHTML first, then by JSON-LD @type so a Yoast Product
  // schema and our fallback Product schema are never both emitted.
  const existingScripts = new Set(merged.script.map((s) => s.innerHTML).filter(Boolean));
  // Collect every JSON-LD @type, including nodes inside Yoast's "@graph" array
  // and array-valued @type (e.g. ["Product", "ItemPage"]).
  const collectTypes = (innerHTML: string): string[] => {
    const types: string[] = [];
    const visit = (node: unknown) => {
      if (Array.isArray(node)) return node.forEach(visit);
      if (!node || typeof node !== 'object') return;
      const obj = node as Record<string, unknown>;
      const t = obj['@type'];
      if (typeof t === 'string') types.push(t);
      else if (Array.isArray(t)) t.forEach((x) => typeof x === 'string' && types.push(x));
      if (obj['@graph']) visit(obj['@graph']);
    };
    try {
      visit(JSON.parse(innerHTML));
    } catch {}
    return types;
  };

  const existingJsonLdTypes = new Set<string>(merged.script.flatMap((s) => (s.innerHTML ? collectTypes(s.innerHTML) : [])));
  fallbacks.script.forEach((fallbackScript) => {
    if (!fallbackScript.innerHTML || existingScripts.has(fallbackScript.innerHTML)) return;
    const fallbackTypes = collectTypes(fallbackScript.innerHTML);
    if (fallbackTypes.some((t) => existingJsonLdTypes.has(t))) return;
    merged.script.push(fallbackScript);
    fallbackTypes.forEach((t) => existingJsonLdTypes.add(t));
  });

  return merged;
}
