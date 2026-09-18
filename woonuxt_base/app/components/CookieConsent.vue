<script setup lang="ts">
const { consent, acceptCookies } = useCookieConsent();

const bannerRef = ref<HTMLElement | null>(null);

// Reserve space at the bottom of the page (via a CSS var read in app.vue) so the fixed banner never hides the footer.
const updateBannerSpacing = () => {
  if (!import.meta.client) return;
  const height = !consent.value && bannerRef.value ? bannerRef.value.offsetHeight : 0;
  document.documentElement.style.setProperty('--cookie-banner-height', `${height}px`);
};

onMounted(() => {
  updateBannerSpacing();
  window.addEventListener('resize', updateBannerSpacing);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateBannerSpacing);
  document.documentElement.style.removeProperty('--cookie-banner-height');
});
</script>

<template>
  <Transition name="fade" @after-enter="updateBannerSpacing" @after-leave="updateBannerSpacing">
    <div
      v-if="!consent"
      ref="bannerRef"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie notice"
      class="fixed bottom-0 left-0 z-50 flex w-full flex-col items-center justify-between gap-4 border-t border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm sm:flex-row">
      <div class="cookie-banner-message max-w-3xl space-y-1 text-sm">
        <p>{{ $t('cookies.necessary') }}</p>
        <p>{{ $t('cookies.optional') }}</p>
        <p>
          {{ $t('cookies.changeChoice') }}
          <NuxtLink to="/privacy-policy" class="underline hover:text-primary">{{ $t('cookies.privacyLink') }}</NuxtLink>
        </p>
      </div>
      <Button class="w-full shrink-0 sm:w-auto" size="sm" @click="acceptCookies">{{ $t('cookies.accept') }}</Button>
    </div>
  </Transition>
</template>

<style scoped>
/* Avoid the site's global "text-gray-*" hover-only-visible rule; this text must stay readable at all times. */
.cookie-banner-message {
  color: #374151;
}
</style>

