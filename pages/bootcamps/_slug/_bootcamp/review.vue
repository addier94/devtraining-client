<template>
  <div class="page-wrapper">
    <template v-if="$fetchState.pending">
      <content-placeholders rounded>
        <content-placeholders-heading />
        <content-placeholders-img />
        <content-placeholders-text :lines="50" />
      </content-placeholders>
    </template>
    <template v-else-if="$fetchState.error">
      <inline-error-block :error="$fetchState.error" />
    </template>
    <template >
      <item-review-block :reviews="reviews" />
    </template>
  </div>
</template>

<script>
import ItemReviewBlock from '@/components/blocks/ItemReviewBlock'
import InlineErrorBlock from '@/components/blocks/InlineErrorBlock'
export default {
  components:{
    ItemReviewBlock,
    InlineErrorBlock
  },
  data(){
    return {
      reviews: {},
    }
  },
  async fetch() {
    const reviews = await fetch(
      `http://localhost:5000/api/v1/bootcamps/${this.$route.params.bootcamp}/reviews`
    ).then((res) => res.json())

    // this.reviews = reviews.data;
    if ( reviews ) {
      this.reviews = reviews.data;
    } else {
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      throw new Error('Bootcamp no encontrado')
    }
  },
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  max-width: $screen-xl;
  margin: auto;
  padding: 1rem;
}

</style>