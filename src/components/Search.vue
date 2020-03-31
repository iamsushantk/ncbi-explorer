<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>PMID</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="document of documents" :key="document.id">
          <td>
            <router-link
              :to="{ name: 'details', params: { documentId: document.id }}"
            >{{document.id}}</router-link>
          </td>
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
  name: "Search",
  data() {
    return {
      documents: [],
      searchTerm: ''
    };
  },
  mounted() {
    let self = this;
    self.documents = [];

    let searchUrl = `${searchBaseUrl}&term=${encodeURIComponent(
      this.$route.params.searchTerm
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
};
</script>