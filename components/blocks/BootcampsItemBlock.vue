<template>
  <div class="row no-gutters">
    <div class="col-md-4">
      <img :src="bootcamp.photo || 'https://images.pexels.com/photos/3945356/pexels-photo-3945356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'" class="card-img" :alt="bootcamp.name" />
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
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/templatecss/bootstrap.css";
</style>