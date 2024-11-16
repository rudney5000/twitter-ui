<script setup lang="ts">
// const authStore = useAuthStore()
// const tweetStore = useTweetStore()
// const tweetContent = ref('')
// const isLoading = ref(false)
//
// const handleTweet = async () => {
//   if (!tweetContent.value.trim()) return
//
//   isLoading.value = true
//   try {
//     await tweetStore.createTweet({ content: tweetContent.value })
//     tweetContent.value = ''
//   } catch (error) {
//     console.error('Failed to create tweet:', error)
//   } finally {
//     isLoading.value = false
//   }
// }
</script>

<template>
<!--  <div class="create-tweet">-->
<!--    <img :src="`https://api.dicebear.com/7.x/avatars/svg?seed=${authStore.user?.id}`" alt="avatar" class="avatar" />-->
<!--    <div class="content">-->
<!--      <textarea-->
<!--          v-model="tweetContent"-->
<!--          placeholder="What's happening?"-->
<!--          :disabled="isLoading"-->
<!--      ></textarea>-->
<!--      <div class="actions">-->
<!--        <button class="btn" @click="handleTweet" :disabled="!tweetContent.trim() || isLoading">-->
<!--          Tweet-->
<!--        </button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <div class="create-tweet">
    <img :src="`https://api.dicebear.com/7.x/avatars/svg?seed=`" alt="avatar" class="avatar" />
    <div class="content">
      <textarea
          placeholder="What's happening?"
      ></textarea>
      <div class="actions">
        <button class="btn">
          Tweet
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