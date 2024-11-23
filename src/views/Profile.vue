<script setup lang="ts">

import {ref} from "vue";

const showModal = ref(false);

// Fonction pour ouvrir la modale
const openModal = () => {
  showModal.value = true
};

// Fonction pour fermer la modale
const closeModal = () => {
  showModal.value = false
};

const submitProfile = () => {
  closeModal()
}
</script>

<template>
  <div class="profile">
    <header class="header">
      <h1>name of profile</h1>
      <div class="tweet-count">Tweets</div>
    </header>

    <div class="profile-header">
      <div class="banner"></div>
      <div class="profile-info">
<!--        <img :src="`https://api.dicebear.com/7.x/avatars/svg?seed=${profile.id}`" alt="avatar" class="avatar" />-->
        <div class="info">
          <h2>name of profile</h2>
          <p class="handle">handle of profile</p>
          <p class="bio">biography of profile</p>
          <p class="join-date">🗓️ Joined date of profile</p>
          <div class="stats">
            <span><strong>following of profile</strong> Following</span>
            <span><strong>followers of profile</strong> Followers</span>
          </div>
        </div>
<!--        <button v-if="profile.id !== authStore.user?.id" class="btn btn&#45;&#45;outline">-->
<!--          Follow-->
<!--        </button>-->
        <div class="btns">
          <button class="btn btn--outline">
            Follow
          </button>
          <button @click="openModal" class="btn btn1 btn--outline">
            Update
          </button>
        </div>
      </div>

      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <h2>Créer ou Modifier le Profil</h2>
          <form @submit.prevent="submitProfile">
            <div>
              <div class="form-group">
                <label for="profile-name">nickname</label>
                <input type="text" id="profile-handle" v-model="profileNickname" placeholder="Nickname" required />
              </div>
              <div class="form-group">
                <label for="profile-imgLink">imgLink</label>
                <input type="text" id="profile-imgLink" v-model="profileHandle" placeholder="imgLink" required />
              </div>
            </div>


            <button type="submit" class="btn">Enregistrer</button>
            <button type="button" @click="closeModal" class="btn">Fermer</button>
          </form>
        </div>
      </div>
    </div>

<!--    <div class="tweets">-->
<!--      <article v-for="tweet in tweets" :key="tweet.id" class="tweet">-->
<!--        <img :src="`https://api.dicebear.com/7.x/avatars/svg?seed=${profile.id}`" alt="avatar" class="avatar" />-->
<!--        <div class="tweet-content">-->
<!--          <div class="tweet-header">-->
<!--            <span class="author">{{ profile.name }}</span>-->
<!--            <span class="timestamp">{{ tweet.timestamp }}</span>-->
<!--          </div>-->
<!--          <p class="text">{{ tweet.content }}</p>-->
<!--          <div class="tweet-actions">-->
<!--            <button class="action-btn">-->
<!--              💬 {{ Math.floor(Math.random() * 10) }}-->
<!--            </button>-->
<!--            <button class="action-btn">-->
<!--              🔄 {{ tweet.retweets }}-->
<!--            </button>-->
<!--            <button class="action-btn">-->
<!--              ❤️ {{ tweet.likes }}-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </article>-->
<!--    </div>-->
  </div>
</template>

<style lang="scss" scoped>
.profile {
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

  .tweet-count {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }
}

.profile-header {
  border-bottom: 1px solid var(--color-border);
}

.banner {
  height: 200px;
  background-color: var(--color-primary);
  opacity: 0.8;
}

.profile-info {
  padding: 1rem;
  position: relative;

  .avatar {
    width: 134px;
    height: 134px;
    border-radius: 50%;
    border: 4px solid var(--color-background);
    margin-top: -72px;
    margin-bottom: 1rem;
  }

  .info {
    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.25rem;
    }

    .handle {
      color: var(--color-text-secondary);
      margin-bottom: 1rem;
    }

    .bio {
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .join-date {
      color: var(--color-text-secondary);
      margin-bottom: 1rem;
    }

    .stats {
      display: flex;
      gap: 1.5rem;
      color: var(--color-text-secondary);

      strong {
        color: var(--color-text);
      }
    }
  }

  .btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
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

  .timestamp {
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
}

.btn1 {
  display: flex;
  margin-right: 8rem;
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


</style>