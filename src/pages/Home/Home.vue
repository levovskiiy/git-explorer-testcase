<template>
  <div class="home">
    <div class="filters">
      <SearchInput v-model="searchQuery" placeholder="Поиск репозиториев" />
      <CopyButton label="Копировать" :text="searchQuery" />
    </div>
    <div class="content">
      <section class="repos" :class="{ loading }">
        <Loader v-if="loading" />
        <template v-else>
          <RepositoryList :items="repos" :total="totalItems" />
          <Paginator
            v-if="repos.length > 0"
            v-model="page"
            :per-page="per_page"
            :total="1000"
          />
        </template>
      </section>
      <aside class="favorites">
        <FavoritesList />
      </aside>
    </div>
  </div>
</template>

<script>
import SearchInput from "../../common/components/SearchInput.vue";
import CopyButton from "../../common/components/CopyButton.vue";
import Loader from "../../common/components/Loader.vue";
import Paginator from "../../common/components/Paginator.vue";

import RepositoryList from "./RepositoryList.vue";
import FavoritesList from "./FavoritesList.vue";
import { searchRepositories } from "../../common/api";

export default {
  name: "Home",
  components: {
    SearchInput,
    RepositoryList,
    FavoritesList,
    CopyButton,
    Loader,
    Paginator,
  },
  data() {
    return {
      loading: false,
      repos: [],
      totalItems: 0,
      searchQuery: "",
      page: 1,
      per_page: 20,
    };
  },
  created() {
    this.$options.unwatch = this.$watch(
      () => [this.searchQuery, this.page],
      this.searchRepositories
    );
  },
  methods: {
    async searchRepositories() {
      if (!this.searchQuery.trim()) {
        this.reset();
        return;
      }

      this.loading = true;
      const data = await searchRepositories(
        this.searchQuery,
        this.page,
        this.per_page
      );
      this.repos = data.items || [];
      this.totalItems = data.total_count;
      this.loading = false;
    },
    reset() {
      this.repos = [];
      this.page = 1;
      this.searchQuery = "";
      this.totalItems = 0;
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
  height: calc(100vh - 80px);

  .filters {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-xl);
  }

  .content {
    flex: 1;
    display: flex;
    flex-flow: row nowrap;
    gap: var(--space-md);

    .repos {
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
      gap: var(--space-md);
      margin-bottom: var(--space-md);

      &.loading {
        height: 100%;
        align-items: center;
        justify-content: center;
      }

      .counter {
        color: var(--color-text-secondary);
        font-size: 12px;
      }
    }

    .favorites {
      min-width: 600px;
    }
  }
}
</style>
