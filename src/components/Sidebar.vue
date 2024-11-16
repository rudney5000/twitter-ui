<script setup lang="ts">

import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";

// const router = useRouter()
// const authStore = useAuthStore()
//
// const handleLogout = () => {
//   authStore.logout()
//   router.push('/login')
// }
</script>

<template>
  <aside class="sidebar">
    <div class="logo">
      <svg viewBox="0 0 24 24" class="twitter-icon"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" fill="currentColor"></path></g></svg>
    </div>
    <nav class="nav">
      <router-link :to="Home" class="nav-item" active-class="active">
        <span class="icon">🏠</span>
        <span class="label">Home</span>
      </router-link>
      <router-link :to="Profile" class="nav-item" active-class="active">
        <span class="icon">👤</span>
        <span class="label">Profile</span>
      </router-link>
      <button @click="handleLogout" class="nav-item">
        <span class="icon">🚪</span>
        <span class="label">Logout</span>
      </button>
    </nav>
    <button class="tweet-btn">
      <span class="full">Tweet</span>
      <span class="icon-only">+</span>
    </button>
  </aside>

<!--  <aside class="sidebar">-->
<!--    <div class="logo">-->
<!--      <svg viewBox="0 0 24 24" class="twitter-icon"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" fill="currentColor"></path></g></svg>-->
<!--    </div>-->
<!--    <nav class="nav">-->
<!--      <router-link to="/home" class="nav-item" active-class="active">-->
<!--        <span class="icon">🏠</span>-->
<!--        <span class="label">Home</span>-->
<!--      </router-link>-->
<!--      <router-link :to="'/profile/' + authStore.user?.id" class="nav-item" active-class="active">-->
<!--        <span class="icon">👤</span>-->
<!--        <span class="label">Profile</span>-->
<!--      </router-link>-->
<!--      <button @click="handleLogout" class="nav-item">-->
<!--        <span class="icon">🚪</span>-->
<!--        <span class="label">Logout</span>-->
<!--      </button>-->
<!--    </nav>-->
<!--    <button class="tweet-btn">-->
<!--      <span class="full">Tweet</span>-->
<!--      <span class="icon-only">+</span>-->
<!--    </button>-->
<!--  </aside>-->
</template>

<style lang="scss" scoped>
.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.logo {
  padding: 0.5rem;

  .twitter-icon {
    width: 2rem;
    height: 2rem;
    color: var(--color-primary);
  }
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 9999px;
  color: var(--color-text);
  text-decoration: none;
  transition: background-color 0.2s;
  border: none;
  background: none;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: rgba(239, 243, 244, 0.1);
  }

  &.active {
    font-weight: bold;
  }
}

.tweet-btn {
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: darken-color(#1da1f2, 10%);
  }

  .icon-only {
    display: none;
  }
}

@media (max-width: 1200px) {
  .nav-item .label {
    display: none;
  }

  .tweet-btn {
    .full {
      display: none;
    }
    .icon-only {
      display: block;
    }
  }
}

@media (max-width: 500px) {
  .sidebar {
    position: fixed;
    bottom: 0;
    top: auto;
    left: 0;
    right: 0;
    height: auto;
    flex-direction: row;
    align-items: center;
    background-color: var(--color-background);
    border-top: 1px solid var(--color-border);
    z-index: 100;
  }

  .logo {
    display: none;
  }

  .nav {
    flex-direction: row;
    flex: 1;
  }

  .tweet-btn {
    position: fixed;
    right: 1rem;
    bottom: 5rem;
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
}

@function darken-color($color, $amount) {
  @return mix(#000, $color, $amount)
}
</style>