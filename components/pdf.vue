<template>
  <div class="flex justify-center items-center h-full w-full bg-gray-200">
    <div
      v-if="!url && error"
      class="text-gray-600"
    >
      Sorry, could not find the PDF 😕
    </div>
    <icon
      v-else-if="!url"
      class="h-12 animate-bounce text-green-600"
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
    },
    error: {
      type: Boolean,
      required: true
    }
  }
}
</script>
