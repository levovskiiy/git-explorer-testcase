<template>
  <button
    @click="copyText"
    :class="{ copied: isCopied }"
    class="button primary copy-btn"
  >
    {{ buttonText }}
  </button>
</template>

<script>
import { nextTick } from "vue";

export default {
  name: "CopyButton",
  props: {
    text: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    delay: {
      type: Number,
      default: 2000,
    },
  },
  data() {
    return {
      isCopied: false,
    };
  },
  computed: {
    buttonText() {
      return this.isCopied ? "Скопировано!" : this.label;
    },
  },
  methods: {
    async copyText() {
      await navigator.clipboard.writeText(this.text);
      console.log("write");

      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, this.delay);
    },
  },
};
</script>

<style scoped lang="scss">
.copy-btn {
  &.copied {
    background: var(--color-success);
  }
}
</style>
