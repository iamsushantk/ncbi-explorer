<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <a class="navbar-brand" href="#">NCBI Explorer</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <form class="form-inline mt-2 mt-md-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" v-model="searchTerm" />
          <button
            class="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            @click="search()"
          >Search</button>
        </form>
      </div>
    </nav>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="document of documents" :key="document.id">
          <td>{{document.id}}</td>
          <td>{{document.title}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

const searchBaseUrl =
  "https://stackpond-ncbi-api.herokuapp.com/search?database=pubmed";

const summaryBaseUrl =
  "https://stackpond-ncbi-api.herokuapp.com/summary?database=pubmed";

export default {
  name: "Dashboard",
  data() {
    return {
      documents: [],
      searchTerm: ""
    };
  },
  methods: {
    search() {
      let self = this;
      self.documents = [];

      let searchUrl = `${searchBaseUrl}&term=${encodeURIComponent(
        this.searchTerm
      )}`;

      axios.get(searchUrl).then(response => {
        let idList = response.data.esearchresult.idlist;

        let summaryIds = idList.join(",");
        let summaryUrl = `${summaryBaseUrl}&id=${summaryIds}`;

        axios.get(summaryUrl).then(response => {
          let summaryResult = response.data.result;

          summaryResult.uids.forEach(id => {
            let document = {
              id: id,
              title: summaryResult[id].title
            };

            self.documents.push(document);
          });
        });
      });
    }
  }
};
</script>