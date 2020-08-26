<template>
  <div class="page-wrapper">
      <single-bootcamp-block />
  </div>
</template>

<script>
import SingleBootcampBlock from '@/components/blocks/SingleBootcampBlock'
export default {
  // middleware: 'auth',
  components:{
    SingleBootcampBlock
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