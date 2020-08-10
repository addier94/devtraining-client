<template>
<div>
  <header class="header">
    <div class="d-flex align-items-center justify-content-center">
      <div>
        <h1>Encontrar un evento buscando en las diferentes campos de entrenamiento</h1>
        <p>Encuentra reviews y comentarios sobre el evento</p>
        <div class="input-group">
          <input type="text" placeholder="distancia en millas">
          <input type="text" placeholder="Codigo Postal">
        </div>
        <nuxt-link class="btn-primary" to="/bootcamps">Buscar</nuxt-link>
      </div>

    </div>
  </header>

  <div class="page-wrapper">
    <h3>Ultimos Bootcamps</h3>
    <template v-if="$fetchState.pending && !bootcamps.length">
      <div class="article-cards-wrapper">
        <content-placeholders
          v-for="p in 30"
          :key="p"
          rouned
          class="article-card-block">
            <content-placeholders-img />
            <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <template v-else-if="$fetchState.error">
      <inline-error-block :error="$fetchState.error" />
    </template>
    <template v-else>
      <div class="article-cards-wrapper">
        <bootcamp-item-block 
          v-for="(bootcamp, i) in bootcamps"
          :key="bootcamp._id"
          v-observe-visibility="
            i === bootcamp.length - 1 ? lazyLoadArticles : false
          "
          :bootcamp="bootcamp"
          class="article-card-block"/>
      </div>
    </template>
    <template v-if="$fetchState.pending && bootcamp.length">
      <div class="article-cards-wrapper">
        <content-placeholders
          v-for="p in 30"
          :key="p"
          rounded
          class="article-card-block">
        <content-placeholders-img />
        <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
  </div>
</div>
</template>

<script>
import BootcampItemBlock from '@/components/blocks/BootcampItemBlock'
import InlineErrorBlock from '@/components/blocks/InlineErrorBlock'

export default {
  components: {
    BootcampItemBlock,
    InlineErrorBlock
  },
  async fetch() {
    const bootcamps = await fetch(`http://localhost:5000/api/v1/bootcamps`)
      .then((res) => res.json())

      this.bootcamps = this.bootcamps.concat(bootcamps.data)
  },
  data() {
    return {
      currentPage: 1,
      bootcamps: []
    }
  },
  methods: {
    lazyLoadArticles(isVisible) {
      if (isVisible) {
        if (this.currentPage < 5) {
          this.currentPage ++
          this.$fetch()
        }
      }
    }
  },
  head() {
    return {
      title: 'Bootcamps nuevos'
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  min-height: calc(100vh - 5rem);
  background-image: url('https://images.unsplash.com/photo-1520106392146-ef585c111254?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1012&q=80');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  .d-flex{
    min-height: calc(100vh - 5rem);
    z-index: 99;
    position: relative;
    color: $surface-color;
    text-align: center;
    h1{
      color: $surface-color;
      font-size: 2.2rem;
    }
    p{
      margin: 7px 0 15px 0px;
    }
    .input-group{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      @media (min-width: 390px) {
        input:nth-child(1){
          margin-right: 1rem;
        }
      }
      input{
        padding: .2rem .5rem;
        color: gray;
        width: 10rem;
        margin-bottom: 1.3rem;
      }
    }
  }

  .btn-primary{
    box-shadow: $small-shadow;
    padding: 0.25rem 1rem;
    border-radius: 0.5rem;
    &:hover {
      background: $hovered-surface-color;
    }
  }

  &:before {
    content: "";
    width: 100%;
    min-height: calc(100vh - 5rem);
    position: absolute;
    top: 0rem;
    left: 0;

    background: linear-gradient(90deg, #000000, #1b0347);

    opacity: 0.5;
  }
  
}

.page-wrapper {
  max-width: $screen-xl;
  margin: auto;
  padding: 1rem;
  min-height: 100vh;
}

.article-cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  .article-card-block {
    width: calc(100% - 2 * 1rem);
    margin: 1rem;
    margin-bottom: 1.5rem;
    margin-top: 0.5rem;
    @media (min-width: $screen-sm) {
      width: calc(50% - 2 * 1rem);
    }
    @media (min-width: $screen-lg) {
      width: calc(33.33333% - 2 * 1rem);
    }
  }
}
</style>
