<template>
  <div class="page page--login">
    <div class="login-form">
      <h1 class="login-form__title">Flowfox</h1>
      <form class="login-form__form" @submit.prevent="handleLogin">
        <div class="login-form__form-group">
          <label class="login-form__form-label" for="login-username">Username</label>
          <input class="login-form__form-input" type="text" id="login-username" v-model="username" required />
        </div>
        <div class="login-form__form-group">
          <label class="login-form__form-label" for="login-password">Password</label>
          <input class="login-form__form-input" type="password" id="login-password" v-model="password" required />
        </div>
        <button class="login-form__form-button" type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@stores/authStore'

  const authStore = useAuthStore()
  const router = useRouter()
  const username = ref('')
  const password = ref('')

  const handleLogin = async () => {
    try {
      await authStore.login(username.value, password.value)
      router.push('/')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }
</script>

<style lang="scss" scoped>
  .page--login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;

    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5em;
      width: 100%;
      max-width: 25em;
      border-radius: 1em;
      padding: 2em;
      background-color: $ff-white;

      &_title {
        text-align: center;
      }

      &__form {
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 100%;

        &-group {
          display: flex;
          flex-direction: column;
          gap: 0.5em;
        }

        &-input {
          padding: 0.5em;
          border: 1px solid $ff-grey;
          border-radius: 0.5em;
        }

        &-button {
          margin-top: 2em;
          border-radius: 0.5em;
          padding: 0.75em;
          text-align: center;
          color: $ff-white;
          background-color: $ff-primary;

          &:hover {
            background-color: $ff-grey;
          }
        }
      }
    }
  }
</style>
