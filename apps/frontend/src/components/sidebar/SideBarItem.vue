<template>
  <q-item :class="`sideBar-item sideBar-item--${props.buttonStyle}`" clickable :to="props.route" @click="handleClick">
    <div class="sideBar-item__icon">
      <InitialUI :size="+3" :icon="props.icon" :label="props.label" color="var(--item-color)" />
    </div>
    <span class="sideBar-item__label">{{ props.label }}</span>
    <div class="sideBar-item__background" :style="`height: ${props.index ? (props.index + 1) * 100 : 100}%`"></div>
  </q-item>
</template>

<script setup lang="ts">
  import { useAppStore } from '@stores/appStore'

  import InitialUI from '@components/ui/InitialUI.vue'

  const appStore = useAppStore()

  const props = defineProps<{
    buttonStyle: 'project' | 'component' | 'new' | 'nav'
    index?: number
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
      --item-background: #{$pw-quatenary};
      --item-color: #{$pw-black};
      --item-shadow: #{$pw-secondary};

      .sideBar-item__background {
        border-radius: 0 0 0 1.5em;
      }

      &:last-child .sideBar-item__background {
        box-shadow: 0 0.5em 2em 0.5em color-mix(in srgb, $pw-black 20%, transparent);
      }
    }

    &--nav {
      --item-background: #{$pw-background};
      --item-color: #{$pw-black};
      --item-shadow: #{$pw-black};
    }

    @include focusVisible;

    display: flex;
    align-items: center;
    padding: 0 !important;
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

    &__background {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: var(--item-background);
      box-shadow: 0 0.5em 2em 0.5em color-mix(in srgb, var(--item-shadow) 20%, transparent);
      z-index: -1;
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
