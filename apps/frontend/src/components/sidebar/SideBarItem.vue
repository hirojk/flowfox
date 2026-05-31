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
      --item-background: #{$pw-primary};
      --item-color: #{$pw-white};
      --item-shadow: #{$pw-secondary};
    }

    &--component {
      --item-background: #{$ff-tertiary};
      --item-color: #{$pw-black};
      --item-shadow: #{$pw-black};
    }

    &--new {
      --item-background: #{$ff-quaternary};
      --item-color: #{$ff-grey};
      --item-shadow: #{$pw-black};
    }

    &--nav {
      --item-background: #{$pw-background};
      --item-color: #{$pw-black};
      --item-shadow: #{$pw-black};
    }

    display: flex;
    align-items: center;
    padding: 0 !important;
    background-color: var(--item-background);
    box-shadow:
      0 0.5em 1em color-mix(in srgb, var(--item-shadow) 15%, transparent),
      inset -0.5em 0 2em color-mix(in srgb, var(--item-shadow) 15%, transparent);
    color: var(--item-color);

    &:first-child {
      margin-top: 0;
      z-index: 100;
    }

    @for $i from 1 through 20 {
      &:nth-child(#{$i}) {
        z-index: #{100 - $i};
      }
    }

    @include focusVisible;

    &__icon {
      display: flex;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      width: var(--sidebar-mini-width);
      aspect-ratio: 1;
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
    }

    &__label {
      @include fontButton;

      position: relative;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      user-select: none;

      &::after {
        content: '';
        position: absolute;
        bottom: -0.2em;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: $pw-primary;
      }
    }

    :deep(.q-focus-helper) {
      display: none;
    }

    // @media (hover: hover) and (pointer: fine) {
    //   &:hover {
    //     .sideBar-item {
    //       &__box {
    //         background-color: var(--hover-bg);
    //         color: var(--hover-color);
    //       }
    //     }
    //   }
    // }
  }
</style>
