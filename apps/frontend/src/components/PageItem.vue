<template>
  <component
    :is="props.route ? RouterLink : 'button'"
    :class="`page-item page-item--${props.buttonStyle}`"
    :to="props.route ? props.route : undefined"
    :style="{ '--sign-size': signSize + 'em' }"
    @click="props.action"
  >
    <div class="page-item__sign">
      <IconSvg v-if="props.icon" :id="props.icon" class="page-item__icon" :size="`${signSize / 2}em`" />
      <strong v-else class="page-item__initials" aria-hidden="true">{{ useInitials(props.label) }}</strong>
    </div>
    <div class="page-item__content">
      <TextEditor
        class="page-item__label page-item__label--editing"
        editMode
        singleEdit
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

  const signSize = 3

  const props = defineProps<{
    buttonStyle: 'project' | 'component'
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
    &--project {
      --sign-bg: #{$pw-primary};
      --sign-color: #{$pw-white};
      --label-color: #{$pw-white};
      --hover-bg: #{$ff-secondary};
      --hover-color: #{$pw-white};
    }

    &--component {
      --sign-bg: #{rgba($pw-primary, 0.4)};
      --sign-color: #{$pw-black};
      --label-color: #{$pw-black};
      --hover-bg: #{rgba($pw-primary, 0.75)};
      --hover-color: #{$pw-black};
    }

    display: flex;
    align-items: center;
    gap: 1em;
    padding: 1em;
    background-color: var(--sign-bg);

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
      justify-content: center;
      align-items: center;
      width: var(--sign-size);
      height: auto;
      aspect-ratio: 1;
      border-radius: 1em;
      color: var(--sign-color);
    }

    &__label {
      @include fontButton;

      &--editing {
        background-color: transparent;
        color: var(--label-color);
      }

      &--normal {
        color: var(--label-color);
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
