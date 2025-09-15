<template>
  <div class="favorites-list">
    <h3 class="title">Избранные: {{ favorites.length }}</h3>
    <div v-if="favorites.length === 0">
      Вы не добавили еще ни 1 одного репозитория
    </div>
    <template v-else>
      <RepositoryCard
        v-for="repo in favorites"
        :key="repo.id"
        :id="repo.id"
        :name="repo.name"
        :full-name="repo.full_name"
        :forks="repo.forks_count"
        :stars="repo.stargazers_count"
        :owner="repo.owner"
        @toggle-favorite="toggleFavorite(repo)"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import RepositoryCard from "./RepositoryCard.vue";

export default {
  name: "FavoritesList",
  components: {
    RepositoryCard,
  },
  computed: {
    ...mapGetters(["favorites"]),
  },
  methods: {
    ...mapMutations(["toggleFavorite"]),
  },
};
</script>

<style scoped lang="scss">
.favorites-list {
  display: flex;
  flex-flow: column nowrap;
  gap: var(--space-md);

  .title {
    font-size: var(--font-size-lg);
    font-weight: 600;
  }
}
</style>
