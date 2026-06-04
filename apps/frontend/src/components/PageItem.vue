<template>
  <component
    :is="props.route ? RouterLink : 'button'"
    :class="`page-item page-item--${props.buttonStyle}`"
    :to="props.route ? props.route : undefined"
    @click="props.action"
  >
    <InitialUI
      class="page-item__initial"
      :size="3"
      :icon="props.icon"
      :label="props.label"
      color="var(--theme-headline-color)"
    />
    <div class="page-item__content">
      <InputFieldUI
        inputStyle="minimal"
        mode="editOnce"
        htmlTag="span"
        :text="props.label"
        :saveEvent="(newTaskName) => handleConfirm(newTaskName)"
        :cancelEvent="handleCancel"
      />
      <span v-if="props.componentStyle" class="page-item__subline">{{ props.componentStyle }}</span>
    </div>
  </component>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { useAppStore } from '@stores/appStore'

  import InputFieldUI from '@components/ui/InputFieldUI.vue'

  const appStore = useAppStore()

  const props = defineProps<{
    buttonStyle: 'project' | 'component'
    componentStyle?: 'board' | 'flow' | 'doc'
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
    @include themeMixin;

    display: flex;
    align-items: center;
    background-color: var(--theme-background-primary);

    &__initial {
      border-radius: 0;
      background-color: var(--theme-background-secondary);
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.25em;
      width: 100%;
      margin: 0 1em;
      color: var(--theme-headline-color);
      font-family: $font-family-secondary;
    }

    &__subline {
      @include fontButtonSmall;

      color: var(--theme-subline-color);
      opacity: 0.8;
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
