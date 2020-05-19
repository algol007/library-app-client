import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    carts: [],
  },
  mutations: {
    carts(state, data) {
      state.carts = data;
      console.log(state.carts);
    },
  },
  actions: {
    readUserCart(context) {
      axios
        .get(process.env.VUE_APP_BASE_URL + 'user/cart/2') // eslint-disable-line
        .then((res) => {
          context.commit('carts', res.data.carts.rows);
        });
    },
  },
});
