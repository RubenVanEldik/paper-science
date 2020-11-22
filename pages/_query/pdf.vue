<template>
  <iframe
    :src="url"
    class="fixed top-0 left-0 w-screen h-screen bg-gray-200"
    no-referrer
  />
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>
