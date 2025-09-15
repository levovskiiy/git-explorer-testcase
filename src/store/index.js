import Vue from "vue";
import Vuex from "vuex";
import { LocalStorage } from "../common/util";

Vue.use(Vuex);

const STORAGE_KEY = "favorites";

export default new Vuex.Store({
  state: {
    favorites: LocalStorage.get(STORAGE_KEY, []),
  },
  getters: {
    uniqueFavorites: (state) => new Set(state.favorites.map((it) => it.id)),
    isFavorite: (_, getters) => (id) => {
      return getters.uniqueFavorites.has(id);
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

      LocalStorage.put(STORAGE_KEY, state.favorites);
    },
  },
});
