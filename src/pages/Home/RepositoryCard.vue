<template>
  <div class="repository-card">
    <img
      :src="owner.avatar_url"
      :alt="owner.login"
      class="avatar"
      width="50"
      height="50"
    />
    <div class="info">
      <RouterLink :to="repoPageUrl">{{ fullName }}</RouterLink>
      <div class="status">⭐ {{ stars }} | 🔄 {{ forks }}</div>
    </div>
    <button class="button" @click="$emit('toggle-favorite')">
      {{ favoriteIcon }}
    </button>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { mapGetters } from "vuex";

export default {
  name: "RepositoryCard",
  components: {
    RouterLink,
  },
  props: {
    /**
     * @desc ID репозитория
     */
    id: {
      type: Number,
      required: true,
    },
    /**
     * @desc Наименование репозитория
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * @desc Полное наименование репозитория
     */
    fullName: {
      type: String,
      required: true,
    },
    /**
     * @desc владелец репозитория
     */
    owner: {
      type: Object,
      required: true,
    },
    /**
     * @desc Количество звезд
     */
    stars: {
      type: Number,
      required: true,
    },
    /**
     * @desc Количесто форков
     */
    forks: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["isFavorite"]),
    repoPageUrl() {
      return `/repo/${this.owner.login}/${this.name}`;
    },
    favorited() {
      return this.isFavorite(this.id);
    },
    favoriteIcon() {
      return this.favorited ? "❤️" : "♡";
    },
  },
};
</script>

<style scoped lang="scss">
.repository-card {
  display: flex;
  align-items: center;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  padding: var(--space-md);
  margin-bottom: var(--space-sm);
  transition: var(--transition-smooth);
  box-shadow: var(--shadow-sm);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }

  .avatar {
    border-radius: 50%;
    margin-right: var(--space-md);
    border: 2px solid var(--color-border);
  }

  .info {
    flex: 1;
  }

  .name {
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-base);
    color: var(--color-text);
    display: block;
    margin-bottom: var(--space-xs);
  }
}
</style>
