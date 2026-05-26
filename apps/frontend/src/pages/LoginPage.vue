<template>
  <main class="page--login">
    <section class="login-form">
      <h1 class="login-form__title">Pagewise</h1>
      <p ref="errorRef" class="login-form__error" role="alert" aria-live="polite" aria-atomic="true" tabindex="-1">
        {{ errorMessage }}
      </p>
      <form class="login-form__form" @submit.prevent="handleLogin">
        <InputUI id="login-username" label="Username" type="text" required />
        <InputUI id="login-password" label="Password" type="password" required />
        <ButtonUI class="login-form__form-button" type="submit" variant="primary" label="Login" />
      </form>
    </section>
    <ButtonUI
      class="login-form__background-button"
      variant="secondary"
      size="small"
      label="Change Background"
      @click="loadBackgroundImage"
    />
    <img ref="backgroundImage" class="login-form__background" />
  </main>
</template>

<script setup lang="ts">
  import { ref, nextTick, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@stores/authStore'
  import InputUI from '@components/ui/InputUI.vue'

  const authStore = useAuthStore()
  const router = useRouter()
  const errorRef = ref<HTMLParagraphElement | null>(null)
  const errorMessage = ref('')
  const backgroundImage = ref<HTMLImageElement | null>(null)

  const backgroundImages = [
    {
      title: 'Monet - Water Lilies',
      imageSource: '/assets/images/background_monet_waterlilies.webp',
      altText: "Background image of Monet's Water Lilies painting",
    },
    {
      title: 'Vincent van Gogh - The Starry Night',
      imageSource: '/assets/images/background_vangogh_starrynight.webp',
      altText: "Background image of Vincent van Gogh's The Starry Night painting",
    },
  ]

  const handleLogin = async () => {
    const usernameInput = document.getElementById('login-username') as HTMLInputElement
    const passwordInput = document.getElementById('login-password') as HTMLInputElement

    try {
      await authStore.login(usernameInput.value, passwordInput.value)
      router.push('/')
    } catch {
      errorMessage.value = 'Invalid username or password'
      await nextTick()
      errorRef.value?.focus()
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
      @include boxShadowMixin;

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1em;
      width: 100%;
      max-width: 35em;
      outline: 5px solid $pw-black;
      outline-offset: -1em;
      border: 5px solid $pw-black;
      border-radius: 2em;
      padding: 3em 5em;
      background-color: $pw-background;

      &__title {
        color: $pw-black;
        font-size: 2.5rem;
        font-family: $font-family-primary;
        text-align: center;
        text-transform: uppercase;
      }

      &__error {
        color: $pw-error;
      }

      &__form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;
        width: 100%;

        &-button {
          width: 10em;
          margin-top: 2.5em;
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
