<template>
  <div class="page-wrapper">
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
        <div class="position-fixed">
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
  </div>
</template>

<script>
export default {
  components:{
  },
  data() {
    return {
      reviews: {},
      getRating: ''
    }
  },
  created(){
    this.totalRating();
  },
  methods: {
    totalRating () {
      if (!this.getRating) {
        const url = this.$axios.$get(`http://localhost:5000/api/v1/bootcamps/${this.$route.params.bootcamp}`).then(res => {
          this.getRating = res.data.averageRating;
        })
      } else {
        this.getRating = this.$store.state.currentBootcamp.averageRating; 
      }
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
  .d-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    // grid-template-rows: 1fr;
    grid-template-areas: "main main aside";
    grid-gap: $text-3xl;
    .main{
      grid-area: main;
    }
    .aside{
      grid-area: aside;
    }
  }
  @media (max-width: $screen-md){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    // grid-template-rows: 1fr;
    grid-template-areas: "main aside";
    grid-gap: $text-base;
  }
  @media (max-width: $screen-sm){
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    // grid-template-rows: 1fr;
    grid-template-areas: "main";
  }
}
</style>