<template>
  <div class="repository-list">
    <div class="counter">Всего: {{ total }}, Найдено: {{ items.length }}</div>
    <div class="list">
      <RepositoryCard
        v-for="repo in items"
        :key="repo.id"
        :id="repo.id"
        :name="repo.name"
        :full-name="repo.full_name"
        :forks="repo.forks_count"
        :stars="repo.stargazers_count"
        :owner="repo.owner"
        @toggle-favorite="toggleFavorite(repo)"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import RepositoryCard from "./RepositoryCard.vue";

export default {
  name: "RepositoryList",
  components: {
    RepositoryCard,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    count() {
      return this.items.length;
    },
  },
  methods: {
    ...mapMutations(["toggleFavorite"]),
  },
};
</script>

<style scoped lang="scss">
.repository-list {
  display: flex;
  flex-flow: column nowrap;
  gap: var(--space-md);

  .counter {
    color: var(--color-text-secondary);
    font-size: 12px;
  }

  .list {
    display: flex;
    flex-flow: column nowrap;
    gap: var(--space-md);
  }
}
</style>
