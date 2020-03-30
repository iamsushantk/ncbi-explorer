<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">NCBI Explorer</router-link>
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
            @click="search()"
          />
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      searchTerm: ""
    };
  },
  methods: {
    search() {
      this.$router.push({ name: "search", params: { searchTerm: this.searchTerm } });
      this.$router.go();
    }
  }
};
</script>