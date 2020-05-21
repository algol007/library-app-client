import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    carts: [],
    allCarts: [],
  },
  mutations: {
    carts(state, data) {
      const status = data.filter((item) => item.status !== 3);
      state.carts = status;
      // console.log(state.carts);
    },
  },
  actions: {
    readUserCart(context, id) {
      axios
        .get(process.env.VUE_APP_BASE_URL + 'user/cart/' + id) // eslint-disable-line
        .then((res) => {
          context.commit('carts', res.data.carts.rows);
        });
    },
    readAllCarts(context) {
      axios
        .get(process.env.VUE_APP_BASE_URL + 'cart') // eslint-disable-line
        .then((res) => {
          context.commit('carts', res.data.carts.rows);
        });
    },
  },
});
