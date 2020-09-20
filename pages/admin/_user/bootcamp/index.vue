<template>
<section class="container mt-2">
  <div class="row">
    <div class="col-md-8 m-auto">
      <div class="card bg-surface py-2 px-4">
        <div class="card-body mb-2">
          <h1 class="mb-4">{{ bootcamp.name }}</h1>
          <div class="card">

            <bootcamps-item-block :bootcamp="bootcamp" :bootcampImage="bootcampImage" />

          </div>
          <p class="mb-3">{{ fileName }}</p>
          <!-- <form class="mb-4"> -->
            <div class="form-group">
              <div class="custom-file">
                <input type="file" class="custom-file-input" @change="onFileSelected(bootcamp._id)"
                />
                <label class="custom-file-label" for="photo"
                  >Añadir imagen al bootcamp</label
                >
              </div>
            </div>
            <!-- <input type="submit" class="btn btn-light btn-block" value="Subir imagen">
          </form> -->
          <nuxt-link :to="{ name: 'admin-user-bootcamp-update',
                          params: { user: $auth.$state.user._id }}" class="btn btn-primary btn-block"
            >Editar los Detalles del Bootcamp</nuxt-link
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
import { mapState } from 'vuex'
export default {
  components: {
    BootcampsItemBlock
  },
  data(){
    return {
      selectedFile: null,
      fileName: null,
      bootcamp: '',
      bootcampImage: {}
    }
  },
  // computed: {
  //   ...mapState({
  //     bootcamp: ({bootcamp}) => bootcamp.bootcampByUserId
  //   })
  // },

  async created() {
    let response = await this.$store.dispatch('bootcamp/fetchBootcampByUserId', this.$route.params.user)
    this.bootcamp = response;
  },

  methods: {
    onFileSelected(bootcampId) {
      if(event.target.files[0]){
        this.selectedFile = event.target.files[0];
        this.fileName = event.target.files[0].name;
        this.onAddPhoto(bootcampId);
      }
    },
    async onAddPhoto(bootcampId) {
      try {
        let data = new FormData();
        data.append("file", this.selectedFile, this.fileName);
        let response = await this.$axios.$put(`/api/v1/bootcamps/${bootcampId}/photo`, data)
        this.bootcampImage = {image: response.data, bootcampId: bootcampId}
      } catch (err) {
        this.$toastr.w(err);
        console.log(err);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/templatecss/bootstrap.css";
</style>