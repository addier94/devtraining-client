<template>
<!-- Register -->
<section class="form mt-5">
  <div class="container">
    <div class="row">
      <div class="col-md-6 m-auto">
        <div class="card bg-white p-4 mb-4">
          <div class="card-body">
            <h1><i class="fas fa-user-plus"></i> Registrarse</h1>
            <p>
              Regístrese para listar su bootcamp o calificar, revisar y bootcamps favoritos
            </p>
            <form>
              <div class="form-group">
                <label for="name">Nombre</label>
                <input
                  v-model="form.name"
                  @blur="$v.form.name.$touch()"
                  class="form-control"
                  type="text"
                  name="name"
                  placeholder="Nombre Apellido"
                />
                <div v-if="$v.form.name.$error">
                  <span v-if="!$v.form.name.required" class="help-error-input text-danger">Nombre es necesario</span>
                  <span v-if="!$v.form.name.minLength" class="help-error-input text-danger">Nombre e Apellido debe tener 6 caracteres como nimino</span>
                </div>
              </div>
              <div class="form-group">
                <label for="email">Dirección de correo electrónico</label>
                <input
                  v-model="form.email"
                  @blur="$v.form.email.$touch()"
                  class="form-control"
                  type="email"
                  placeholder="Correo"/>
                <div v-if="$v.form.email.$error">
                  <span v-if="!$v.form.email.required" class="help-error-input text-danger">Correo es necesario</span>
                  <span v-if="!$v.form.email.emailValidator" class="help-error-input text-danger">Correo no valido</span>
                </div>
              </div>
              <div class="form-group">
                <label for="password">Contraseña</label>
                <input
                  v-model="form.password"
                  @blur="$v.form.password.$touch()"
                  class="form-control"
                  type="password"
                  placeholder="Contraseña"/>
                  <!-- autocomplete="new-password" -->
                <div v-if="$v.form.password.$error">
                  <span v-if="!$v.form.password.required" class="help-error-input text-danger">Contraseña es necesario</span>
                  <span v-if="!$v.form.password.minLength" class="help-error-input text-danger">Contraseña debe tener 6 caracteres como mínimo</span>
                </div>
              </div>
              <div class="form-group mb-4">
                <label for="password2">Confirmar contraseña</label>
                <input
                  v-model="form.passwordConfirmation"
                  @blur="$v.form.passwordConfirmation.$touch()"
                  class="form-control"
                  type="password"
                  placeholder="Confirmar contraseña"/>
                  <!-- autocomplete="off" -->
                <div v-if="$v.form.passwordConfirmation.$error">
                  <span v-if="!$v.form.passwordConfirmation.required" class="help-error-input text-danger">Debe confirmar la contraseña</span>
                  <span v-if="!$v.form.passwordConfirmation.sameAs" class="help-error-input text-danger">Contraseña debe ser igual a la anterior</span>
                </div>
              </div>

              <div class="card card-body mb-3">
                <h5>Rol del usuario</h5>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="role"
                    value="user"
                    checked
                  />
                  <label class="form-check-label">
                    Usuario habitual (navegar, escribir reseñas, etc.)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="role"
                    value="publisher"
                  />
                  <label class="form-check-label">
                    Editor de Bootcamp
                  </label>
                </div>
              </div>
              <p class="text-danger">
                * Debes estar afiliado al bootcamp de alguna manera para poder agregarlo a DevCamper.
              </p>
              <div class="form-group">
                <input
                  @click.prevent="onRegister"
                  type="submit"
                  value="Registrarse"
                  class="btn btn-primary btn-block"
                />
                <!-- :disabled="$v.form.$invalid" -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { required, email, minLength, url, sameAs } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      form: {
        username: null,
        name: null,
        email: null,
        avatar: null,
        password: null,
        passwordConfirmation: null
      }
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(6)
      },
      email: {
        required,
        emailValidator: email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      passwordConfirmation: {
        required,
        sameAs: sameAs('password')
      }
    }
  },
  computed: {
    isFormValid() {
      return !this.$v.form.$invalid
    }
  },
  methods: {
    // onRegister() {
    //   this.$v.form.$touch()
    //   if (this.isFormValid) {
    //     this.$store.dispatch('auth/register', this.form)
    //       .then(_ => this.$router.push('/login'))
    //       .catch(error => this.$toasted.error(error, {duration: 3000}))
    //   }
    // },

    async onRegister() {
      try {
        let data = {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password
        }

        let response = await this.$axios.$post("/api/v1/auth/register", data);

        console.log('response ', response);

        if (response.success) {
          this.$auth.loginWith("local", {
            data: {
              email: this.form.email,
              password: this.form.password
            }
          });

          this.$router.push("/");
        }
      } catch (err) {
        console.log('catch error ', err);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/templatecss/bootstrap.css";
</style>