<template>
  <nuxt-child
    v-if="$route.name === 'query-pdf'"
    :url="url"
  />
  <div
    v-else-if="loading || notFound"
    class="h-screen flex justify-center items-center text-gray-700"
  >
    <div v-if="loading">
      <div>Loading article</div>
    </div>
    <div v-else-if="notFound">
      Could not find the article
    </div>
  </div>
  <div
    v-else
    class="flex"
  >
    <div class="flex flex-col h-screen w-full md:w-1/2 p-4 sm:p-5 overflow-auto">
      <div class="flex-grow mb-4">
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
      <button
        :disabled="!url"
        :class="{ 'opacity-50': !url }"
        class="block w-full mt-3 py-2 px-4 md:hidden rounded bg-green-600 text-white text-center"
        @click="() => $router.push(`${$route.path}/pdf`)"
        v-text="url ? 'Open PDF' : pdfNotFound ? 'There is no PDF for this article' : 'Searching for PDF'"
      />
    </div>
    <div class="hidden md:block w-1/2">
      <iframe
        :src="url"
        class="w-full h-screen bg-gray-200"
        no-referrer
      />
      <div
        v-if="pdfNotFound"
        class="flex justify-center items-center w-full h-full"
      >
        <div>
          Sorry, could not find the PDF 😕
        </div>
      </div>
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
          } else {
            fetch(`${this.$config.NETLIFY_URL || ''}/.netlify/functions/fetchurl?query=${json.metadata.doi}`)
              .then((response) => {
                if (response.status !== 200) {
                  throw new Error('Status code not 200')
                }
                return response
              })
              .then(async response => await response.text())
              .then((url) => {
                if (url) {
                  this.url = url
                } else {
                  this.pdfNotFound = true
                }
              })
              .catch(() => {
                this.pdfNotFound = true
              })
          }
        } else {
          this.notFound = true
        }
        this.loading = false
      }
    }
  },
  methods: {
    beautifyDate (dateString) {
      return dateString ? dayjs(dateString).format('D MMMM YYYY') : null
    }
  },
  head () {
    return {
      title: this.metadata?.title
    }
  }
}
</script>
