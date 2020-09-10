<template>
  <div>
    <template v-if="$fetchState.pending">
      <content-placeholders rounded>
        <content-placeholders-heading />
        <content-placeholders-img />
        <content-placeholders-text :lines="50" />
      </content-placeholders>
    </template>
    <template v-else-if="$fetchState.error">
      <inline-error-block :error="$fetchState.error" />
    </template>

    <template v-else>
      <!-- <header>
        <h1>{{ article.title }}</h1>
        <div class="tags">
          <nuxt-link
            v-for="tag in article.tags"
            :key="tag"
            :to="{ name: 't-tag', params: { tag } }"
            class="tag"
          >
            #{{ tag }}
          </nuxt-link>
        </div>
        <div v-if="article.cover_image" class="image-wrapper">
          <img :src="article.cover_image" :alt="article.title" />
        </div>
        <div class="meta">
          <div class="scl">
            <span>
              <heart-icon />
              {{ article.positive_reactions_count }}
            </span>
            <span class="comments" @click="scrollToComments">
              <comments-icon />
              {{ article.comments_count }}
            </span>
          </div>
          <time>{{ article.readable_publish_date }}</time>
        </div>
      </header> -->

    <div class="d-grid">
      <div class="main">
        <h1 class="title">{{ bootcamp.name }}</h1>
        <p>{{ bootcamp.description }}</p>
        <p class="letter-small">
          Costo promedio del curso: <span>${{ bootcamp.averageCost }}</span>
        </p>
        <template v-for="course in courses">
          <div class="card-content" :key="course._id">
            <h3 class="title-card">{{ course.title }}</h3>
            <div class="content">
              <p class="duration-course">duracion: <span>{{ course.weeks }} semanas</span></p>
              <p class="description">{{ course.description }}</p>
              <p class="list price">Costo: ${{ course.tuition }} USD</p>
              <p class="list biginner">Habilidad requerida: {{ course.minimumSkill }}</p>
              <p class="list available" v-if="course.scholarshipAvailable">Beca disponible:
                <font-awesome-icon icon="check"  style="font-size: 22px; color:green"/>
              </p>
              <p class="list available" v-else>Beca disponible:
                <font-awesome-icon icon="times"  style="font-size: 22px; color:red"/>
              </p>
            </div>
          </div>
        </template>
      </div>

      <div class="aside">
        <img class="image-aside" :src="bootcamp.photo || 'https://images.pexels.com/photos/3945356/pexels-photo-3945356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'" alt="">
        <div class="rating">
          <!-- <p class="qualification-text">Calificación</p> -->
          <p class="qualification">
            {{ (bootcamp.averageRating.toString().length === 1) ? `${bootcamp.averageRating}.0` : bootcamp.averageRating }}
          </p>
          <p>de 10 estrellas</p>
        </div>
        <nuxt-link :to="{ name: 'bootcamps-slug-bootcamp-review',
                          params: { bootcamp: bootcamp._id, path: 'review' } }"
          class="nav-aside read-reviews" href="#">
          <font-awesome-icon icon="comments" style="font-size: 22px"/>
            Leer Calificaciones
        </nuxt-link>
        <a class="nav-aside write-comment" href="#">
          <font-awesome-icon icon="pencil-alt" style="font-size: 22px"/>
            Escribir comentario
        </a>
        <a class="nav-aside website" href="#">
          <font-awesome-icon icon="globe" style="font-size: 22px"/>
            Visitar sitio oficial
        </a>
        <div class="map">
          <GmapMap
            :center="coordinates"
            :zoom="6"
            map-type-id="terrain"
            style="height: 300px"
          />
        </div>
        <li class="list_state">
          <font-awesome-icon v-if="bootcamp.housing" icon="check"  style="font-size: 22px; color:green"/>
          <font-awesome-icon v-else icon="times"  style="font-size: 22px; color:red"/>
          Alojamiento
        </li>
        <li class="list_state">
          <font-awesome-icon v-if="bootcamp.jobAssistance" icon="check"  style="font-size: 22px; color:green"/>
          <font-awesome-icon v-else icon="times"  style="font-size: 22px; color:red"/>
          Asistencia laboral
        </li>
        <li class="list_state">
          <font-awesome-icon v-if="bootcamp.jobGuarantee" icon="check"  style="font-size: 22px; color:green"/>
          <font-awesome-icon v-else icon="times"  style="font-size: 22px; color:red"/>
          Garantia de trabajo
        </li>
        <li class="list_state">
          <font-awesome-icon v-if="bootcamp.acceptGi" icon="check"  style="font-size: 22px; color:green"/>
          <font-awesome-icon v-else icon="times"  style="font-size: 22px; color:red"/>
          Acepta GI Bill
        </li>
      </div>
    </div>
      <!-- eslint-disable-next-line -->
      <!-- <div class="content" v-html="article.body_html" /> -->
    </template>
    
  </div>
</template>

<script>
import InlineErrorBlock from '@/components/blocks/InlineErrorBlock'
export default {
  components:{
  },
  async fetch() {
    const bootcamp = await fetch(
      `http://localhost:5000/api/v1/bootcamps/${this.$route.params.bootcamp}`
    ).then((res) => res.json())

    const courses = await fetch(
      `http://localhost:5000/api/v1/bootcamps/${ this.$route.params.bootcamp }/courses`
    ).then((res) => res.json())

    this.courses = courses.data;

    if (bootcamp.data._id && bootcamp.data.slug === this.$route.params.slug) {
      this.bootcamp = bootcamp.data;
      this.$store.commit('bootcamp/SET_SINGLE_BOOTCAMP', this.bootcamp)
      this.getLocation();
    } else {
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      throw new Error('Bootcamp no encontrado')
    }
  },
  data() {
    return {
      bootcamp: {},
      courses: {},
      coordinates: {
        lat: 10,
        lng: 10
      }
    }
  },
  methods: {
    getLocation() {
      this.coordinates.lat = this.bootcamp.location.coordinates[0];
      this.coordinates.lng = this.bootcamp.location.coordinates[1];
    }
  },
  // activated() {
  //   if (this.$fetchState.timestamp <= Date.now() - 60000) {
  //     this.$fetch()
  //   }
  // }
}
</script>


<style lang="scss" scoped>
.d-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  // grid-template-rows: 1fr;
  grid-template-areas: "main main aside";
  grid-gap: $text-3xl;
  .main {
    grid-area: main;
    .title{
      font-size: $text-4xl;
      font-weight: 100;
      margin-bottom: $ls5;
    }
    .letter-small{
      margin: $text-sm 0;
      span{
        color: $primary-color;
      }
    }
    .card-content{
      border: 1px solid $primary-dark;
      margin-bottom: $text-sm;
      .title-card{
        background: $primary-color;
        color: $surface-color;
        padding: $text-ss;
      }
      .content{
        padding: $text-sm;
        background: white;
        .duration-course{
          // margin: $text-sss 0;
          margin-bottom: $text-sss;
          font-weight: 600;
          span{
            color: $primary-color;
          }
        }
        .description{
          margin-bottom: $text-ss;
        }
        .list{
          border: 1px solid $primary-dark;
          padding: $text-sss;
        }
      }
    }

  }
  .aside{
    // border: 1px solid green;
    .image-aside{
      border: 4px solid white;
    }
    .rating{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: $text-ss 0;
      font-weight: 500;
      .qualification{
        background: $primary-color;
        border-radius: 50%;
        color: white;
        margin-right: .4rem;
        padding: $text-sss;
      }
    }
    .nav-aside{
      display: block;
      // background: $primary-color;
      margin: $text-ss 0;
      padding: .3rem 0;
      text-align: center;
    }
    .read-reviews{
      background: $on-surface-color;
      color: white;
    }
    .website{
      background:  #389494;
      color: white;
      margin-bottom: 1.4rem;
    }
    .list_state{
      list-style: none;
      background: white;
      padding: $text-sss;
      border: 1px solid $primary-dark;
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