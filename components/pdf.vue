<template>
  <div class="flex justify-center items-center h-full w-full bg-gray-200 text-green-600">
    <icon
      v-if="!url"
      class="h-12 animate-bounce"
    />
    <iframe
      v-else
      :src="url"
      class="w-full h-full overflow-auto"
      no-referrer
    />
  </div>
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
