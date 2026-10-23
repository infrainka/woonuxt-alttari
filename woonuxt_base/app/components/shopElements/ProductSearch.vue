<script setup>
const route = useRoute();
const { getSearchQuery, setSearchQuery, clearSearchQuery } = useSearching();
const searchQuery = ref(getSearchQuery());

const reset = () => {
  clearSearchQuery();
  searchQuery.value = '';
};

watch(
  () => getSearchQuery(),
  (value) => {
    // Always keep the input in sync with the route's `search` param, e.g. when it changes
    // via browser back/forward, so the box never shows stale text while a search is (or
    // isn't) actually still active.
    searchQuery.value = value || '';

    if (value) return;
    // Only auto-clear while still on a product listing page. Navigating away (e.g. to a
    // product detail page) also drops the `search` query param, but that's just a side
    // effect of leaving the listing, not a reason to force a redirect back to /products.
    const routeName = String(route.name ?? '');
    const isProductListingRoute = routeName === 'products' || routeName.startsWith('product-category-');
    if (isProductListingRoute) reset();
  },
);
</script>

<template>
  <form class="relative items-center flex-1 -space-x-px rounded-md shadow-xs" @submit.prevent="setSearchQuery(searchQuery)">
    <Icon name="ion:search-outline" size="20" class="absolute z-10 opacity-50 pointer-events-none left-3" />
    <input
      id="product-search-input"
      v-model="searchQuery"
      type="text"
      :placeholder="$t('shop.searchProducts')"
      class="z-0 inline-flex items-center w-full p-2 pl-10 text-sm text-black border border-gray-300 rounded-md shadow-inner outline-hidden bg-gray-50 shadow-gray-200 placeholder:text-gray-400" />
    <span
      v-if="searchQuery"
      class="absolute z-10 flex items-center gap-1 px-2 py-1 text-xs rounded-sm cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary right-2"
      @click="reset">
      <span>{{ $t('general.clear') }}</span>
      <Icon name="ion:close-outline" size="18" />
    </span>
  </form>
</template>
