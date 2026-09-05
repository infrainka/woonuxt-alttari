<script lang="ts" setup>
import { ProductsOrderByEnum } from '#gql/default';
const { siteName, description, shortDescription, siteImage } = useAppConfig();

const [{ data }, { data: productData }] = await Promise.all([
  useAsyncGql('getProductCategories', { first: 6 }),
  useAsyncGql('getProducts', { first: 5, orderby: ProductsOrderByEnum.Popularity }),
]);

const productCategories = data.value?.productCategories?.nodes || [];
const popularProducts = productData.value?.products?.nodes || [];

useSeoMeta({
  title: `Home`,
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

    <div class="container flex flex-wrap items-center justify-center my-16 text-center gap-x-8 gap-y-4 brand lg:justify-between">
      <img src="/images/logoipsum-211.svg" alt="Brand 1" width="132" height="35" />
      <img src="/images/logoipsum-221.svg" alt="Brand 2" width="119" height="30" />
      <img src="/images/logoipsum-225.svg" alt="Brand 3" width="49" height="48" />
      <img src="/images/logoipsum-280.svg" alt="Brand 4" width="78" height="30" />
      <img src="/images/logoipsum-284.svg" alt="Brand 5" width="70" height="44" />
      <img src="/images/logoipsum-215.svg" alt="Brand 6" width="132" height="40" />
    </div>

    <section class="container my-16">
      <div class="flex items-end justify-between">
        <h2 class="text-lg font-semibold md:text-2xl">Kategoriat</h2>
        <NuxtLink class="text-primary-dark" to="/collections">{{ $t('general.viewAll') }}</NuxtLink>
      </div>
      <div class="grid justify-center grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-6">
        <CategoryCard v-for="(category, i) in productCategories" :key="i" class="w-full" :node="category" />
      </div>
    </section>

    <section class="feature-benefits container grid gap-4 my-24 text-black md:grid-cols-2 lg:grid-cols-4">
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img class="feature-icon" src="/icons/box.svg" width="60" height="60" alt="Nopea toimitus" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">Nopea toimitus</h3>
          <p class="text-sm">Kaikki pakkaan ja lähetän Suomesta. Myös nouto saatavilla Helsingistä.</p>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img class="feature-icon" src="/icons/moneyback.svg" width="60" height="60" alt="Tyytyväisyystakuu" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">Tyytyväisyystakuu</h3>
          <p class="text-sm">30 päivän vaihto- ja palautusoikeus: Testaa koruja rauhassa.</p>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img class="feature-icon" src="/icons/package.svg" width="60" height="60" alt="Ilmainen toimitus" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">Yli 40€ ostoksista ilmainen toimitus</h3>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img class="feature-icon" src="/icons/support.svg" width="60" height="60" alt="Vastaan nopeasti" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">Vastaan nopeasti</h3>
          <p class="text-sm">Voit ottaa yhteyttä somen kautta tai ajanvaraus lomakkeella :)</p>
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
