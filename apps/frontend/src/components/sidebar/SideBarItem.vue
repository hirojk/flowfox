<template>
  <q-item :class="`sideBar-item sideBar-item--${props.buttonStyle}`" clickable :to="props.route" @click="handleClick">
    <div class="sideBar-item__icon">
      <div class="sideBar-item__box" :class="`sideBar-item__box--${props.buttonStyle}`">
        <span v-if="props.buttonStyle === 'project'" class="sideBar-item__box--project" aria-hidden="true">
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
    &--project {
      --box-bg: #{$pw-primary};
      --box-color: #{$pw-white};
      --hover-bg: #{$ff-secondary};
      --hover-color: #{$pw-white};
    }

    &--component {
      --box-bg: #{$ff-tertiary};
      --box-color: #{$pw-black};
      --hover-bg: #{rgba($pw-primary, 0.5)};
      --hover-color: #{$pw-black};
    }

    &--new {
      --box-bg: #{$ff-quaternary};
      --box-color: #{$ff-grey};
      --hover-bg: #{$ff-grey};
      --hover-color: #{$pw-white};
    }

    &--nav {
      --box-bg: transparent;
      --box-color: #{$pw-black};
      --hover-bg: #{$ff-quaternary};
      --hover-color: #{$pw-black};
    }

    display: flex;
    align-items: center;
    padding: 0 !important;
    color: $pw-black;

    @include focusVisible;

    &__icon {
      display: flex;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      width: var(--sidebar-mini-width);
      height: auto;
      aspect-ratio: 1 / 0.7;
    }

    &__box {
      @include simpleAnimation;

      display: flex;
      justify-content: center;
      align-items: center;
      width: calc(var(--sidebar-mini-width) - var(--sidebar-padding));
      height: auto;
      aspect-ratio: 1;
      border-radius: 0.5em;
      background-color: var(--box-bg);
      color: var(--box-color);
    }

    &__label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
    }

    :deep(.q-focus-helper) {
      display: none;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        .sideBar-item {
          &__box {
            background-color: var(--hover-bg);
            color: var(--hover-color);
          }
        }
      }
    }
  }
</style>
