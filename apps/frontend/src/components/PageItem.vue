<template>
  <component
    :is="props.route ? RouterLink : 'button'"
    :class="`page-item page-item--${props.buttonStyle}`"
    :to="props.route ? props.route : undefined"
    @click="props.action"
  >
    <InitialUI class="page-item__initial" :size="+5" :label="props.label" :backgroundColor="colors['pw-secondary']" />
    <div class="page-item__content">
      <TextEditor
        class="page-item__label page-item__label--editing"
        mode="editOnce"
        htmlTag="span"
        removeDefaultStyle
        :text="props.label"
        :saveEvent="(newTaskName) => handleConfirm(newTaskName)"
        :cancelEvent="handleCancel"
      />
    </div>
  </component>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { useAppStore } from '@stores/appStore'
  import colors from '@styles/colors.json'

  import InitialUI from '@components/ui/InitialUI.vue'
  import TextEditor from '@components/ui/TextEditor.vue'

  const appStore = useAppStore()

  const props = defineProps<{
    buttonStyle: 'project' | 'component'
    themeColor: string
    icon?: string
    label: string
    route?: { name: string; params?: { projectId?: string; componentId?: string } }
    action?: () => void
  }>()

  const emit = defineEmits<{
    confirm: [name: string]
    cancel: []
  }>()

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
    background-color: $pw-primary;

    &__initial {
      border-radius: 0;
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      margin: 0 1em;
    }

    &__label {
      @include fontButton;

      color: $pw-white;

      &--editing {
        background-color: transparent;
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
