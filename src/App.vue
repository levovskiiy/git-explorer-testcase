<template>
  <div class="app">
    <nav class="nav">
      <RouterLink to="/" class="nav-link">GitHub Explorer</RouterLink>
    </nav>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<script>
import { RouterView } from "vue-router";

export default {
  name: "App",
};
</script>

<style scoped lang="scss">
.app {
  .nav {
    padding: var(--space-md) 40px;
    background-color: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow-sm);

    &-link {
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--color-primary);
    }
  }

  .main {
    min-height: calc(100vh - 80px);
  }
}
</style>
