<template>
  <vue100vh>
    <main class="h-full w-screen m-auto">
      <nuxt />
    </main>
  </vue100vh>
</template>

<script>
import Vue100vh from 'vue-100vh'

export default {
  components: {
    Vue100vh
  },
  head: {
    titleTemplate (titleChunk) {
      return (titleChunk && titleChunk !== 'Paper') ? `${titleChunk} | Paper` : 'Paper'
    },
    bodyAttrs: {
      class: 'bg-gray-100 dark:bg-gray-800'
    }
  }
}
</script>
