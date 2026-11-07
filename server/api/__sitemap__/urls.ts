import { defineSitemapEventHandler } from '#sitemap/server';

type SitemapUrl = { loc: string; lastmod?: string };

type ProductsResponse = {
  data?: {
    products?: { pageInfo: { hasNextPage: boolean; endCursor: string | null }; nodes: Array<{ slug: string; modified?: string | null }> };
  };
};

type CategoriesResponse = {
  data?: { productCategories?: { nodes: Array<{ slug: string }> } };
};

// Feeds /sitemap.xml with the dynamic WooCommerce routes (products + categories) that Nuxt can't discover from the page files.
export default defineSitemapEventHandler(async () => {
  const host = useRuntimeConfig().public['graphql-client'].clients.default.host;
  const post = <T>(query: string, variables: Record<string, unknown> = {}) => $fetch<T>(host, { method: 'POST', body: { query, variables } });

  const urls: SitemapUrl[] = [];

  let after: string | null = null;
  do {
    const res: ProductsResponse = await post<ProductsResponse>(
      `query($after: String) { products(first: 100, after: $after, where: { visibility: VISIBLE, status: "publish" }) { pageInfo { hasNextPage endCursor } nodes { slug modified } } }`,
      { after },
    );
    const products = res.data?.products;
    for (const p of products?.nodes ?? []) {
      urls.push({ loc: `/product/${p.slug}`, lastmod: p.modified ?? undefined });
    }
    after = products?.pageInfo.hasNextPage ? products.pageInfo.endCursor : null;
  } while (after);

  const categories = await post<CategoriesResponse>(`query { productCategories(first: 100, where: { hideEmpty: true }) { nodes { slug } } }`);
  for (const c of categories.data?.productCategories?.nodes ?? []) {
    urls.push({ loc: `/product-category/${c.slug}` });
  }

  return urls;
});
