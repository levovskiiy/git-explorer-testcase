<template>
  <div class="home">
    <SearchInput v-model="searchQuery" />
    <div v-if="loading">loading...</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SearchInput from "../../components/SearchInput.vue";

export default {
  name: "Home",
  components: {
    SearchInput,
  },
  data() {
    return {
      loading: false,
      repos: [],
      searchQuery: "",
    };
  },
  computed: {
    ...mapState(["favorites"]),
  },
  watch: {
    searchQuery() {
      this.searchRepositories();
    },
  },
  methods: {
    async searchRepositories() {
      if (!this.searchQuery.trim) {
        this.repos = [];
        return;
      }

      this.loading = true;
      const resp = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(
          this.searchQuery
        )}`
      );

      const data = await resp.json();
      this.repos = data.items || [];
      this.loading = false;
    },
    toggleFavorite(repo) {
      this.$store.commit("toggleFavorite", repo);
    },
  },
};
</script>
