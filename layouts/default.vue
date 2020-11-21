<template>
  <main class="min-h-screen w-screen m-auto">
    <nuxt />
  </main>
</template>

<script>
export default {
  head: {
    titleTemplate (titleChunk) {
      return (titleChunk && titleChunk !== 'Paper') ? `Paper | ${titleChunk}` : 'Paper'
    },
    bodyAttrs: {
      class: 'bg-gray-100 dark:bg-gray-800'
    }
  }
}
</script>
