<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="login-username">Username:</label>
        <input type="text" id="login-username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="login-password">Password:</label>
        <input type="password" id="login-password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
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
      console.log('Login failed:', error)
    }
  }
</script>

<style lang="scss" scoped>
  .login-form {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    border-radius: 5px;
    background-color: $white;

    h2 {
      text-align: center;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 15px;

      label {
        display: block;
        margin-bottom: 5px;
      }

      input {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
      }
    }

    button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
</style>
