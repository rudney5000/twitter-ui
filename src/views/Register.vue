<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator, minLength, sameAs } from '@vuelidate/validators'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  captcha: ''
})

const captchaCode = ref('')
const captchaError = ref('')
const captchaImage = ref('')

const generateCaptcha = () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  canvas.width = 150
  canvas.height = 50

  // Fond avec du bruit
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = `rgba(0,0,0,0.1)`
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      2,
      2
    )
  }

  // Générer le texte
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ' // Caractères sans ambiguïté
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  captchaCode.value = result

  // Dessiner le texte avec des déformations
  ctx.font = 'bold 24px sans-serif'
  ctx.textBaseline = 'middle'
  for (let i = 0; i < result.length; i++) {
    ctx.save()
    ctx.translate(25 + i * 20, 25)
    ctx.rotate((Math.random() - 0.5) * 0.4)
    ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 40%)`
    ctx.fillText(result[i], 0, 0)
    ctx.restore()
  }

  // Ajouter des lignes aléatoires
  for (let i = 0; i < 4; i++) {
    ctx.beginPath()
    ctx.strokeStyle = `rgba(0,0,0,0.2)`
    ctx.lineWidth = 1
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.stroke()
  }

  return canvas.toDataURL()
}

const refreshCaptcha = () => {
  captchaImage.value = generateCaptcha()
}

refreshCaptcha()

const rules = {
  username: { required, email: emailValidator },
  password: { required, minLength: minLength(6) },
  confirmPassword: { required, sameAsPassword: sameAs(computed(() => formData.value.password)) },
  captcha: {
    required,
    matchesCaptcha: (value: string) => value === captchaCode.value
  }
}

const v$ = useVuelidate(rules, formData)

const handleRegister = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  if (formData.value.captcha !== captchaCode.value) {
    captchaError.value = 'Invalid CAPTCHA code'
    refreshCaptcha()
    formData.value.captcha = ''
    return
  }

  try {
    await authStore.register(
        formData.value.username,
        formData.value.password
    )
    router.push('/home')
  } catch (error) {
    console.error('Registration failed:', error)
    refreshCaptcha()
    formData.value.captcha = ''
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-box">
      <h1>Create your account</h1>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="email">Email</label>
          <input
              id="email"
              type="email"
              v-model="formData.username"
              :class="{ 'error': v$.username.$error }"
              placeholder="Enter your email"
          />
          <div class="error-message" v-if="v$.username.$error">
            <span v-if="v$.username.required.$invalid">Email is required</span>
            <span v-else-if="v$.username.username.$invalid">Please enter a valid email</span>
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
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input
              id="confirm-password"
              type="password"
              v-model="formData.confirmPassword"
              :class="{ 'error': v$.confirmPassword.$error }"
              placeholder="Confirm your password"
          />
          <div class="error-message" v-if="v$.confirmPassword.$error">
            <span v-if="v$.confirmPassword.required.$invalid">Please confirm your password</span>
            <span v-else-if="v$.confirmPassword.sameAsPassword.$invalid">Passwords must match</span>
          </div>
        </div>
        <div class="form-group captcha-group">
          <label for="captcha">CAPTCHA Verification</label>
          <div class="captcha-container">
            <img :src="captchaImage" class="captcha-code" @click="refreshCaptcha" alt="CAPTCHA" />
            <button type="button" class="refresh-btn" @click="refreshCaptcha">🔄</button>
          </div>
          <input
              id="captcha"
              type="text"
              v-model="formData.captcha"
              :class="{ 'error': v$.captcha.$error || captchaError }"
              placeholder="Enter the code above"
          />
          <div class="error-message" v-if="v$.captcha.$error || captchaError">
            <span v-if="v$.captcha.required.$invalid">CAPTCHA is required</span>
            <span v-else-if="v$.captcha.matchesCaptcha.$invalid || captchaError">Invalid CAPTCHA code</span>
          </div>
        </div>
        <button type="submit" class="btn" :disabled="v$.$invalid">Sign up</button>
      </form>
      <p class="auth-switch">
        Already have an account?
        <router-link to="/login">Log in</router-link>
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
.captcha-group {
  .captcha-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
    align-items: center;
  }

  .captcha-code {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.75rem 1rem;
    border-radius: 4px;
    font-family: monospace;
    font-size: 1.25rem;
    letter-spacing: 3px;
    cursor: pointer;
    user-select: none;
    flex: 1;
  }

  .refresh-btn {
    background: none;
    border: none;
    color: var(--color-text);
    cursor: pointer;
    padding: 0.5rem;
    font-size: 1.25rem;

    &:hover {
      color: var(--color-primary);
    }
  }
}
</style>