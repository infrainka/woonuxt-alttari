<script setup lang="ts">
const { wooNuxtVersionInfo } = useHelpers();
</script>

<template>
  <footer class="site-footer bg-[#1a1a1a] text-white py-12 mt-12 order-last border-t border-gray-800">
    <div class="container flex flex-col gap-8">
      
      <!-- Top Section: Logo & Description -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left max-w-lg mx-auto md:mx-0">
        <Logo />
        <WebsiteShortDescription class="mt-4 text-sm leading-relaxed" />
      </div>

      <!-- Divider -->
      <hr class="border-gray-800" />

      <!-- Bottom Section: Legal & Copyright -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
        
        <!-- Left side: Copyright -->
        <div class="copyright text-center md:text-left">
          {{ $t('footer.copyright') }}
        </div>
        
        <!-- Right side: Legal Links -->
        <div class="flex flex-wrap justify-center items-center gap-6">
          <NuxtLink to="/privacy-policy" class="hover:text-white transition-colors">
            {{ $t('footer.privacy') }}
          </NuxtLink>
          <NuxtLink to="/terms" class="hover:text-white transition-colors">
            {{ $t('footer.terms') }}
          </NuxtLink>
          
          <LangSwitcher class="ml-4" />
        </div>
        
      </div>
      
    </div>

    <!-- Hook: Bottom of footer -->
    <HookOutlet name="layout.footer.bottom" as="div" />
  </footer>
</template>

<style scoped>
a:hover {
  text-decoration: underline;
}
</style>
