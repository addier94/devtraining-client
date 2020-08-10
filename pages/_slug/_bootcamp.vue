<template>
  <div>
    fuckug single bootcamp
  </div>
</template>

<script>
export default {
  async fetch() {
    const bootcamp = await fetch(
      `http://localhost:5000/api/v1/bootcamps/${this.$route.params.bootcamp}`
    ).then((res) => res.json())
console.log('fuckug single bootcamp ', bootcamp)
    if (bootcamp._id && bootcamp.slug === this.$route.params.slug) {
      this.bootcamp = bootcamp
    } else {
      // set status code on server
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      throw new Error('Bootcamp no encontrado')
    }
  },
  data() {
    return {
      bootcamp: {}
    }
  }
}
</script>