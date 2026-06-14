<template>
  <q-item
    :class="`sideBar-item sideBar-item--${props.buttonStyle}`"
    clickable
    :to="props.route"
    :style="{
      '--headline-color': headlineColor,
      '--subline-color': sublineColor,
      '--background-color': backgroundGradient,
      '--shadow-color': shadowColor,
    }"
    @click="handleClick"
  >
    <div class="sideBar-item__icon">
      <InitialUI
        :icon="props.icon"
        :label="props.headline"
        variant="transparent"
        :usage="props.buttonStyle"
        :theme="props.theme"
        :size="3"
      />
    </div>
    <div class="sideBar-item__content">
      <span class="sideBar-item__text sideBar-item__text--headline">{{ props.headline }}</span>
      <span v-if="props.subline" class="sideBar-item__text sideBar-item__text--subline">{{ props.subline }}</span>
    </div>
    <div class="sideBar-item__background" :style="`height: ${props.index ? (props.index + 1) * 100 : 100}%`"></div>
  </q-item>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  import InitialUI from '@components/ui/InitialUI.vue'
  import { useAppStore } from '@stores/appStore'
  import { useProjectStore } from '@stores/projectStore'
  import { tokens } from '@utils/tokenBuilder'

  const appStore = useAppStore()
  const projectStore = useProjectStore()

  const props = defineProps<{
    buttonStyle: 'project' | 'page' | 'neutral'
    theme: 'orange'
    index?: number
    icon?: string
    headline: string
    subline?: string
    route?: { name: string; params?: { projectId?: string; componentId?: string } }
    action?: () => void
  }>()

  const headlineColor = computed(() => tokens[`color-theme-${props.buttonStyle}-${props.theme}-color-primary`])
  const sublineColor = computed(() => tokens[`color-theme-${props.buttonStyle}-${props.theme}-color-secondary`])
  const backgroundGradient = computed(() => {
    if (props.buttonStyle === 'neutral') return tokens[`color-semantic-background`]
    const primary = tokens[`color-theme-${props.buttonStyle}-${props.theme}-background-primary`]
    const secondary = tokens[`color-theme-${props.buttonStyle}-${props.theme}-background-secondary`]
    return `linear-gradient(90deg, ${primary}, ${secondary})`
  })
  const shadowColor = computed(() => {
    const isLastPage =
      props.buttonStyle === 'page' && props.index === (projectStore.activeProject?.components?.length ?? 0) - 1
    const isGray =
      props.buttonStyle === 'neutral' ||
      (props.buttonStyle === 'project' && (projectStore.activeProject?.components?.length ?? 0) === 0) ||
      isLastPage
    return isGray ? tokens[`color-primitive-gray-13`] : tokens[`color-theme-${props.buttonStyle}-${props.theme}-shadow`]
  })

  const handleClick = () => {
    props.action?.()
    if (props.route) appStore.isSidebarOpen = false
  }
</script>

<style lang="scss" scoped>
  .sideBar-item {
    @include focusVisible;

    &--page {
      .sideBar-item__background {
        border-radius: 0 0 0 1.5em;
      }
    }

    &--neutral {
      .sideBar-item__text--headline {
        @include underlineMixin;
      }
    }

    display: flex;
    align-items: center;
    padding: 0 !important;
    color: var(--headline-color);
    z-index: 100;

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

    &__text {
      white-space: nowrap;

      &--headline {
        @include fontButton;

        width: fit-content;
        color: var(--headline-color);
      }

      &--subline {
        @include fontButtonSmall;

        color: var(--subline-color);
      }
    }

    &__background {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: var(--background-color);
      box-shadow: 0 0.5em 2em 0.25em color-mix(in srgb, var(--shadow-color) 30%, transparent);
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
