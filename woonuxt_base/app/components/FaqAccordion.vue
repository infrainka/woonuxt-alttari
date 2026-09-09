<script setup>
// Changed from await useFetch to useLazyFetch (no await needed)
const { data, pending } = useLazyFetch('https://alttari.shop/graphql', {
  method: 'POST',
  body: {
    query: `
      query GetCustomFAQs {
        bivFaqItems {
          q
          a
        }
      }
    `
  }
});

// Use a computed property so it updates reactively when data arrives
const faqs = computed(() => data.value?.data?.bivFaqItems || []);
</script>

<template>
  <div class="faq-wrapper max-w-2xl mx-auto space-y-4">
    
    <!-- Forced bg-black, text-white, and a stylish red border -->
    <details 
      v-for="(faq, index) in faqs" 
      :key="index" 
      class="p-4 bg-black border border-red-600 rounded-lg group cursor-pointer shadow-lg transition-colors hover:border-red-500"
    >
      <summary class="flex items-center justify-between font-bold text-lg list-none text-white">
        {{ faq.q }}
        <!-- Made the arrow red to match the border -->
        <span class="transition-transform duration-300 group-open:rotate-180 text-red-600">▼</span>
      </summary>
      
      <!-- The answer container -->
     <div class="faq-answer mt-4 whitespace-pre-wrap" v-html="faq.a"></div>
    </details>

    <!-- Fallback state styled to match -->
<div v-if="pending" class="text-center text-white bg-black p-4 border border-red-600 rounded-lg">
  Ladataan... (Loading...)
</div>
  </div>
</template>

<style scoped>
.faq-wrapper details {
  marker: none;
}

.faq-wrapper summary::-webkit-details-marker {
  display: none;
}

/* Force the text color of the injected WordPress HTML to be pure white */
.faq-answer :deep(p),
.faq-answer :deep(span),
.faq-answer :deep(a) {
  color: #ffffff !important;
  line-height: 1.6;
}

.faq-answer :deep(p) {
  margin-bottom: 1rem;
}

.faq-answer :deep(p:last-child) {
  margin-bottom: 0;
}
</style>