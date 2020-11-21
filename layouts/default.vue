<template>
  <div class="min-h-screen w-screen m-auto flex flex-col sm:w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3">
    <main class="flex-grow">
      <nuxt />
    </main>
    <footer class="mb-4 text-sm text-center text-gray-500 italic">
      <nuxt-link to="/contact">
        Made with ♥ in Utrecht
      </nuxt-link>
    </footer>
  </div>
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
