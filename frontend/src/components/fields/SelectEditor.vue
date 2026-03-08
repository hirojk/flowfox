<template>
  <button class="selectEditor">
    <IconSvg v-if="props.icon" :id="props.icon" />
    {{ props.selected }}
    <q-menu>
      <q-list v-for="option in props.options" :key="option">
        <q-item clickable v-close-popup @click="props.saveEvent(option)">
          <q-item-section>{{ option }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </button>
</template>

<script setup lang="ts">
  const props = defineProps<{
    options: string[]
    icon?: string
    selected: string
    saveEvent: (newOption: string) => void
  }>()
</script>

<style lang="scss" scoped>
  .selectEditor {
    display: flex;
    align-items: flex-end;
    gap: 0.5em;
  }
</style>
