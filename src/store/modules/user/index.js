import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    local: [],
    user: [],
  },
  mutations: {
    local(state, data) {
      state.local = data;
      // console.log(state.local);
    },
    user(state, data) {
      state.user = data;
      // console.log(state.user);
    },
  },
  actions: {
    getLocalData(context) {
      const parsed = JSON.parse(localStorage.getItem('items'));
      context.commit('local', parsed);
    },
    signout(context) {
      context.commit('local', 0);
      context.commit('user', 0);
    },
    readUser(context, id) {
      axios
        .get(process.env.VUE_APP_BASE_URL + 'user/' + id) // eslint-disable-line
        .then((res) => {
          context.commit('user', res.data.user);
        });
    },
  },
});
