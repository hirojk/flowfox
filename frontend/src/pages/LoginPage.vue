<template>
  <main class="page--login">
    <section class="login-form">
      <h1 class="login-form__title">Flowfox</h1>
      <p v-if="errorMessage" class="login-form__error">{{ errorMessage }}</p>
      <form class="login-form__form" @submit.prevent="handleLogin">
        <div class="login-form__form-group">
          <label class="login-form__form-label" for="login-username">Username</label>
          <input id="login-username" v-model="username" class="login-form__form-input" type="text" required />
        </div>
        <div class="login-form__form-group">
          <label class="login-form__form-label" for="login-password">Password</label>
          <input id="login-password" v-model="password" class="login-form__form-input" type="password" required />
        </div>
        <button class="login-form__form-button button button--primary" type="submit">Login</button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@stores/authStore'

  const authStore = useAuthStore()
  const router = useRouter()
  const username = ref('')
  const password = ref('')
  const errorMessage = ref('')

  const handleLogin = async () => {
    try {
      await authStore.login(username.value, password.value)
      router.push('/')
    } catch {
      errorMessage.value = 'Invalid username or password'
    }
  }
</script>

<style lang="scss" scoped>
  .page--login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    background-color: $ff-secondary;

    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2em;
      width: 100%;
      max-width: 25em;
      border-radius: 1em;
      padding: 2em;
      background-color: $ff-white;

      &__title {
        color: $ff-primary;
        text-align: center;
      }

      &__error {
        color: $ff-error;
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
          border: 1px solid $ff-grey;
          border-radius: 0.5em;
          padding: 0.5em;
        }

        &-button {
          margin-top: 2em;
          padding: 0.75em;
        }
      }
    }
  }
</style>
