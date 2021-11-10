import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { bills: [] },
  mutations: {
    setBill(state, bill) {
      state.bills.push(bill);
    },
  },
  actions: {
    setBill(state, bill) {
      state.commit("setBill", bill);
    },
  },
  getters: {
    getBills(state) {
      return state.bills;
    },
  },
});
