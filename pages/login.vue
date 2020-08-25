<template>
  <div class="m-auto bg-white login p-4">
    <h2 class="mb-3 text-center text-uppercase font-weight-400 text-1 d-flex align-items-center justify-content-center">
      <font-awesome-icon icon="sign-in-alt" style="font-size: 34px" class="mr-2"/>
      Iniciar sesion
    </h2>
    <p class="my-2 text-gray mb-4">Inicie sesión para enumerar su bootcamp o calificar, revisar y bootcamps favoritos</p>
    <form>
      <!-- <label>Dirección de correo electrónico</label> -->
      <input class="w-100 p-2 mb-1 border-bottom-black" type="text" placeholder="Ingrese correo electrónico">
      <!-- <label>Contraseña</label> -->
      <input class="w-100 p-2 border-bottom-black" type="text" placeholder="Introducir la contraseña">
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