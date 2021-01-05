<template>
  <div class="h-screen">
    <main class="h-full w-screen m-auto">
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {
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
