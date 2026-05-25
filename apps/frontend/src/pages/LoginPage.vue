<template>
  <main class="page--login">
    <section class="login-form">
      <h1 class="login-form__title">Pagewise</h1>
      <p v-if="errorMessage" class="login-form__error">{{ errorMessage }}</p>
      <form class="login-form__form" @submit.prevent="handleLogin">
        <div class="login-form__form-group">
          <label class="login-form__form-label inputField__label" for="login-username">Username</label>
          <input
            id="login-username"
            v-model="username"
            class="login-form__form-input inputField__field"
            type="text"
            required
          />
        </div>
        <div class="login-form__form-group">
          <label class="login-form__form-label inputField__label" for="login-password">Password</label>
          <input
            id="login-password"
            v-model="password"
            class="login-form__form-input inputField__field"
            type="password"
            required
          />
        </div>
        <ButtonUI class="login-form__form-button" type="submit" variant="primary" label="Login" />
      </form>
    </section>
    <ButtonUI
      class="login-form__background-button"
      variant="secondary"
      label="Change Background"
      @click="loadBackgroundImage"
    />
    <img ref="backgroundImage" class="login-form__background" />
  </main>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@stores/authStore'

  const authStore = useAuthStore()
  const router = useRouter()
  const backgroundImage = ref<HTMLImageElement | null>(null)
  const username = ref('')
  const password = ref('')
  const errorMessage = ref('')

  const backgroundImages = [
    {
      title: 'Monet - Water Lilies',
      imageSource: '/assets/images/background_monet_waterlilies.webp',
      altText: "Background image of Monet's Water Lilies painting",
    },
  ]

  const handleLogin = async () => {
    try {
      await authStore.login(username.value, password.value)
      router.push('/')
    } catch {
      errorMessage.value = 'Invalid username or password'
    }
  }

  const loadBackgroundImage = () => {
    if (backgroundImage.value) {
      let randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)]

      backgroundImage.value.src = randomImage!.imageSource
      backgroundImage.value.alt = randomImage!.altText
    }
  }

  onMounted(() => {
    loadBackgroundImage()
  })
</script>

<style lang="scss" scoped>
  .page--login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    background-color: transparent;

    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2em;
      width: 100%;
      max-width: 35em;
      outline: 5px solid $ff-black;
      outline-offset: -1em;
      border: 5px solid $ff-black;
      border-radius: 2em;
      padding: 3em 5em;
      background-color: $ff-white;
      box-shadow: 0 0 2em rgba($ff-black, 0.5);

      &__title {
        @include fontMixin(map.get($font-size, 2xl));

        color: $ff-black;
        font-weight: bold;
        font-family: $font-family-primary;
        text-align: center;
        text-transform: uppercase;
      }

      &__error {
        color: $ff-error;
      }

      &__form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;
        width: 100%;

        &-group {
          display: flex;
          flex-direction: column;
          gap: 0.5em;
          width: 100%;
        }

        &-input {
          border-bottom-color: $ff-black;
        }

        &-button {
          width: 12em;
          margin-top: 2.5em;
          padding: 0.75em;
        }
      }

      &__background {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;

        &-button {
          position: absolute;
          right: $page-padding-x;
          bottom: $page-padding-y;
        }
      }
    }
  }
</style>
