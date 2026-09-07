<script setup lang="ts">
const { isShowingSearch } = useSearching();
</script>

<template>
  <header class="sticky top-0 z-40 bg-black shadow-md shadow-gray-200 border-b border-transparent outline-gray-950/10 outline">
<div class="flex flex-col sm:flex-row justify-between items-center bg-[#111111] text-gray-300 text-sm py-3 px-4 sm:px-6 border-b border-gray-800 gap-3 sm:gap-0">
      
      <!-- Phone & Email (Wraps on very small screens) -->
      <div class="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
        <a href="tel:+358449573133" class="flex items-center gap-2 hover:text-white transition-colors">
          <Icon name="mdi:phone" class="text-[#9B1003] text-lg" /> +358449573133
        </a>
        <!-- Hidden divider on mobile, visible on desktop -->
        <span class="hidden sm:block w-px h-4 bg-gray-700"></span>
        <a href="mailto:info@alttari.shop" class="flex items-center gap-2 hover:text-white transition-colors">
          <Icon name="mdi:email" class="text-[#9B1003] text-lg" /> info@alttari.shop
        </a>
      </div>
      
      <!-- Socials -->
      <div class="flex items-center gap-4">
        <span>{{ $t('topbar.socials') }}</span>
        <a href="https://www.instagram.com/alttari.shop/" aria-label="Instagram" class="flex items-center justify-center w-7 h-7 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
          <Icon name="mdi:instagram" class="text-white text-md" />
        </a>
        <a href="https://www.tiktok.com/@alttari.shop" aria-label="TikTok" class="flex items-center justify-center w-7 h-7 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
          <Icon name="ic:baseline-tiktok" class="text-white text-md" />
        </a>
      </div>
    </div>

    <div class="container flex items-center justify-between py-4">
      <!-- Hook: Before header navigation -->
      <HookOutlet name="layout.header.beforeNav" as="div" />

      <div class="flex items-center">
        <MenuTrigger class="lg:hidden" />
        <Logo class="w-40" />
      </div>
      <MainMenu class="items-center hidden gap-6 text-sm text-white lg:flex lg:px-4" />
      <div class="flex justify-end items-center w-40 flex-1 ml-auto gap-4 md:gap-6">
        <ProductSearch class="hidden sm:inline-flex max-w-80 w-[60%]" />
        <SearchTrigger />
        <div class="flex gap-4 items-center">
          <CartTrigger />
        </div>
      </div>
    </div>
    <Transition name="scale-y" mode="out-in">
      <div v-if="isShowingSearch" class="container mb-3 -mt-1 sm:hidden">
        <ProductSearch class="flex w-full" />
      </div>
    </Transition>
  </header>
</template>

