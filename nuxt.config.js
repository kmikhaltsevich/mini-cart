const isDev = process.env.NODE_ENV !== 'production'
export default {
  ssr: false,
  target: 'static',
  ...( !isDev && {
    modern: 'client'
  }),
  head: {
    titleTemplate: '%s - mini-cart',
    title: 'mini-cart',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    { src: '~/assets/scss/main.scss', lang: 'scss' }
  ],
  plugins: [],
  loading: { color: '#3B8070' },
  components: true,
  buildModules: [
    '@nuxtjs/vuetify'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {},
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    optionsPath: './plugins/vuetify.options.js',
    treeShake: true
  },
  build: {
    babel: {
      plugins: [
        [ '@babel/plugin-proposal-private-methods', { loose: true } ]
      ]
    }
  }
}
