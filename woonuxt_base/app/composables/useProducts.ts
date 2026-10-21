import type { Product } from '#types/gql';
import type { GetProductsLightQueryVariables } from '#gql/default';

export type ProductListingVariables = Omit<GetProductsLightQueryVariables, 'after' | 'first'>;

/**
 * The `getProductsLight` query only returns a single page of results, so this follows the
 * `pageInfo` cursor until `hasNextPage` is false to collect every matching product. It uses the
 * lightweight listing fragments (see ProductListingCard.gql) instead of the full `getProducts`
 * query, which significantly speeds up fetching large batches.
 */
export async function fetchAllProducts(variables: ProductListingVariables = {}): Promise<Product[]> {
  const gql = useWooGraphQL();
  const batchSize = 100;
  const allProducts: Product[] = [];
  let after: string | null | undefined;
  let hasNextPage = true;

  while (hasNextPage) {
    const { products } = await gql.getProductsLight({ ...variables, first: batchSize, after });
    allProducts.push(...((products?.nodes ?? []) as Product[]));
    after = products?.pageInfo?.endCursor;
    hasNextPage = Boolean(products?.pageInfo?.hasNextPage && after);
  }

  return allProducts;
}

export function useProducts() {
  // Declare the state variables and the setter functions
  const products = useState<Product[]>('products');
  const allProducts = useState<Product[]>('allProducts', () => []);

  /**
   * Sets the products state variable and the allProducts variable.
   * @param {Product[]} newProducts - The new products to set.
   */
  function setProducts(newProducts: Product[]): void {
    // If newProducts is not an array, reset products and allProducts
    // to empty arrays to avoid errors in the UI.
    if (!Array.isArray(newProducts)) {
      products.value = [];
      allProducts.value = [];
      return;
    }
    products.value = [...newProducts];
    allProducts.value = [...newProducts];
  }

  // Named function for product filtering pipeline
  function applyProductFilters(products: Product[]): Product[] {
    const { isSortingActive, sortProducts } = useSorting();
    const { isFiltersActive, filterProducts } = useFiltering();
    const { isSearchActive, searchProducts } = useSearching();

    let newProducts = [...products];
    if (isFiltersActive.value) newProducts = filterProducts(newProducts);
    if (isSearchActive.value) newProducts = searchProducts(newProducts);
    if (isSortingActive.value) newProducts = sortProducts(newProducts);

    return newProducts;
  }

  // Named async function for better performance and debugging
  async function updateProductList(): Promise<void> {
    const { scrollToTop } = useHelpers();
    const { isSortingActive } = useSorting();
    const { isFiltersActive } = useFiltering();
    const { isSearchActive } = useSearching();

    // scroll to top of page
    scrollToTop();

    // return all products if no filters are active
    if (!isFiltersActive.value && !isSearchActive.value && !isSortingActive.value) {
      products.value = [...allProducts.value];
      return;
    }

    // otherwise, apply filter, search and sorting in that order
    try {
      products.value = applyProductFilters(allProducts.value);
    } catch (error) {
      console.error(error);
    }
  }

  return { products, allProducts, setProducts, updateProductList, fetchAllProducts };
}
