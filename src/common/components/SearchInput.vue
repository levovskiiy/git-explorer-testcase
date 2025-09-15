<template>
  <input
    class="search-input"
    type="text"
    v-model="localQuery"
    :placeholder="placeholder"
    @input="search"
  />
</template>

<script lang="js">
export default {
  name: "SearchInput",
  props: {
    /**
     * @desc Текущее значение
     */
    value: {
      type: String,
      default: "",
    },
    /**
     * @desc Заддержка обновления значения
     */
    delay: {
      type: Number,
      default: 300,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      localQuery: this.value,
    };
  },
  methods: {
    search() {
      clearTimeout(this.$options.timeout);
      this.$options.timeout = setTimeout(() => {
        this.$emit("input", this.localQuery);
      }, this.delay);
    },
  },
};
</script>

<style scoped>
.search-input {
  width: 100%;
  height: 32px;
  padding: var(--space-md);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  transition: var(--transition-smooth);
  background: var(--color-background);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.search-input::placeholder {
  color: var(--color-text-secondary);
}
</style>
