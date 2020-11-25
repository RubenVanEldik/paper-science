export default {
  ssr: false,
  target: 'static',
  components: true,
  publicRuntimeConfig: {
    NETLIFY_URL: process.env.NETLIFY_URL,
    API_URL: process.env.API_URL
  },
  head: {
    title: 'Paper',
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
      name: 'Paper',
      viewport: 'width=device-width, initial-scale=1',
      theme_color: '#047857',
      mobileAppIOS: true
    },
    manifest: {
      name: 'Paper',
      short_name: 'Paper',
      background_color: '#F3F4F6',
      display: 'standalone',
      theme_color: '#047857'
    }
  }
}
