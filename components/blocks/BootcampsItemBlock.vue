<template>
  <div class="row no-gutters">
    <div class="col-md-4">
      <img :src="imageUrl" class="card-img" :alt="bootcamp.name" />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">
          <nuxt-link class="text-primary" :to="{
            name: 'bootcamps-slug-bootcamp',
            params: { slug: bootcamp.slug, bootcamp: bootcamp._id }
          }"
            >{{ bootcamp.name }}
            <span class="float-right badge badge-success"
              >{{ bootcamp.averageRating }}</span
            ></nuxt-link
          >
        </h5>
        <span class="badge badge-dark mb-2">{{ bootcamp.location.city }}, {{ bootcamp.location.country }}</span>
        <p class="card-text">
              <span v-for="careers of bootcamp.careers" :key="careers">
              {{ careers }},
              </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bootcamp: {
      type: Object,
      default: null
    },
    bootcampImage: {
      type: Object,
      default: null
    }
  },
  computed: {
    imageUrl() {
      let path = '';
      if(this.bootcampImage && this.bootcampImage.bootcampId === this.bootcamp._id) {
        path = `${this.$config.baseURL}/uploads/${this.bootcampImage.image}`;
      } else {
        path = `${this.$config.baseURL}/uploads/${this.bootcamp.photo}`
      }
      return path;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/templatecss/bootstrap.css";
</style>