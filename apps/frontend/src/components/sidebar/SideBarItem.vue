<template>
  <q-item :class="`sideBar-item sideBar-item--${props.buttonStyle}`" clickable :to="props.route" @click="handleClick">
    <div class="sideBar-item__icon">
      <InitialUI :size="+5" :icon="props.icon" :label="props.headline" color="var(--theme-headline-color)" />
    </div>
    <div class="sideBar-item__content">
      <span class="sideBar-item__headline">{{ props.headline }}</span>
      <span v-if="props.subline" class="sideBar-item__subline">{{ props.subline }}</span>
    </div>
    <div class="sideBar-item__background" :style="`height: ${props.index ? (props.index + 1) * 100 : 100}%`"></div>
  </q-item>
</template>

<script setup lang="ts">
  import { useAppStore } from '@stores/appStore'

  import InitialUI from '@components/ui/InitialUI.vue'

  const appStore = useAppStore()

  const props = defineProps<{
    buttonStyle: 'project' | 'component' | 'new' | 'neutral'
    index?: number
    icon?: string
    headline: string
    subline?: string
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
    @include themeMixin;
    @include focusVisible;

    &--component {
      .sideBar-item__background {
        border-radius: 0 0 0 1.5em;
      }

      &:last-child .sideBar-item__background {
        box-shadow: 0 0.5em 2em 0.5em color-mix(in srgb, $pw-black 20%, transparent);
      }
    }

    &--neutral {
      .sideBar-item__headline {
        @include underlineMixin;
      }
    }

    display: flex;
    align-items: center;
    padding: 0 !important;
    color: var(--theme-headline-color);

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

    &__content {
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      gap: 0.5em;
      min-height: 3em;
      overflow: hidden;
      user-select: none;
    }

    &__headline {
      @include fontButton;

      position: relative;
      width: fit-content;
      white-space: nowrap;
    }

    &__subline {
      @include fontButtonSmall;

      color: var(--theme-subline-color);
      white-space: nowrap;
    }

    &__background {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: var(--theme-background-primary);
      box-shadow: 0 0.5em 2em 0.5em color-mix(in srgb, var(--theme-shadow) 20%, transparent);
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
