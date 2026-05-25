<template>
  <div class="inputField">
    <label class="inputField__label" :for="props.id">{{ props.label }}</label>
    <input :id="props.id" class="inputField__field" :type="props.type" :required="props.required" />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    id: string
    label: string
    type: 'text' | 'password' | 'email'
    required?: boolean
  }>()
</script>

<style lang="scss" scoped>
  .inputField {
    &__field {
      border-bottom-color: $pw-black;
    }
  }
</style>
