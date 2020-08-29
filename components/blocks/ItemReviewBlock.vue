<template>
  <div class="d-grid mt-4">
    <div class="main">
      <nuxt-link class="btn-primary-n" :to="{ name: 'bootcamps-slug-bootcamp',
                params: { slug: this.$route.params.slug, bootcamp: this.$route.params.bootcamp } }">
        <font-awesome-icon class="text-primary"  icon="angle-left"  style="font-size: 22px; color:#6e87d2; margin-bottom:4px"/>
        Bootcamp
      </nuxt-link>
        <h2 class="my-3 text-1 font-weight-400">Reviews ({{ nameBootcamp }})</h2>
        <div class="card mb-3" v-for="review in reviews" :key="review._id">
          <h5 class="highlight p-1">{{ review.title }}</h5>
          <div class="p-2 bg-white">
            <p>Rating: <span class="text-primary">{{ review.rating }}</span></p>
            <p>{{ review.text }}</p>
            <p class="text-gray mt-2">{{ review.user.name }}</p>
          </div>
        </div>
    </div>
    <div class="aside bg-white">
      <div class="bg-warning dropleft pt-2 pb-3">
        <div class="">
          <div class="d-flex justify-content-center align-items-center pb-4">
            <p class="rounded-circle bg-primary mr-2 p-2">{{ getTotalRating }}</p>
            <p>Rating</p>
          </div>
          <div class="text-center">
            <a href="#" class="btn-primary-n">
              <font-awesome-icon class="text-primary"  icon="pencil-alt"  style="font-size: 22px; color:#6e87d2;"/>
              Calificar</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getTotalRating: '',
      nameBootcamp: ''
    }
  },
  props: {
    reviews: {
      type: Object,
      default: null
    }
  },
  created(){
    this.totalRating();
    console.log('type in props ', this.reviews)
  },
  methods: {
    totalRating () {
      if (!this.$store.state.currentBootcamp) {
        const url = this.$axios.$get(`api/v1/bootcamps/${this.$route.params.bootcamp}`).then(res => {
          this.getTotalRating = res.data.averageRating;
          this.nameBootcamp = res.data.name
        })
      } else {
        this.getTotalRating = this.$store.state.currentBootcamp.averageRating;
        this.nameBootcamp = this.$store.state.currentBootcamp.name;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/templatecss/bootstrap.css";
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