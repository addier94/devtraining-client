<template>
  <div>
    <the-header />
    <nuxt keep-alive />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
export default {
  components: {
    TheHeader
  }
}
</script>