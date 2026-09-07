<script setup lang="ts">
const { navigateToLogin } = useAuth();
const route = useRoute();
</script>

<template>
  <nav>
    <NuxtLink active-class="text-primary" class="transition-colors hover:text-primary" to="/">{{ $t('general.home') }}</NuxtLink>
    <NuxtLink active-class="text-primary" class="transition-colors hover:text-primary" to="/products">{{ $t('general.products') }}</NuxtLink>
    <NuxtLink active-class="text-primary" class="transition-colors hover:text-primary" to="/collections">{{ $t('general.collections') }}</NuxtLink>
    <NuxtLink active-class="text-primary" class="transition-colors hover:text-primary" to="/about">{{ $t('general.about') }}</NuxtLink>
  </nav>
</template>
