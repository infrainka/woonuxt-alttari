<script setup>
const props = defineProps({
  product: { type: Object, default: null },
});

const gql = useWooGraphQL();
const reviews = ref(null);
const isLoadingReviews = ref(false);
const isLoadingMore = ref(false);

const fetchReviews = async (after = null) => {
  if (!props.product?.databaseId) return;
  const flag = after ? isLoadingMore : isLoadingReviews;
  flag.value = true;
  try {
    const { product: result } = await gql.getProductReviews({
      databaseId: props.product.databaseId,
      first: 10,
      after,
    });
    const fetched = result?.reviews;
    if (!fetched) return;
    reviews.value = after && reviews.value
      ? { ...fetched, edges: [...reviews.value.edges, ...fetched.edges] }
      : fetched;
  } catch (error) {
    console.error(error?.gqlErrors?.[0]?.message || error);
  } finally {
    flag.value = false;
  }
};

const loadMore = () => {
  if (reviews.value?.pageInfo?.hasNextPage) fetchReviews(reviews.value.pageInfo.endCursor);
};

onMounted(fetchReviews);
</script>

<template>
  <div class="flex flex-wrap gap-32 items-start mt-8">
    <div class="flex max-w-sm gap-4 prose">
      <ReviewsScore v-if="reviews" :reviews="reviews" :product-id="product.databaseId" :review-count="product.reviewCount" />
    </div>
    <div class="flex-1">
      <div v-if="isLoadingReviews" class="text-gray-400">Loading reviews…</div>
      <div v-else-if="reviews?.edges?.length" class="divide-y divide-gray-200">
        <div v-for="review in reviews.edges" :key="review.id" class="my-2 py-8">
          <div class="flex gap-4 items-center">
            <img v-if="review.node.author.node.avatar" :src="review.node.author.node.avatar.url" class="rounded-full h-12 w-12" />
            <div class="grid gap-1">
              <div class="text-sm">
                <span class="font-semibold">{{ review.node.author.node.name }}</span>
                <span class="italic text-gray-400">
                  – {{ new Date(review.node.date).toLocaleString($t('general.langCode'), { month: 'long', day: 'numeric', year: 'numeric' }) }}</span>
              </div>
              <StarRating :rating="review.rating" :hide-count="true" class="text-sm" />
            </div>
          </div>
          <div class="mt-4 text-gray-700 prose-sm" v-html="review.node.content"></div>
        </div>
        <button v-if="reviews.pageInfo?.hasNextPage" class="mt-4 text-sm underline disabled:opacity-50" :disabled="isLoadingMore" @click="loadMore">
          {{ isLoadingMore ? 'Loading…' : 'Load more reviews' }}
        </button>
      </div>
    </div>
  </div>
</template>