<template>
<section class="container mt-2">
  <div class="row">
    <div class="col-md-8 m-auto">
      <div class="card bg-surface py-2 px-4">
        <div class="card-body mb-2" v-for="bootcamp in bootcamps" :key="bootcamp._id">
          <h1 class="mb-4">{{ bootcamp.name }}</h1>
          <div class="card">
            <!-- <div class="row no-gutters">
              <div class="col-md-4">
                <img :src="bootcamp.photo" class="card-img" :alt="bootcamp.name" />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                    <a href="bootcamp.html"
                      >{{ bootcamp.name }}
                      <span class="float-right badge badge-success"
                        >{{ bootcamp.averageRating }}</span
                      ></a
                    >
                  </h5>
                  <span class="badge badge-dark mb-2">{{ bootcamp.location.city }}, {{ bootcamp.location.country }}</span>
                  <p class="card-text">
                    Web Development, UI/UX, Mobile Development
                  </p>
                </div>
              </div>
            </div> -->
            <bootcamps-item-block :bootcamp="bootcamp" />
          </div>
          <p class="mb-3">{{ fileName }}</p>
          <form class="mb-4">
            <div class="form-group">
              <div class="custom-file">
                <input type="file" name="photo" class="custom-file-input" id="photo" @change="onFileSelected"
                />
                <label class="custom-file-label" for="photo"
                  >Añadir imagen al bootcamp</label
                >
              </div>
            </div>
            <input type="submit" class="btn btn-light btn-block" value="Subir imagen">
          </form>
          <a href="add-bootcamp.html" class="btn btn-primary btn-block"
            >Editar los Detalles del Bootcamp</a
          >
          <a href="manage-courses.html" class="btn btn-secondary btn-block" 
            >Gestionar cursos</a
          >
          <a href="#" class="btn btn-danger btn-block">Eliminar Bootcamp</a>
          <p class="text-muted mt-5">
            * Solo puedes agregar un bootcamp por cuenta.
          </p>
          <p class="text-muted">
            * Debes estar afiliado al bootcamp de alguna manera para poder agregarlo a DevCamper.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import BootcampsItemBlock from '@/components/blocks/BootcampsItemBlock'
export default {
  components: {
    BootcampsItemBlock
  },
  data(){
    return {
      bootcamps: "",
      selectedFile: null,
      fileName: null
    }
  },

  async asyncData({ $axios, params }) {
    try {
      let responseBootcamps = await $axios.$get(`/api/v1/bootcamps/user/${params.user}`);

      return {
        bootcamps: responseBootcamps.data
        // courses: responseCourses
      }
    } catch (err) {
      console.log(err);
    }
  },
  watch: {
    bootcamps:function (val, oldVal) {
      console.log('this is my val ', val);
    }
  },

  methods: {
    onFileSelected() {
      this.selectedFile = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },
    async onAddPhoto() {
      try {
        let data = new FormData();
        data.append("photo", this.selectedFile, this.selectedFile.name);
        let response = await this.$axios.$post(`/api/reviews/${this.bootcamp._id}/photo`)
      } catch (err) {console.log(err);}
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/templatecss/bootstrap.css";
</style>