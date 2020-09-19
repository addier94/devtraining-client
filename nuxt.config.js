export default {
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'http://localhost:5000'
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  loading: false, // disable loading bar
  css: [
    '~/assets/styles/reset.scss',
    '~/assets/styles/base.scss',
    '~/assets/styles/highlight.scss',
    '~/assets/styles/app.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  styleResources: {
    scss: ['~/assets/styles/tokens.scss']
  },
  plugins: [
    '~/plugins/vue-placeholders.js',
    '~/plugins/vue-observe-visibility.client.js',
    { src: "~/plugins/google-maps", ssr: true },
    {src: '~/plugins/vuelidate'},
    {src: '~/plugins/toastr', ssr: false},
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',// global variable in scss
    '@nuxtjs/svg'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['nuxt-fontawesome', {
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
        {
          set:'@fortawesome/free-brands-svg-icons',
          icons: ['fab']
        },
      ]
    },
  ]
        
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://localhost:5000'
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [/^vue2-google-maps($|\/)/]
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/v1/auth/login', method: 'post', propertyName: 'token' },
          user: { url: '/api/v1/auth/me', method: 'get', propertyName: 'data' },
          logout: { url: '/api/v1/auth/logout', method: 'post' },
          // login: { url: '/api/v1/auth/login', method: 'post', propertyName: "token" },
          // logout: true
        }
      }
    }
  }

}
