export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // target: 'static' ,
  // default is 'server'
  
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '',
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'devextreme/dist/css/dx.light.css',
    '@mdi/font/css/materialdesignicons.css',
    '@/assets/fonts/cairo/cairo.css',
    '@/assets/css/custom.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/repositories.js' },
    { src: '~/plugins/axiosPlugin' },
    { src: '~/plugins/busEvent.js' },
    { src: '~/plugins/dateFilter' },
    { src: '~/plugins/datetimeJs' },
    { src: '~/plugins/uploadImage' },
    { src: '~/plugins/toastify.js' },
    { src: '~/plugins/myFunctions.js' },
    { src: '~/plugins/recaptcha.js' },
    { src: '~/plugins/function.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
  loading: false,

  generate: {
    fallback: true
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    ["@nuxtjs/vuetify", { treeShake: false }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
    [
      '@nuxtjs/recaptcha', {
        hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
        language: 'ar',   // Recaptcha language (v2)
        mode: 'base',       // Mode: 'base', 'enterprise'
        siteKey: process.env.RECAPTCHA_SITE_KEY,    // Site key for requests
        version: 2,    // Version
        size: 'normal'        // Size: 'compact', 'normal', 'invisible' (v2)
      }
    ],
  ],
  axios: {
    baseURL: process.env.apiURL,
    credentials: true,
  },
  router: {
    // mode: 'hash',
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: 'custom',
          path: '*',
          component: resolve(__dirname, 'pages/errors/404.vue')
        },
        {
          path: '/Form/:formID/:idValue?',
          component: resolve(__dirname, 'pages/form.vue')
        },
        // {
        //   path: '/XPODrillDown',
        //   component: resolve(__dirname, 'pages/form.vue'),
        //   children: [
        //     {
        //       path: ':formID',
        //       component: resolve(__dirname, 'pages/form.vue'),
        //     }
        //   ]
        // },
        // {
        //   path: '/XPODrillDown/:formID',
        //   component: resolve(__dirname, 'pages/form.vue'),
        //   children: [
        //     {
        //       path: ':formID',
        //       component: resolve(__dirname, 'pages/form.vue')
        //     }
        //   ]
        // },
        {
          path: '/XPODrillDown/:formID',
          component: resolve(__dirname, 'pages/form.vue')
        },
      )
    },
    // routes: [
    //   {
    //     name: 'Form',
    //     //path: '/Formm/:id',
    //     path: '/Formm',
    //     component: 'pages/form.vue'
    //   },
    // ]
  },
  
  auth: {
    plugins: ['~/plugins/auth.js'],

    redirect: {
      login: '/Account/Login',
      logout: '/Account/Login',
      home: '/',
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/Account/Login', method: 'post' },
          //logout: { url: '/api/v1/auth/logout', method: 'post' },
          //user: { url: '/api/v1/user', method: 'get', propertyName: 'user' },
          user: false
        },
        token: {
          property: 'accessToken',
          name: 'Authorization',
          type: 'Bearer'
        },
        user: {
          autoFetch: false
        },
        localStorage: false,
        cookie: true
      },
    },
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: './plugins/vuetify.js',
    defaultAssets: false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
    ** You can extend webpack config here
    */
    extractCSS: true,
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       styles: {
    //         name: 'styles',
    //         test: /\.(css|vue)$/,
    //         chunks: 'all',
    //         enforce: true
    //       }
    //     }
    //   }
    // },
    extend(config, ctx) {
    }
  },
}
