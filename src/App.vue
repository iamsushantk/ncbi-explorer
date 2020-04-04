<template>
  <div id="app">
    <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
      <span class="navbar-brand">{{$store.state.main.appName}}</span>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="input-group">
            <textarea
              type="text"
              rows="1"
              class="form-control"
              v-model="searchTerm"
              placeholder="Enter search term"
            ></textarea>
            <div class="input-group-append">
              <input type="button" class="input-group-text" @click="search(true)" value="Search" />
              <input
                v-show="documents.length > 0"
                type="button"
                class="ml-2 input-group-text"
                @click="logToConsole()"
                value="Log"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row m-1">
        <div
          v-for="(document, documentIndex) of documents"
          :key="documentIndex"
          class="card mt-1 col-12"
        >
          <div class="card-body">
            <h6 class="card-title">PMID# {{document.id}}</h6>
            <h5 class="card-title">{{document.title}}</h5>
            <hr />
            <div class="card-text text-justify">{{document.abstract}}</div>
          </div>
        </div>
      </div>
    </div>
    <nav v-show="documents.length > 0" class="navbar fixed-bottom navbar-light navbar-dark bg-dark">
      <div class="btn btn-outline-success m-1" @click="search(false)">More</div>
      <span
        class="navbar-brand"
      >{{$store.getters.totalDocumentsLoaded}}/{{$store.getters.documentCount}}</span>
    </nav>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      filterTerm: "",
      searchTerm: ""
    };
  },
  computed: {
    documents() {
      if (this.filterTerm !== "") {
        return this.$store.getters.documents.filter(d =>
          d.id.includes(this.filterTerm)
        );
      } else {
        return this.$store.getters.documents;
      }
    }
  },
  methods: {
    search(reset) {
      this.$store.dispatch("search", {
        searchTerm: this.searchTerm,
        reset: reset
      });
    },
    logToConsole() {
      console.log(this.$store.getters.documents);
    }
  }
};
</script>
<style>
body {
  padding-top: 70px;
  padding-bottom: 70px;
}
</style>