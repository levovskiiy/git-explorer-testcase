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
    value: {
      type: String,
      default: "",
    },
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
}
</style>
