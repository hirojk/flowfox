<template>
  <svg :width="size" :height="size" aria-hidden="true">
    <use :href="`src/assets/icon.svg#${id}`"></use>
  </svg>
</template>

<script setup lang="ts">
  const { id, size = 24 } = defineProps<{
    id: string;
    size?: number;
  }>();
</script>
