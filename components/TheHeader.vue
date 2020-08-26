<template>
  <header>
    <nuxt-link to="/" class="logo-wrapper">
      <nuxt-icon />
    </nuxt-link>
    <nav>
      <ul>
        <li v-for="link in links" :key="link.slug">
          <nuxt-link :to="{ name: link.slug }">
            {{ link.name }}
          </nuxt-link>
        </li>
        <li class="nav-item dropdown" v-if="isAuth">
          <a @click="activeDrop = !activeDrop" class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown">
            <i class="fas fa-user" aria-hidden="true"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
              <font-awesome-icon icon="user" style="font-size: 20px" class="mr-2"/>
               Cuenta
          </font></font></a>
          <div class="dropdown-menu" :class="activeDrop ? 'display-block' : ''">
            <a class="dropdown-item" href="manage-bootcamp.html"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Administrar Bootcamp</font></font></a>
            <a class="dropdown-item" href="manage-reviews.html"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Administrar reseñas</font></font></a>
            <a class="dropdown-item" href="manage-account.html"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Administrar cuenta</font></font></a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="login.html"><i class="fas fa-sign-out-alt" aria-hidden="true"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> Cerrar sesión</font></font></a>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import NuxtIcon from '@/assets/icons/nuxt.svg?inline'

export default {
  components: {
    NuxtIcon
  },
  data() {
    return {
      links: [
        {
          name: 'Bootcamps',
          slug: 'bootcamps'
        },
        {
          name: 'Iniciar sesion',
          slug: 'login'
        },
        {
          name: 'Registrarse',
          slug: 'register'
        }
      ],
      activeDrop: false 
    }
  },
  computed: {
    ...mapGetters({
      'user': 'auth/authUser',
      'isAuth': 'auth/isAuthenticated',
      'isAdmin': 'auth/isAdmin'
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout').then(() => this.$router.push('/login'))
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown{
  position: relative;
  box-shadow: none;
  .dropdown-menu{
    display: none;
    position: absolute;
    top: 2.8rem;
    left: -4rem;
    width: auto!important;
    z-index: 999;
    background: $surface-color;
    font-size: .8rem;
    text-transform: lowercase;
  }
  .display-block{
    display: block;
  }
}
header {
  max-width: $screen-xl;
  margin: auto;
  // padding: 1rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo-wrapper {
    margin: 0 0.5rem;
    svg {
      width: 3rem;
      height: 100%;
    }
  }
  nav {
    letter-spacing: $-ls2;
    font-weight: $display-font-weight;
    text-transform: uppercase;
    ul {
      display: flex;
      li {
        margin: 0 0.5rem;
        a {
          box-shadow: $small-shadow;
          padding: 0.25rem 1rem;
          border-radius: 0.5rem;
          user-select: none;
          &:hover {
            background: $hovered-surface-color;
          }
          &.nuxt-link-exact-active {
            cursor: default;
            background: transparent;
            box-shadow: $small-inner-shadow;
            color: $gray-color;
          }
          &:active {
            background: transparent;
            box-shadow: $small-inner-shadow;
          }
        }
      }
    }
  }
}
</style>