<script setup lang="ts">

import {useTweetStore} from "../stores/tweet.ts";
import {useAuthStore} from "../stores/auth.ts";
import {ref} from "vue";

const tweetStore = useTweetStore()
const authStore = useAuthStore()

const tweetMessage = ref<string>('');
const editingTweetId = ref<number | null>(null);

const handleTweet = async () => {
  if (!authStore.isAuthenticated) {
    console.error('User is not authenticated');
    return;
  }
  try {
    if (editingTweetId.value) {
      await tweetStore.editTweet({ id: editingTweetId.value, message: tweetMessage.value });
      console.log('Tweet edited successfully!');
    } else {
      await tweetStore.addTweet({ message: tweetMessage.value });
      console.log('Tweet created successfully!');
    }

    tweetMessage.value = '';
    editingTweetId.value = null;
  } catch (error) {
    console.error('Error handling tweet:', error);
  }
};

const initializeEdit = (tweetId: number, message: string) => {
  editingTweetId.value = tweetId;
  tweetMessage.value = message;
};
</script>

<template>
  <div class="create-tweet">
<!--    <img :src="`https://api.dicebear.com/7.x/avatars/svg?seed=${authStore.user?.id}`" alt="avatar" class="avatar" />-->
    <div class="content">
      <textarea
          v-model="tweetMessage"
          placeholder="What's happening?"
      ></textarea>
      <div class="actions">
        <button @click="handleTweet" class="btn" >
          {{ editingTweetId ? 'Edit Tweet' : 'Tweet' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.create-tweet {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  textarea {
    width: 100%;
    min-height: 100px;
    background: transparent;
    border: none;
    color: var(--color-text);
    font-size: 1.25rem;
    resize: none;
    padding: 0.5rem;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--color-text-secondary);
    }
  }
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>