<template>
  <div id="app">
    <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
      <span class="navbar-brand">{{$store.state.main.appName}}</span>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="form-inline mt-2 mt-md-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" v-model="searchTerm" />
          <input
            type="button"
            value="Search"
            class="btn btn-outline-success my-2 my-sm-0"
            @click="search(true)"
          />
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <input type="text" placeholder="Search" class="form-control" v-model="filterTerm" />
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
      <div class="btn btn-outline-success m-1" @click="search(false)">Load more</div>
      <span
        class="navbar-brand"
      >Loaded total of {{$store.getters.totalDocumentsLoaded}} of {{$store.getters.documentCount}} documents</span>
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
        return this.$store.getters.documents.filter(
          d => d.id.includes(this.filterTerm)
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