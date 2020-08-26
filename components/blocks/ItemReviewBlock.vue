<template>
  <div class="d-grid">
    <div class="main">
      <nuxt-link class="btn-primary" :to="{ name: 'bootcamps-slug-bootcamp',
                params: { slug: this.$route.params.slug, bootcamp: this.$route.params.bootcamp } }">
        <font-awesome-icon class="text-primary"  icon="angle-left"  style="font-size: 22px; color:green"/>
        Bootcamp
      </nuxt-link>
        <h1 class="my-3 text-1 font-weight-400">DevWorks Bootcamp Reviews</h1>
        <div class="card mb-3" v-for="review in reviews" :key="review._id">
          <h2 class="highlight p-1">{{ review.title }}</h2>
          <div class="p-2 bg-white">
            <p class="py-1">Rating: <span class="text-primary">{{ review.rating }}</span></p>
            <p>{{ review.text }}</p>
            <p class="text-gray mt-2">{{ review.user.name }}</p>
          </div>
        </div>
    </div>
    <div class="aside">
      <div class="p-fixed">
        <div class="d-flex justify-content-center align-items-center pb-4">
          <p class="rounded-circle bg-primary mr-2 p-2">{{ getRating }}</p>
          <p>Rating</p>
        </div>
        <div class="text-center">
          <a href="" class="btn-primary">
            <font-awesome-icon class="text-primary"  icon="pencil-alt"  style="font-size: 22px; color:green"/>
            Calificar este bootcamp</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getRating: ''
    }
  },
  props: {
    reviews: {
      type: Array,
      default: null
    }
  },
  created(){
    this.totalRating();
  },
  methods: {
    totalRating () {
      if (!this.getRating) {
        const url = this.$axios.$get(`api/v1/bootcamps/${this.$route.params.bootcamp}`).then(res => {
          this.getRating = res.data.averageRating;
        })
      } else {
        this.getRating = this.$store.state.currentBootcamp.averageRating; 
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.d-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: $text-3xl;
  .main{
    grid-row-start: 2;
    grid-row-end: 3;
  }
  @media (min-width: $screen-md){
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas: "main main aside";
      grid-gap: $text-xl;
      .main{
        grid-area: main;
      }
      .aside{
        grid-area: aside;
        .p-fixed{
          position: fixed;
        }
      }
  }
}
</style>