<template>
  <div class="loader">
    <div class="dot dot-1"></div>
    <div class="dot dot-2"></div>
    <div class="dot dot-3"></div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.loader {
  height: 40px;
  width: 56px;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  position: relative;

  .dot {
    top: 0;
    border-radius: 99999px;
    animation: dot-loader 1s linear infinite;

    &.dot-1 {
      left: 4px;
      animation-delay: -0.4s;
    }

    &.dot-2 {
      left: 14px;
      animation-delay: -0.2s;
    }

    &.dot-3 {
      left: 24px;
      animation-delay: 0s;
    }
  }
}

@keyframes dot-loader {
  0%,
  50% {
    width: 8px;
    height: 8px;
    background: var(--color-primary);
    opacity: 0.4;
  }
  100% {
    width: 12px;
    height: 12px;
    background: var(--color-primary);
    opacity: 0.8;
  }
}
</style>
