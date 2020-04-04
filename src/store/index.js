import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

//const apiUrl = "http://localhost:3000";
const apiUrl = 'https://stackpond-ncbi-api.herokuapp.com';

const searchBaseUrl = `${apiUrl}/search?database=pubmed`;
const fetchBaseUrl = `${apiUrl}/fetch?database=pubmed`;

const mainModule = {
  state: {
    appName: 'NCBI Explorer',
    documents: [],
    pageLimit: 100,
    currentPageCount: 0,
    documentCount: 0
  },
  getters: {
    documents(state) {
      return state.documents;
    },
    documentCount(state) {
      return state.documentCount;
    },
    totalDocumentsLoaded(state) {
      return state.currentPageCount;
    }

  },
  mutations: {
    reset(state) {
      state.documents = [];
      state.documentCount = 0;
      state.currentPageCount = 0;
    },
    updateSearchResults(state, payload) {
      state.documentCount = payload.documentCount;
      state.documents.push(...payload.documents);
      state.currentPageCount += payload.documentsLoaded;
    }
  },
  actions: {
    search(context, payload) {
      let documents = [];
      let documentCount = 0;
      let documentsLoaded = 0;

      if (payload.reset) {
        context.commit('reset');
      }

      let searchUrl = encodeURI(`${searchBaseUrl}&term=${payload.searchTerm}&retmax=${context.state.pageLimit}&retstart=${context.state.currentPageCount}`);

      axios.get(searchUrl).then(response => {

        console.log(response.data.esearchresult);
        let idList = response.data.esearchresult.idlist;
        documentCount = parseInt(response.data.esearchresult.count);
        documentsLoaded = parseInt(response.data.esearchresult.retmax);

        let fetchUrl = `${fetchBaseUrl}&id=${idList.join(',')}`;

        axios.get(fetchUrl).then(response => {
          let result = response.data;
          let articles = result.PubmedArticleSet.PubmedArticle;

          articles.forEach(article => {
            let abstract = article.MedlineCitation.Article.Abstract;
            let title = article.MedlineCitation.Article.ArticleTitle._text;
            let pmid = article.MedlineCitation.PMID._text;
            let content = '';

            let document = {
              id: parseInt(pmid),
              title: title,
              abstract: ''
            };

            if (abstract) {
              let abstractText = abstract.AbstractText;

              if (Array.isArray(abstractText)) {
                let abstractParagraphs = abstractText.map(a => a._text);
                content = abstractParagraphs.join(',');
              } else if (Array.isArray(abstractText._text)) {
                content = abstractText._text.join(',');
              } else {
                content = abstractText._text;
              }

              document.abstract = content;
            }

            documents.push(document);
          });

          context.commit('updateSearchResults', {
            documents,
            documentCount,
            documentsLoaded
          });
        });
      });
    }
  }
}

/* eslint-disable no-new */
const store = new Vuex.Store({
  modules: {
    main: mainModule
  },
})

export default store