<template>
  <div
    v-if="value || $slots.default"
    class="mt-3"
    :class="{ flex: !multiLine }"
  >
    <strong
      class="block mr-3 text-green-600 font-semibold"
      v-text="label"
    />
    <div
      v-if="value"
      class="text-gray-700"
      v-text="value"
    />
    <slot v-else />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: false,
      default: null
    },
    multiLine: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
