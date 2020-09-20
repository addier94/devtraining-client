<template>
  	<section class="container mt-5">
			<h1 class="mb-2">Añadir Bootcamp</h1>
			<p>
				Importante: debe estar afiliado a un bootcamp para agregar {{ $config.appName }}
			</p>
			<form action="manage-bootcamp.html">
				<div class="row">
					<div class="col-md-6">
						<div class="card bg-white py-2 px-4">
							<div class="card-body">
								<h3>Ubicación y contacto</h3>
								<p class="text-muted">
									Si hay varias ubicaciones, use la principal o la más grande
								</p>
								<div class="form-group">
									<label>Nombre</label>
									<input
										type="text"
                    v-model="bootcamp.name"
										name="name"
										class="form-control"
										placeholder="Nombre del campo de entrenamiento"
										required
									/>
								</div>
								<div class="form-group">
									<label>Dirección</label>
									<input
										type="text"
										name="address"
										class="form-control"
										placeholder="Dirección completo"
										required
									/>
									<small class="form-text text-muted"
										>Calle, ciudad, estado, etc</small
									>
								</div>
								<div class="form-group">
									<label>Número de Teléfona</label>
									<input
										type="text"
										name="phone"
										class="form-control"
										placeholder="Teléfono"
									/>
								</div>
								<div class="form-group">
									<label>Correo</label>
									<input
										type="text"
										name="email"
										class="form-control"
										placeholder="Email de contacto"
									/>
								</div>
								<div class="form-group">
									<label>Sitio Web</label>
									<input
										type="text"
										name="website"
										class="form-control"
										placeholder="URL del sitio web"
									/>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="card bg-white py-2 px-4">
							<div class="card-body">
								<h3>Otra información</h3>
								<div class="form-group">
									<label>Descripción</label>
									<textarea
										name="description"
										rows="5"
										class="form-control"
										placeholder="Descripción (lo que ofreces, etc.)"
										maxlength="500"
									></textarea>
									<small class="form-text text-muted"
										>No más de 500 caracteres</small
									>
								</div>
								<div class="form-group">
									<label>Carreras</label>
									<select name="careers" class="custom-select" multiple>
										<option selected>Seleccione todas las que correspondan</option>
										<option value="Web Development">Web Development</option>
										<option value="Mobile Development"
											>Mobile Development</option
										>
										<option value="UI/UX">UI/UX</option>
										<option value="Data Science">Data Science</option>
										<option value="Business">Business</option>
										<option value="Other">Other</option>
									</select>
								</div>
								<div class="form-check">
									<input
										class="form-check-input"
										type="checkbox"
										name="housing"
										id="housing"
									/>
									<label class="form-check-label" for="housing">
										Alojamiento
									</label>
								</div>
								<div class="form-check">
									<input
										class="form-check-input"
										type="checkbox"
										name="jobAssistance"
										id="jobAssistance"
									/>
									<label class="form-check-label" for="jobAssistance">
										Asistencia laboral
									</label>
								</div>
								<div class="form-check">
									<input
										class="form-check-input"
										type="checkbox"
										name="jobGuarantee"
										id="jobGuarantee"
									/>
									<label class="form-check-label" for="jobGuarantee">
										Garantía de trabajo
									</label>
								</div>
								<div class="form-check">
									<input
										class="form-check-input"
										type="checkbox"
										name="acceptGi"
										id="acceptGi"
									/>
									<label class="form-check-label" for="acceptGi">
										Acepto GI Bill
									</label>
								</div>
								<p class="text-muted my-4">
									* Después de agregar el bootcamp, puede agregar los cursos específicos ofrecidos
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<input
						type="submit"
						value="Enviar Bootcamp"
						class="btn btn-success btn-block my-4"
					/>
					<!-- <a href="manage-bootcamp.html" class="btn btn-danger btn-block mb-4"
						>Cancel</a
					> -->
				</div>
			</form>
		</section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      bootcampOnStore: ({bootcamp}) => bootcamp.bootcampByUserId
    })
  },
  data () {
    return {
      bootcamp: ''
    }
  },
  async created() {
    if (!this.bootcampOnStore){
      console.log(typeof this.bootcamp)
      let response = await this.$store.dispatch('bootcamp/fetchBootcampByUserId', this.$route.params.user)
      this.bootcamp = response;
    } else {
      this.bootcamp = this.bootcampOnStore;
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/templatecss/bootstrap.css";
</style>