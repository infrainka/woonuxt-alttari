<script lang="ts" setup>
import { ProductsOrderByEnum } from '#gql/default';
const { siteName, description, shortDescription, siteImage } = useAppConfig();

const [{ data }, { data: productData }] = await Promise.all([
  useAsyncGql('getProductCategories', { first: 6 }),
  useAsyncGql('getProducts', { first: 5, orderby: ProductsOrderByEnum.Popularity }),
]);

const productCategories = data.value?.productCategories?.nodes || [];
const popularProducts = productData.value?.products?.nodes || [];

const categoryPreviewImages: Record<string, string> = {
  sormukset: '/images/evileye.webp',
  korvakorut: '/images/ensis.webp',
  'suuret-kaulakorut': '/images/fleurdelis.webp',
  kaikki: '/images/hero-4.jpg',
  rannekorut: '/images/ourobos.avif',
  'pienet-kaulakorut': '/images/miekka.webp',
};

useSeoMeta({
  title: `Etusivu`,
  ogTitle: siteName,
  description: description,
  ogDescription: shortDescription,
  ogImage: siteImage,
  twitterCard: `summary_large_image`,
});
</script>

<template>
  <main>
    <HeroBanner />


    <section class="container my-16">
      <div class="flex items-end justify-between">
        <h2 class="text-lg font-semibold md:text-2xl">Kategoriat</h2>
        <NuxtLink class="text-primary-dark" to="/products">{{ $t('general.viewAll') }}</NuxtLink>
      </div>
      <div class="grid justify-center grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-6">
        <CategoryCard
          v-for="(category, i) in productCategories"
          :key="i"
          class="w-full"
          :node="category"
          :preview-image="categoryPreviewImages[category.slug]" />
      </div>
    </section>

<section class="feature-benefits container grid gap-4 my-24 text-black md:grid-cols-2 lg:grid-cols-4">
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img class="feature-icon" src="/icons/box.svg" width="60" height="60" :alt="$t('features.fastDelivery')" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">{{ $t('features.fastDelivery') }}</h3>
          <p class="text-sm">{{ $t('features.fastDeliveryDesc') }}</p>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img class="feature-icon" src="/icons/moneyback.svg" width="60" height="60" :alt="$t('features.guarantee')" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">{{ $t('features.guarantee') }}</h3>
          <p class="text-sm">{{ $t('features.guaranteeDesc') }}</p>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img class="feature-icon" src="/icons/package.svg" width="60" height="60" :alt="$t('features.freeShipping')" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">{{ $t('features.freeShipping') }}</h3>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img class="feature-icon" src="/icons/support.svg" width="60" height="60" :alt="$t('features.fastResponse')" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">{{ $t('features.fastResponse') }}</h3>
          <p class="text-sm">{{ $t('features.fastResponseDesc') }}</p>
        </div>
      </div>
    </section>

    <section v-if="popularProducts" class="container my-16">
      <div class="flex items-end justify-between">
        <h2 class="text-lg font-semibold md:text-2xl">{{ $t('shop.popularProducts') }}</h2>
        <NuxtLink class="font-medium text-primary-dark" to="/products">{{ $t('general.viewAll') }}</NuxtLink>
      </div>
      <ProductRow :products="popularProducts" class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-8" />
    </section>
    <section class="container my-16">
      <ContactForm />
    </section>
  </main>
</template>

<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}

.feature-icon {
  filter: brightness(0) saturate(100%) invert(15%) sepia(97%) saturate(2571%) hue-rotate(355deg) brightness(87%) contrast(106%);
  flex: 0 0 auto;
}

.feature-benefits,
.feature-benefits h3,
.feature-benefits p {
  color: #000 !important;
}
</style>
