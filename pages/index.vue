<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <div class="text-green-600 mb-24">
      <svg
        class="h-16 fill-current"
        aria-hidden="true"
        focusable="false"
        data-icon="scroll"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
      >
        <path
          fill="currentColor"
          d="M48 0C21.53 0 0 21.53 0 48v64c0 8.84 7.16 16 16 16h80V48C96 21.53 74.47 0 48 0zm208 412.57V352h288V96c0-52.94-43.06-96-96-96H111.59C121.74 13.41 128 29.92 128 48v368c0 38.87 34.65 69.65 74.75 63.12C234.22 474 256 444.46 256 412.57zM288 384v32c0 52.93-43.06 96-96 96h336c61.86 0 112-50.14 112-112 0-8.84-7.16-16-16-16H288z"
        />
      </svg>
    </div>
    <form
      class="flex max-w-full px-3"
      @submit.prevent="search"
    >
      <input
        v-model="query"
        type="search"
        placeholder="Enter a DOI, URL, or title"
        class="w-96 max-w-full h-10 rounded-l px-5"
      >
      <div>
        <button
          class="bg-green-600 text-white h-10 rounded-r px-5 leading-10 m-0"
          @click="search"
        >
          Find
        </button>
      </div>
    </form>
    <button
      class="mt-2 mb-32 text-sm text-gray-700"
      @click="randomArticle"
    >
      Gimme a random article
    </button>
    <div class="absolute bottom-0 mb-4 text-sm text-center text-gray-400 italic">
      Made with ♥ in Utrecht
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      articles: [
        '10.1242/jeb.119552',
        '10.1111/jopy.12396',
        '10.1038/s41598-020-65295-4',
        '10.1038/s41598-019-43267-7',
        '10.1093/ae/59.3.168',
        '10.1371/journal.pone.0054706',
        '10.1016/j.jad.2017.04.017',
        '10.1016/j.jasrep.2019.102002',
        '10.1002/ijc.11382',
        '10.1038/sj.ejcn.1601997',
        '10.1097/01.cej.0000186632.04625.f6',
        '10.1007/s11999-015-4555-8',
        '10.1038/s41598-018-23005-1',
        '10.1093/humrep/dem133',
        '10.1016/0003-9969(95)00026-L',
        '10.1186/2047-2994-2-22',
        '10.1111/j.1365-2133.2012.10826.x',
        '10.1037/0022-3514.54.5.768',
        '10.3389/fpsyg.2017.00702',
        '10.1007/s10329-017-0624-9',
        '10.1007/s10886-018-0950-4',
        '10.1179/sic.1990.35.3.153',
        '10.1016/j.gie.2005.10.014',
        '10.1038/srep44707',
        '10.1016/0090-4295(80)90414-8',
        '10.1016/j.leaqua.2018.01.004'
      ]
    }
  },
  methods: {
    randomArticle () {
      this.query = this.articles[Math.floor(Math.random() * this.articles.length)]
    },
    search () {
      this.$router.push(encodeURIComponent(this.query))
    }
  }
}
</script>
