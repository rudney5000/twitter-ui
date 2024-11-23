<script setup lang="ts">

import CreateTweet from "../components/CreateTweet.vue";
import {useTweetStore} from "../stores/tweet.ts";
import {onMounted, watch} from "vue";
import {useAuthStore} from "../stores/auth.ts";

const tweetStore = useTweetStore()
const authStore = useAuthStore()

onMounted(() => {
  if (authStore.isAuthenticated) {
    tweetStore.fetchTweets(0, 26).catch((error) => {
      console.error("Failed to fetch tweets on mount:", error);
    });
  } else {
    console.warn("L'utilisateur n'est pas authentifié.");
  }
});

watch(
    () => authStore.isAuthenticated,
    (isAuthenticated) => {
      if (isAuthenticated) {
        tweetStore.fetchTweets(0, 26).catch((error) => {
          console.error("Failed to fetch tweets after auth change:", error);
        });
      }
    }
);

</script>

<template>
<div class="home">
  <header class="header">
    <h1>Home</h1>
  </header>
  <CreateTweet/>

  <div v-if="tweetStore.isLoading" class="loading">
    Loading tweets...
  </div>

  <div v-else-if="tweetStore.error" class="error">
    {{ tweetStore.error }}
  </div>

  <div v-else class="tweets">
    <article v-for="tweet in tweetStore.tweets" :key="tweet.id" class="tweet">
<!--      <img :src="`https://api.dicebear.com/7.x/avatars/svg?seed=${tweet.author.id}`" alt="avatar" class="avatar" />-->
      <div class="tweet-content">
        <div class="tweet-header">
<!--          <span class="author">{{ tweet.author.name }}</span>-->
<!--          <span class="handle">{{ tweet.author.handle }}</span>-->
          <span class="timestamp">{{ tweet.createdTimestamp }}</span>
        </div>
        <p class="text">{{ tweet.message }}</p>
        <div class="tweet-actions">
          <button class="action-btn">
            💬
          </button>
          <button
              class="action-btn"
          >
            🔄
          </button>
          <button
              class="action-btn"

          >
            ❤️
          </button>
        </div>
      </div>
    </article>
  </div>
</div>
</template>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
}

.header {
  position: sticky;
  top: 0;
  backdrop-filter: blur(12px);
  background-color: rgba(21, 32, 43, 0.9);
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  z-index: 10;

  h1 {
    font-size: 1.25rem;
    font-weight: bold;
  }
}

.loading, .error {
  padding: 2rem;
  text-align: center;
  color: var(--color-text-secondary);
}

.error {
  color: #ff4444;
}

.tweets {
  .tweet {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid var(--color-border);
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }
  }
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.tweet-content {
  flex: 1;
}

.tweet-header {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.25rem;

  .author {
    font-weight: bold;
  }

  .handle, .timestamp {
    color: var(--color-text-secondary);
  }
}

.text {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.tweet-actions {
  display: flex;
  gap: 4rem;
  margin-top: 0.5rem;
}

.action-btn {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary);
  }

  &.active {
    color: var(--color-primary);
  }
}
</style>