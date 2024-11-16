<script setup lang="ts">

import {useRouter} from "vue-router";
import {useAuthStore} from "../stores/auth.ts";
import {ref} from "vue";
import { required, email as emailValidator, minLength } from '@vuelidate/validators'
import useVuelidate from "@vuelidate/core";

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  email: '',
  password: ''
})

const rules = {
  email: { required, email: emailValidator },
  password: { required, minLength: minLength(6) }
}

const v$ = useVuelidate(rules, formData)

const handleLogin = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  try {
    await authStore.login(formData.value.email, formData.value.password)
    router.push('/home')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-box">
      <h1>Log in to Twitter</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
              id="email"
              type="email"
              v-model="formData.email"
              :class="{ 'error': v$.email.$error }"
              placeholder="Enter your email"
          />
          <div class="error-message" v-if="v$.email.$error">
            <span v-if="v$.email.required.$invalid">Email is required</span>
            <span v-else-if="v$.email.email.$invalid">Please enter a valid email</span>
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
              id="password"
              type="password"
              v-model="formData.password"
              :class="{ 'error': v$.password.$error }"
              placeholder="Enter your password"
          />
          <div class="error-message" v-if="v$.password.$error">
            <span v-if="v$.password.required.$invalid">Password is required</span>
            <span v-else-if="v$.password.minLength.$invalid">Password must be at least 6 characters</span>
          </div>
        </div>
        <button type="submit" class="btn" :disabled="v$.$invalid">Log in</button>
      </form>
      <p class="auth-switch">
        Don't have an account?
        <router-link to="/register">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.auth-box {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
}

.auth-switch {
  margin-top: 1rem;
  text-align: center;
  color: var(--color-text-secondary);

  a {
    color: var(--color-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.error {
  border-color: #ff4444 !important;
}

.error-message {
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;

  &:hover {
    background-color: var(--color-primary);
  }
}
</style>