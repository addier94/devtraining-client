<template>
<section class="form mt-5">
  <div class="container">
    <div class="row">
      <div class="col-md-6 m-auto">
        <div class="card bg-white p-4 mb-4">
          <div class="card-body">
            <h1><i class="fas fa-sign-in-alt"></i> Iniciar sesión</h1>
            <p>
              Inicie sesión para enumerar su bootcamp o calificar, revisar y bootcamps favoritos
            </p>
            <form>
              <div class="form-group">
                <label for="email">Dirección de correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  placeholder="Ingrese correo electrónico"
                  required
                  v-model="form.email"
                  @blur="$v.form.email.$touch()" 
                  >
                <div v-if="$v.form.email.$error">
                  <span v-if="!$v.form.email.required" class="help-error-input text-danger">Correo es necesario</span>
                  <span v-if="!$v.form.email.email" class="help-error-input text-danger">Correo invalido</span>
                </div>
              </div>
              <div class="form-group mb-4">
                <label for="password">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  placeholder="Introducir la contraseña"
                  required
                  v-model="form.password"
                  @blur="$v.form.password.$touch()">
                <div v-if="$v.form.password.$error">
                  <span v-if="!$v.form.password.required" class="help-error-input text-danger">Contraseña es necesario</span>
                </div>
              </div>
              <div class="form-group">
                <input
                  type="submit"
                  value="Iniciar sesión"
                  class="btn btn-primary btn-block"
                  @click.prevent="login"
                  >
                  <!-- :disabled="$v.form.$invalid" -->
                  
              </div>
            </form>
            <p>	¿Se te olvidó tu contraseña? <a href="reset-password.html">Restablecer la contraseña</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
   middleware: 'guest',
  data () {
    return {
      form: {
        email: null,
        password: null,
      }
    }
  },
  validations: {
    form: {
      email: {
        email,
        required
      },
      password: {
        required
      }
    }
  },
  computed: {
    isFormValid() {
      return !this.$v.$invalid
    }
  },
  methods: {
    login() {
      this.$v.form.$touch()
      if (this.isFormValid) {
        this.$store.dispatch('auth/login', this.form)
          .then(() => this.$router.push('/'))
          .catch(() => this.$toasted.error('Correo o Contraseña incorrecto', {duration: 3000}))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/templatecss/bootstrap.css";
</style>