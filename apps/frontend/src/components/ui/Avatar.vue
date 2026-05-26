<template>
  <button class="avatar" aria-haspopup="menu">
    <img ref="avatarImage" class="avatar__image" />
    <slot />
  </button>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  defineProps<{
    src?: string
    alt?: string
  }>()

  const avatarImage = ref<HTMLImageElement | null>(null)

  const loadAvatarImage = () => {
    if (avatarImage.value) {
      avatarImage.value.src = '/assets/images/avatar_placeholder.webp'
      avatarImage.value.alt = 'Placeholder picture of Jan'
    }
  }

  onMounted(() => {
    loadAvatarImage()
  })
</script>

<style lang="scss" scoped>
  .avatar {
    display: flex;
    width: 3.125em;
    height: 3.125em;
    border-radius: 50%;
    box-shadow:
      0 0 0 2px $pw-white,
      0 0 0 4px $pw-primary;
    overflow: hidden;

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
