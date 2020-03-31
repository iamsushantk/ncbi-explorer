<template>
  <div class="container-fluid">
    <h5>PMID# {{$route.params.documentId}}</h5>
    <h4>{{title}}</h4>
    <hr />
    <p>{{abstract}}</p>
  </div>
</template>

<script>
import axios from "axios";

const fetchBaseUrl =
  "https://stackpond-ncbi-api.herokuapp.com/fetch?database=pubmed";

export default {
  name: "Details",
  data() {
    return {
      title: "",
      abstract: ""
    };
  },
  mounted() {
    let self = this;
    let fetchUrl = `${fetchBaseUrl}&id=${this.$route.params.documentId}`;

    axios.get(fetchUrl).then(response => {
      let article =
        response.data.PubmedArticleSet.PubmedArticle.MedlineCitation.Article;
      self.title = article.ArticleTitle._text;
      self.abstract = JSON.stringify(article.Abstract.AbstractText._text);
    });
  }
};
</script>