<template>
  <div class="app">
    <nav class="nav">
      <div class="container flex justify-between align-center">
        <router-link to="/" class="nav-link">GitHub Explorer</router-link>
      </div>
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

<style scoped>
.nav {
  padding: var(--space-md) 40px;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.nav-link {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.main {
  min-height: calc(100vh - 80px);
}
</style>
