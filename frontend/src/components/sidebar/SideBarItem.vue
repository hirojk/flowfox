<template>
  <q-item :class="`sideBar-item sideBar-item--${props.buttonStyle}`" clickable :to="props.route" @click="handleClick">
    <div class="sideBar-item__icon">
      <div class="sideBar-item__box" :class="`sideBar-item__box--${props.buttonStyle}`">
        <span v-if="props.buttonStyle === 'project'" class="sideBar-item__box--project">
          {{ useInitials(props.label) }}
        </span>
        <iconSvg v-if="props.icon" :id="props.icon" size="36" />
      </div>
    </div>
    <span class="sideBar-item__label">{{ props.label }}</span>
  </q-item>
</template>

<script setup lang="ts">
  import { useInitials } from '@composables/useDisplay'
  import { useAppStore } from '@stores/appStore'

  const appStore = useAppStore()

  const props = defineProps<{
    buttonStyle: 'project' | 'component' | 'new' | 'nav'
    icon?: string
    label: string
    route?: { name: string; params?: { projectId?: string; componentId?: string } }
    action?: () => void
  }>()

  const handleClick = () => {
    props.action?.()
    if (props.route) appStore.isSidebarOpen = false
  }
</script>

<style lang="scss" scoped>
  .sideBar-item {
    --box-bg: transparent;
    --box-color: #{$ff-black};

    &--project {
      --box-bg: #{$ff-primary};
      --box-color: #{$ff-white};
    }

    &--component {
      --box-bg: #{$ff-tertiary};
      --box-color: #{$ff-black};
    }

    &--new {
      --box-bg: #{$ff-quaternary};
      --box-color: #{$ff-grey};
    }

    display: flex;
    align-items: center;
    font-size: nth(map-get($font-size, md), 1);
    padding: 0 !important;
    color: $ff-black;

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      width: var(--sidebar-mini-width);
      height: auto;
      aspect-ratio: 1 / 0.7;
    }

    &__box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(var(--sidebar-mini-width) - var(--sidebar-padding));
      height: auto;
      aspect-ratio: 1;
      border-radius: 0.5em;
      color: var(--box-color);
      background-color: var(--box-bg);
    }

    &__label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
    }

    :deep(.q-focus-helper) {
      display: none;
    }
  }
</style>
