export default {
  ssr: false,
  target: 'static',
  components: true,
  publicRuntimeConfig: {
    API_URL: process.env.API_URL
  },
  head: {
    title: 'Paper',
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
  ],
  plugins: [
    { src: '~/plugins/simpleAnalytics' }
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],
  modules: [
    '@nuxtjs/pwa'
  ],
  build: {
  },
  generate: {
    fallback: true
  },
  pwa: {
    meta: {
      name: 'paper',
      viewport: 'width=device-width, initial-scale=1',
      theme_color: '#047857',
      mobileAppIOS: true
    },
    manifest: {
      background_color: '#F3F4F6',
      display: 'standalone',
      theme_color: '#047857'
    }
  }
}
