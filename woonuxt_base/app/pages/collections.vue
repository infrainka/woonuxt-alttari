<script setup lang="ts">
import type { Product } from '#types/gql';

type Collection = {
  slug: string;
  name: string;
  description?: string | null;
  products: Product[];
};

const [{ data: productsData }, { data: collectionsData }] = await Promise.all([
  useAsyncGql('getProducts'),
  useAsyncGql('getCollections', { tax: ['PAKOKOELMAT' as any] }),
]);

const products = (productsData.value?.products?.nodes || []) as Product[];
const rawCollections = collectionsData.value?.terms?.nodes || [];

const collections: Collection[] = [];

// 3. Build the collections array
for (const term of rawCollections) {
  const slug = term.slug as string;
  
  // Skip the "Ei kokoelmaa" term
  if (slug === 'ei-kokoelmaa' || slug === 'ei_kokoelmaa') continue;

  // Find all products that belong to this collection
  const collectionProducts = products.filter(product => 
    product.terms?.nodes?.some(t => t?.taxonomyName === 'pa_kokoelmat' && t.slug === slug)
  );

  // Only render the collection section if it actually has products
  if (collectionProducts.length > 0) {
    collections.push({
      slug,
      name: term.name || decodeURIComponent(slug).replace(/-/g, ' '),
      description: term.description, // We finally have our description!
      products: collectionProducts.slice(0, 8),
    });
  }
}

useHead({
  title: 'Kokoelmat',
  meta: [{ name: 'description', content: 'Explore our product collections' }],
});
</script>

<template>
  <main class="container py-12 text-white">
    
    <div v-if="collections.length" class="grid gap-20">
      
      <!-- Changed border-gray-400 to border-gray-800 to match the dark theme -->
      <section v-for="collection in collections" :key="collection.slug" class="grid gap-8 border-t border-gray-800 pt-16 first:border-t-0 first:pt-0">
        
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <!-- Forced the accent line to your Alttari red -->
            <span class="h-8 w-1 shrink-0 bg-[#9B1003]" aria-hidden="true"></span>
            
            <!-- Changed to h2 for better SEO -->
            <h2 class="text-3xl font-bold capitalize tracking-wide md:text-4xl">{{ collection.name }}</h2>
          </div>
          
          <!-- 4. Render the WordPress description -->
          <div 
            v-if="collection.description" 
            class="prose prose-invert max-w-2xl text-gray-400 mt-2" 
            v-html="collection.description"
          ></div>
        </div>

        <div class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <ProductCard v-for="(product, index) in collection.products" :key="product.id || product.slug || index" :node="product" :index="index" />
        </div>
        
      </section>
    </div>
    
    <div v-else class="py-16 text-center text-gray-500">
      Kokoelmia ei löytynyt.
    </div>
    
  </main>
</template>