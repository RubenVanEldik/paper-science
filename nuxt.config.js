export default {
  target: 'static',
  components: true,
  publicRuntimeConfig: [
    'NODE_ENV',
    'NETLIFY_URL',
    'SIMPLE_ANALYTICS_URL',
    'API_URL'
  ].reduce((obj, key) => ({ ...obj, [key]: process.env[key] }), {}),
  loadingIndicator: {
    name: 'pulse',
    color: '#047857',
    background: '#F3F4F6'
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
  buildModules: ['@nuxtjs/tailwindcss']
    .concat(process.env.NODE_ENV !== 'production' ? '@nuxtjs/eslint-module' : []),
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
