import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    books: [],
    book: [],
    sort: [],
  },
  mutations: {
    books(state, data) {
      state.books = data;
    },
    book(state, data) {
      state.book = data;
      // console.log(state.book);
    },
    sort(state, data) {
      state.sort = data;
    },
  },
  actions: {
    readAllBooks(context, { page, data }) {
      axios
        .get(process.env.VUE_APP_BASE_URL + 'book?page=' + page + data)  // eslint-disable-line
        .then((res) => {
          context.commit('books', res.data.books.rows);
          context.commit('sort', data);
        });
    },
    readBookById(context, id) {
      axios
        .get(process.env.VUE_APP_BASE_URL + 'book/' + id)  // eslint-disable-line
        .then((res) => {
          context.commit('book', res.data.book);
        });
    },
  },
});
