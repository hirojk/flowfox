<template>
  <component
    :is="props.route ? RouterLink : 'button'"
    :class="`page-item page-item--${props.buttonStyle}`"
    :to="props.route ? props.route : undefined"
    @click="props.action"
  >
    <div class="page-item__sign">
      <IconSvg v-if="props.icon" :id="props.icon" class="page-item__icon" size="5em" />
      <strong v-else class="page-item__initials" aria-hidden="true">{{ useInitials(props.label) }}</strong>
    </div>
    <div class="page-item__content">
      <TextEditor
        class="page-item__label page-item__label--editing"
        mode="editOnce"
        htmlTag="span"
        :text="props.label"
        :saveEvent="(newTaskName) => handleConfirm(newTaskName)"
        :cancelEvent="handleCancel"
      />
    </div>
  </component>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { useInitials } from '@composables/useDisplay'
  import { useAppStore } from '@stores/appStore'

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

    > * {
      @include simpleAnimation;
    }

    &__initials {
      @include fontMixin($font-size-xl);

      font-weight: normal;
    }

    &__sign {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      width: 5em;
      aspect-ratio: 1;
      padding: 1em;
      background-color: $pw-secondary;
      color: $pw-white;
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
