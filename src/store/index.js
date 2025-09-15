import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favorites: [],
  },
  getters: {
    isFavorite: (state) => (id) => {
      return state.favorites.some((r) => r.id === id);
    },
    favorites: (state) => state.favorites,
  },
  mutations: {
    toggleFavorite(state, repo) {
      const index = state.favorites.findIndex((r) => r.id === repo.id);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push({ ...repo });
      }
    },
  },
});
