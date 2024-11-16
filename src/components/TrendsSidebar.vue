<script setup lang="ts">

const trends = [
  { id: 1, topic: 'Technology', tweets: '125K' },
  { id: 2, topic: 'Programming', tweets: '89K' },
  { id: 3, topic: 'Vue.js', tweets: '45K' },
  { id: 4, topic: 'JavaScript', tweets: '200K' },
  { id: 5, topic: 'TypeScript', tweets: '78K' },
]
</script>

<template>
  <aside class="trends">
    <div class="trends-container">
      <h2>Trends for you</h2>
      <div class="trends-list">
        <div v-for="trend in trends" :key="trend.id" class="trend-item">
          <div class="trend-topic">{{ trend.topic }}</div>
          <div class="trend-tweets">{{ trend.tweets }} Tweets</div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.trends {
  padding: 1rem;
  position: sticky;
  top: 0;
  height: 100vh;
}

.trends-container {
  background-color: #192734;
  border-radius: 16px;
  padding: 1rem;

  h2 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
}

.trend-item {
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }

  &:last-child {
    border-bottom: none;
  }
}

.trend-topic {
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.trend-tweets {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

@media (max-width: 1024px) {
  .trends {
    display: none;
  }
}
</style>