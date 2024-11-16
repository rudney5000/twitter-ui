<script setup lang="ts">

import Sidebar from "./Sidebar.vue";
import TrendsSidebar from "./TrendsSidebar.vue";
</script>

<template>
  <div class="layout">
    <Sidebar/>
    <main class="main-content">
      <RouterView/>
    </main>
    <TrendsSidebar/>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-columns: 275px 1fr 350px;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
}

.main-content {
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
}

@media (max-width: 1200px) {
  .layout {
    grid-template-columns: 88px 1fr 350px;
  }
}

@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 88px 1fr;
  }
}

@media (max-width: 500px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>