<template>
  <component
    :is="props.route ? RouterLink : 'button'"
    :class="`page-item`"
    :to="props.route ? props.route : undefined"
    :style="{
      '--label-headline-color': labelHeadlineColor,
      '--label-subline-color': labelSublineColor,
      '--background-color': backgroundColor,
    }"
    @click="props.action"
  >
    <InitialUI
      class="page-item__initial"
      :icon="props.icon"
      :label="props.label"
      variant="secondary"
      :usage="props.buttonStyle"
      :theme="props.theme"
      :size="3"
    />
    <div class="page-item__content">
      <InputFieldUI
        class="page-item__text page-item__text--headline"
        mode="editOnce"
        inputStyle="minimal"
        htmlTag="span"
        :text="props.label"
        :saveEvent="(newTaskName) => handleConfirm(newTaskName)"
        :cancelEvent="handleCancel"
      />
      <span v-if="props.componentStyle && props.label" class="page-item__text page-item__text--subline">{{
        props.componentStyle
      }}</span>
    </div>
  </component>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { tokens } from '@utils/tokenBuilder'
  import { RouterLink } from 'vue-router'
  import { useAppStore } from '@stores/appStore'

  import InputFieldUI from '@components/ui/InputFieldUI.vue'

  const appStore = useAppStore()

  const props = defineProps<{
    buttonStyle: 'project' | 'page'
    componentStyle?: 'board' | 'flow' | 'doc'
    theme: 'orange'
    icon?: string
    label: string
    route?: { name: string; params?: { projectId?: string; componentId?: string } }
    action?: () => void
  }>()

  const emit = defineEmits<{
    confirm: [name: string]
    cancel: []
  }>()

  const labelHeadlineColor = computed(() => tokens[`color-theme-${props.buttonStyle}-${props.theme}-color-primary`])
  const labelSublineColor = computed(() => tokens[`color-theme-${props.buttonStyle}-${props.theme}-color-secondary`])
  const backgroundColor = computed(() => tokens[`color-theme-${props.buttonStyle}-${props.theme}-background-primary`])

  const handleConfirm = (value: string) => {
    if (!value) emit('cancel')
    else emit('confirm', value)

    appStore.currentEditingId = null
  }

  const handleCancel = () => {
    emit('cancel')
    appStore.currentEditingId = null
  }
</script>

<style lang="scss" scoped>
  .page-item {
    display: flex;
    align-items: center;
    background-color: var(--background-color);

    &__initial {
      border-radius: 0;
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.1em;
      width: 100%;
      margin: 0 1em;
      color: var(--label-headline-color);
      font-family: $font-family-secondary;
    }

    &__text {
      &--headline {
        color: var(--label-headline-color);
      }

      &--subline {
        @include fontButtonSmall;

        padding: 0.25em;
        color: var(--label-subline-color);
        opacity: 0.8;
      }
    }

    // @media (hover: hover) and (pointer: fine) {
    //   &:hover,
    //   &:active {
    //     .page-item {
    //       &__sign {
    //         background-color: var(--hover-bg);
    //         color: var(--hover-color);
    //       }
    //     }
    //   }
    // }
  }
</style>
