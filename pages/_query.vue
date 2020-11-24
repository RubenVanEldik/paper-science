<template>
  <nuxt-child
    v-if="$route.name === 'query-pdf'"
    :url="url"
    :error="pdfNotFound"
  />
  <div
    v-else-if="metadata"
    class="flex h-full"
  >
    <div class="flex flex-col h-full w-full md:w-1/2 p-4 sm:p-5 overflow-auto">
      <div class="flex-grow pb-7">
        <h1
          class="mb-6 text-3xl text-green-600 font-bold"
          v-text="beautifiedTitle"
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
          :value="metadata.published ? beautifyDate(metadata.published) : metadata.year"
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
      <div class="h-10">
        <button
          :disabled="!url"
          :class="{ 'opacity-50': !url }"
          class="block w-full py-2 px-4 md:hidden rounded bg-green-600 text-white text-center"
          @click="() => $router.push(`${$route.path}/pdf`)"
          v-text="url ? 'Open PDF' : pdfNotFound ? 'There is no PDF for this article' : 'Searching for PDF'"
        />
      </div>
    </div>
    <div class="hidden md:block w-1/2">
      <pdf
        :url="url"
        :error="pdfNotFound"
      />
    </div>
  </div>
  <div
    v-else
    class="h-full flex justify-center items-center text-gray-700"
  >
    <div v-if="loading">
      Loading article
    </div>
    <div v-else-if="notFound">
      Could not find the article
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data () {
    return {
      loading: true,
      notFound: false,
      pdfNotFound: false,
      metadata: null,
      url: null
    }
  },
  computed: {
    query () {
      return this.$route.params.query
    },
    beautifiedTitle () {
      return this.metadata.title?.match(/^"?(.+?)\.?"?$/)?.[1]
    }
  },
  watch: {
    query: {
      immediate: true,
      handler: 'fetchMetadata'
    }
  },
  methods: {
    beautifyDate (dateString) {
      return dateString ? dayjs(dateString).format('D MMMM YYYY') : null
    },
    async fetchMetadata (query) {
      const response = await fetch(`${this.$config.API_URL}/find?id=${query}`)
      const json = await response.json()

      if (json.metadata.doi) {
        this.metadata = json.metadata

        if (json.url?.endsWith('.pdf')) {
          this.url = json.url
        } else {
          this.fetchUrl(json.metadata.doi)
        }
      } else {
        this.notFound = true
      }
      this.loading = false
    },
    async fetchUrl (doi) {
      try {
        const response = await fetch(`${this.$config.NETLIFY_URL || ''}/fetchurl?query=${doi}`)
        const url = await response.text()

        if (response.status === 200 && url) {
          this.url = url
        } else {
          this.pdfNotFound = true
        }
      } catch (err) {
        this.pdfNotFound = true
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
