<template>
  <div
    v-if="loading || notFound"
    class="h-screen flex justify-center items-center text-gray-700"
  >
    <div v-if="loading">
      <div>Loading article</div>
    </div>
    <div v-else-if="notFound">
      Could not find the article
    </div>
  </div>
  <div v-else class="flex flex-col sm:flex-row">
    <div class="h-screen w-full sm:w-1/2 p-4 sm:p-5 overflow-auto">
      <h1
        class="mb-6 text-3xl text-green-600 font-bold"
        v-text="metadata.title"
      />
      <metadata-item
        label="DOI"
        :value="metadata.doi"
      />
      <metadata-item
        label="Journal"
        :value="metadata.journal"
      />
      <metadata-item
        label="Volume"
        :value="metadata.volume"
      />
      <metadata-item
        label="Issue"
        :value="metadata.issue"
      />
      <metadata-item
        label="Page"
        :value="metadata.page"
      />
      <metadata-item
        label="Published"
        :value="metadata.published || metadata.year"
      />
      <metadata-item
        :label="metadata.author.length === 1 ? 'Author' : 'Authors'"
        :value="metadata.author.map(({ name, fullName, given, family }) => name || fullName || `${given || ''} ${family || ''}`).join(', ')"
      />
      <metadata-item
        label="Abstract"
        :value="metadata.abstract"
        multi-line
      />
    </div>
    <div class="w-full sm:w-1/2">
      <iframe
        :src="url"
        frameborder="0"
        class="w-full h-screen bg-gray-200"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      notFound: false,
      metadata: null,
      url: null
    }
  },
  computed: {
    query () {
      return this.$route.params.query
    }
  },
  watch: {
    query: {
      immediate: true,
      async handler (newQuery) {
        const response = await fetch(`${this.$config.API_URL}/find?id=${newQuery}`)
        const json = await response.json()

        if (json.metadata.doi) {
          this.metadata = json.metadata

          if (json.url?.endsWith('.pdf')) {
            this.url = json.url
          }
        } else {
          this.notFound = true
        }
        this.loading = false
      }
    }
  },
  head () {
    return {
      title: this.metadata?.title
    }
  }
}
</script>
