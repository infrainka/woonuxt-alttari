<script setup lang="ts">
interface Props {
  message?: string;
}

withDefaults(defineProps<Props>(), {
  message: '',
});
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" role="alert" aria-live="assertive">
      <div class="mx-4 flex max-w-sm flex-col items-center gap-4 rounded-lg bg-white p-8 text-center shadow-xl">
        <LoadingIcon size="48" stroke="3" />
        <p class="text-lg font-semibold processing-overlay-title">{{ message || $t('general.processingOrderMessage') }}</p>
        <p class="text-sm processing-overlay-subtext">{{ $t('general.doNotCloseWindow') }}</p>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Avoid the site's global "text-gray-*" hover-only-visible rule; this text must stay readable at all times. */
.processing-overlay-title {
  color: #111827;
}

.processing-overlay-subtext {
  color: #6b7280;
}
</style>