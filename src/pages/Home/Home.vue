<template>
  <div class="home">
    <SearchInput v-model="searchQuery" placeholder="Поиск репозиториев" />
    <div v-if="loading">loading...</div>
    <div v-else class="content">
      <section class="repos">
        <RepositoryList :items="repos" :total="totalItems" />
      </section>
      <aside class="favorites">
        <FavoritesList />
      </aside>
    </div>
  </div>
</template>

<script>
import SearchInput from "../../common/components/SearchInput.vue";
import RepositoryList from "./RepositoryList.vue";
import FavoritesList from "./FavoritesList.vue";

export default {
  name: "Home",
  components: {
    SearchInput,
    RepositoryList,
    FavoritesList,
  },
  data() {
    return {
      loading: false,
      repos: [],
      totalItems: 0,
      searchQuery: "",
    };
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
      this.totalItems = data.total_count;
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  padding: var(--space-xl);
  display: flex;
  flex-flow: column nowrap;
  gap: var(--space-md);

  .content {
    display: flex;
    flex-flow: row nowrap;
    gap: var(--space-md);

    .repos {
      flex: 1;

      .counter {
        color: var(--color-text-secondary);
        font-size: 12px;
        margin-bottom: var(--space-md);
      }
    }

    .favorites {
      min-width: 600px;
    }
  }
}
</style>
