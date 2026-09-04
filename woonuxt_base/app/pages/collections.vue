<script setup lang="ts">
import type { Product } from '#types/gql';

type Collection = {
  slug: string;
  name: string;
  products: Product[];
};

const { data: productsData } = await useAsyncGql('getProducts');
const products = (productsData.value?.products?.nodes || []) as Product[];
const collections: Collection[] = [];

for (const product of products) {
  const collectionTerms =
    product.terms?.nodes?.filter(
      (term) => term?.taxonomyName === 'pa_kokoelmat' && term.slug && term.slug !== 'ei-kokoelmaa' && term.slug !== 'ei_kokoelmaa',
    ) || [];

  for (const term of collectionTerms) {
    const slug = term.slug as string;
    const existingCollection = collections.find((collection) => collection.slug === slug);

    if (existingCollection) {
      if (existingCollection.products.length < 8) existingCollection.products.push(product);
      continue;
    }

    collections.push({
      slug,
      name: decodeURIComponent(slug).replace(/-/g, ' '),
      products: [product],
    });
  }
}

useHead({
  title: 'Collections',
  meta: [{ name: 'description', content: 'Explore our product collections' }],
});
</script>

<template>
  <main class="container py-6">
    <div v-if="collections.length" class="grid gap-16">
      <section v-for="collection in collections" :key="collection.slug" class="grid gap-6 border-t-2 border-gray-400 pt-10 first:border-t-0 first:pt-0">
        <div class="flex items-center gap-4">
          <span class="h-8 w-1 shrink-0 bg-primary" aria-hidden="true"></span>
          <h1 class="text-3xl font-bold capitalize tracking-wide md:text-4xl">{{ collection.name }}</h1>
        </div>
        <div class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <ProductCard v-for="(product, index) in collection.products" :key="product.id || product.slug || index" :node="product" :index="index" />
        </div>
      </section>
    </div>
    <div v-else class="py-16 text-center text-gray-500">No collections found.</div>
  </main>
</template>