<template>
  <nav class="paginator">
    <span v-for="(page, i) in pages" :key="page ? page : 'page-' + i">
      <button
        v-if="typeof page === 'number'"
        @click="goTo(page)"
        :class="{ current: page === value }"
        class="button primary page"
      >
        {{ page }}
      </button>
      <span v-else>...</span>
    </span>
  </nav>
</template>

<script>
export default {
  name: "Paginator",
  props: {
    /**
     * @desc Общее количество элементов
     */
    total: {
      type: Number,
      required: true,
    },
    /**
     * @desc Кол-во элемента на каждой странице
     */
    perPage: {
      type: Number,
      required: true,
    },
    /**
     * @desc текущая страница
     */
    value: {
      type: Number,
      required: true,
    },
    /**
     * @desc сколько страниц показывать до ... и после
     */
    maxVisible: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    totalPages() {
      return Math.max(1, Math.ceil(this.total / this.perPage));
    },
    pages() {
      const result = [];
      const half = Math.floor(this.maxVisible / 2);

      let start = Math.max(2, this.value - half);
      let end = Math.min(this.totalPages - 1, this.value + half);

      if (this.value - 1 <= half) {
        start = 2;
        end = Math.min(this.totalPages - 1, this.maxVisible);
      }

      if (this.totalPages - this.value <= half) {
        start = Math.max(2, this.totalPages - this.maxVisible + 1);
        end = this.totalPages - 1;
      }

      result.push(1);
      if (start > 2) {
        result.push(null);
      }

      for (let i = start; i <= end; i++) result.push(i);

      if (end < this.totalPages - 1) {
        result.push(null);
      }

      if (this.totalPages > 1) {
        result.push(this.totalPages);
      }

      return result;
    },
  },
  methods: {
    goTo(page) {
      if (page < 1 || page > this.totalPages) {
        return;
      }

      this.$emit("input", page);
    },
  },
};
</script>

<style lang="scss" scoped>
.paginator {
  display: flex;
  align-items: center;
  gap: var(--space-xs);

  .page.current {
    background: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-text);
  }
}
</style>
