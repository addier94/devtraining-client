<template>
  <div class="m-auto bg-white login p-4">
    <h2 class="mb-3 text-center text-uppercase font-weight-400 text-1 d-flex align-items-center justify-content-center">
      <font-awesome-icon icon="sign-in-alt" style="font-size: 34px" class="mr-2"/>
      Registrarse
    </h2>
    <p class="my-2 text-gray mb-4">Regístrese para listar su bootcamp o calificar, revisar y bootcamps favoritos</p>
    <form>
      <input class="w-100 p-1 mb-2 border-bottom-black" type="text" placeholder="Ingrese su nombre completo">
      <input class="w-100 p-1 mb-2 border-bottom-black" type="text" placeholder="Ingrese correo electrónico">
      <input class="w-100 p-1 mb-2 border-bottom-black" type="text" placeholder="Introducir la contraseña">
      <input class="w-100 p-1 mb-2 border-bottom-black" type="text" placeholder="Confirmar la contraseña">
      <div class="card card-body my-3">
        <h5><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Rol del usuario</font></font></h5>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="role" value="user" checked="">
          <label class="form-check-label"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
            Usuario habitual (navegar, escribir reseñas, etc.)
          </font></font></label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="role" value="publisher">
          <label class="form-check-label"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
            Editor de Bootcamp
          </font></font></label>
        </div>
      </div>
      <p class="text-danger"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
          * Debes estar afiliado al bootcamp de alguna manera para poder agregarlo a DevCamper.
        </font></font>
      </p>
      <div class="text-center my-4">
        <button class="btn-primary">Iniciar sesión</button>
      </div>
      <p>Se te olvidó tu contraseña? <span class="text-warning">Restablecer la contraseña</span></p>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .login{
    max-width: 600px;
    margin-top: 4rem!important;
    
  }
</style>