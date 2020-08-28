<template>
<nav class="navbar navbar-expand-md navbar-dark bg-primary">
  <div class="container">
    <nuxt-link class="navbar-brand" to="/"
      ><font-awesome-icon icon="laptop-code"  style="font-size: 22px; color:white;margin-bottom:2px;"/> DevCamper</nuxt-link
    >
    <button
      @click="toggleNav = !toggleNav"
      class="navbar-toggler"
      :class="toggleNav ? '' : 'collapsed'"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" :class="toggleNav ? 'show' : ''" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown" @click="activeDrop = !activeDrop" :class="activeDrop ? 'show' : ''" v-if="$auth.$state.loggedIn">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
          >
            <font-awesome-icon class=""  icon="user"  style="font-size: 18px; margin-bottom: 4px;"/> {{ $auth.$state.user.name || 'perfil' }}
          </a>
          <div class="dropdown-menu" :class="activeDrop ? 'show' : ''">
            <a class="dropdown-item" href="manage-bootcamp.html"
              >Manage Bootcamp</a
            >
            <a class="dropdown-item" href="manage-reviews.html"
              >Manage Reviews</a
            >
            <a class="dropdown-item" href="manage-account.html"
              >Manage Account</a
            >
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" @click.prevent="onLogout">
              <font-awesome-icon icon="sign-out-alt"  style="font-size: 16px; margin-bottom:2px;"/> Cerrar Sesion
            </a>
          </div>
        </li>
        <li class="nav-item d-none d-sm-block" v-if="$auth.$state.loggedIn">
          <a class="nav-link" href="#">|</a>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/bootcamps">Explorar Bootcamps</nuxt-link>
        </li>
        <li class="nav-item d-none d-sm-block" v-if="!$auth.$state.loggedIn">
          <a class="nav-link" href="#">|</a>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/register" v-if="!$auth.$state.loggedIn">Registro</nuxt-link>
        </li>
        
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/login" v-if="!$auth.$state.loggedIn">Iniciar Sesion</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
// import { mapGetters } from 'vuex'
import NuxtIcon from '@/assets/icons/nuxt.svg?inline'

export default {
  components: {
    NuxtIcon
  },
  data() {
    return {
      activeDrop: false,
      toggleNav: false
    }
  },
  methods: {
    async onLogout() {
      await this.$auth.logout()      
    }
  }
  // computed: {
  //   ...mapGetters({
  //     'user': 'auth/authUser',
  //     'isAuth': 'auth/isAuthenticated',
  //     'isAdmin': 'auth/isAdmin'
  //   })
  // },
  // methods: {
  //   logout() {
  //     this.$store.dispatch('auth/logout').then(() => this.$router.push('/login'))
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/templatecss/bootstrap.css";
</style>