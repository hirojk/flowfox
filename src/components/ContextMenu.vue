<template>
  <button class="context-menu">
    <IconSvg id="icon-menu" />
    <q-menu>
      <q-list v-for="event in props.events" :key="event.name">
        <q-item clickable v-close-popup @click="event.action">
          <q-item-section>{{ event.name }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </button>
</template>

<script setup lang="ts">
  interface eventsType {
    name: string;
    action: () => void;
  }

  const props = defineProps<{
    events: eventsType[];
  }>();
</script>

<style lang="scss" scoped>
  .context-menu {
    color: black;
  }
</style>
