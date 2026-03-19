<template>
  <q-item class="sideBar-item" clickable :to="props.route" @click="props.action">
    <div class="sideBar-item__icon">
      <div class="sideBar-item__box" :class="`sideBar-item__box--${props.buttonStyle}`">
        <iconSvg v-if="props.icon" :id="props.icon" />
      </div>
    </div>
    <span class="sideBar-item__label">{{ props.label }}</span>
  </q-item>
</template>

<script setup lang="ts">
  const props = defineProps<{
    buttonStyle: 'project' | 'component' | 'new' | 'nav'
    icon?: string
    label: string
    route?: { name: string }
    action?: () => void
  }>()
</script>

<style lang="scss" scoped>
  .sideBar-item {
    display: flex;
    align-items: center;
    font-size: nth(map-get($font-size, md), 1);
    padding: 0 !important;

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      width: 5em;
      height: auto;
      aspect-ratio: 1;
    }

    &__box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5em;
      height: auto;
      aspect-ratio: 1;
      border-radius: 0.5em;

      &--project {
        background-color: $ff-primary;
      }

      &--component {
        background-color: $ff-tertiary;
      }

      &--new {
        background-color: $ff-grey;
      }
    }

    &__label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
    }
  }
</style>
