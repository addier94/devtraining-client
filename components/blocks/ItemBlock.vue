<template>
<nuxt-link
  :to="{
    name: 'slug-bootcamp',
    params: { slug: bootcamp.slug, bootcamp: bootcamp._id }
  }"
  tag="article"
>
  <div class="image-wrapper">
    <img 
      v-if="bootcamp.cover_image"
      :src="bootcamp.cover_image"
      :alt="bootcamp.title"/>
    <img v-else :src="bootcamp.photo || 'https://images.pexels.com/photos/3945356/pexels-photo-3945356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'" :alt="bootcamp.name"/>
  </div>
  <div class="content">
    <nuxt-link
      :to="{
        name: 'slug-bootcamp',
        params: { slug: bootcamp.slug, bootcamp: bootcamp._id}
      }">
      <h1>{{ bootcamp.name }}</h1>
      <div>
        <h2>{{ bootcamp.location.city }}, {{ bootcamp.location.state }}</h2>
      </div>
      <p>{{ bootcamp.description }}</p>
    </nuxt-link>
    <div class="tags">
      <p 
        v-for="career of bootcamp.careers"
        :key="career"
        class="tag">
        {{ career }}
      </p>
    </div>
    <div class="meta">
      <div class="scl">
        <span>
          <!-- <heart-icon /> -->
          <font-awesome-icon :icon="['fas', 'star']" style="font-size: 22px; color:yellow"/>
          {{ bootcamp.averageRating }}/10
        </span>
        <span>
          <!-- <comments-icon /> -->
          <font-awesome-icon icon="home"  style="font-size: 22px; color:red"/>
          {{ bootcamp.courses.length || '' }}
        </span>
      </div>
      <time>jun 23</time>
    </div>
  </div>
</nuxt-link>
</template>

<script>

export default {
  components: {
  },
  props: {
    bootcamp: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
article {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: $shadow;
  cursor: pointer;
  &:hover {
    box-shadow: $small-shadow;
    h1 {
      color: $primary-color;
    }
  }
  .image-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    background-color: $elevated-surface-color;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content {
    padding: 1rem;
    h1 {
      font-size: $text-xl;
      letter-spacing: $-ls2;
      margin-bottom: 0.5rem;
    }
    h2 {
      margin-bottom: 0.5rem;
      display: inline-block;
      padding: 1px 5px;
      background: $on-surface-color;
      color: $surface-color;
    }
    p{
      margin-bottom: 0.5rem;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 0.5rem;
      .tag {
        font-size: $text-sm;
        font-weight: $bold-body-font-weight;
        line-height: 1;
        padding: 0.5rem 0.5rem;
        margin: 0 0.5rem 0.5rem 0;
        border-radius: 0.25rem;
        box-shadow: $small-shadow;
        &:hover {
          background: $hovered-surface-color;
        }
        &:active {
          background: transparent;
          box-shadow: $small-inner-shadow;
        }
      }
    }
    .meta {
      font-size: $text-xs;
      letter-spacing: $-ls2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .scl {
        display: flex;
        span {
          display: flex;
          align-items: center;
          margin-right: 1rem;
          svg {
            margin-right: 0.25rem;
          }
        }
      }
    }
  }
}
</style>
