<script setup lang="ts">
const { navigateToLogin } = useAuth();
const route = useRoute();
</script>

<template>
  <nav>
    <NuxtLink class="transition-colors hover:text-primary" to="/">{{ $t('general.home') }}</NuxtLink>
    <NuxtLink class="transition-colors hover:text-primary" to="/products">{{ $t('general.products') }}</NuxtLink>
    <NuxtLink class="transition-colors hover:text-primary" to="/collections">Collections</NuxtLink>
    <NuxtLink class="transition-colors hover:text-primary" to="/contact">{{ $t('general.contact') }}</NuxtLink>
    <NuxtLink class="transition-colors hover:text-primary lg:hidden" to="/wishlist" :prefetch="false">Wishlist</NuxtLink>
    <NuxtLink class="transition-colors hover:text-primary lg:hidden" to="/my-account" :prefetch="false" @click="navigateToLogin(route.fullPath)">My Account</NuxtLink>
  </nav>
</template>
