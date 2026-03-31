<template>
  <component
    :class="`page-item page-item--${props.buttonStyle}`"
    :is="props.route && !isEditing ? RouterLink : 'button'"
    :to="props.route && !isEditing ? props.route : undefined"
    @click="props.action"
    :style="{ '--sign-size': signSize + 'em' }"
  >
    <div class="page-item__sign">
      <IconSvg v-if="props.icon" class="page-item__icon" :id="props.icon" :size="`${signSize / 2}em`" />
      <strong v-else class="page-item__initials">{{ useInitials(props.label) }}</strong>
    </div>
    <input
      v-if="isEditing"
      ref="inputRef"
      class="page-item__label page-item__label--editing"
      :value="props.label"
      @click.stop
      @keydown.enter="handleConfirm"
      @keydown.esc="handleCancel"
      @blur="handleCancel"
    />
    <span v-else class="page-item__label page-item__label--normal">{{ props.label }}</span>
  </component>
</template>

<script setup lang="ts">
  import { computed, ref, watch, nextTick } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useAppStore } from '@stores/appStore'
  import { useInitials } from '@composables/useInitials'

  const appStore = useAppStore()
  const inputRef = ref<HTMLInputElement | null>(null)
  const isConfirming = ref(false)

  const signSize = 6

  const props = defineProps<{
    buttonStyle: 'project' | 'component' | 'new'
    id?: number
    icon?: string
    label: string
    route?: { name: string; params?: { projectId?: string; componentId?: string } }
    action?: () => void
  }>()

  const emit = defineEmits<{
    confirm: [name: string]
    cancel: []
  }>()

  const isEditing = computed(() => appStore.currentEditingId === props.id)

  const handleConfirm = (e: KeyboardEvent) => {
    const value = (e.target as HTMLInputElement).value.trim()
    if (!value) return
    isConfirming.value = true
    emit('confirm', value)
    appStore.currentEditingId = null
  }

  const handleCancel = () => {
    if (isConfirming.value) return
    emit('cancel')
    appStore.currentEditingId = null
  }

  watch(isEditing, async (value) => {
    if (value) {
      await nextTick()
      inputRef.value?.focus()
    }
  })
</script>

<style lang="scss" scoped>
  .page-item {
    --sign-bg: #{$ff-primary};
    --sign-color: #{$ff-white};
    --label-color: currentColor;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;

    &__initials {
      @include fontMixin(map-get($font-size, xl));
    }

    &__sign {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: var(--sign-size);
      height: auto;
      aspect-ratio: 1 / 1;
      border-radius: 1em;
      color: var(--sign-color);
      background-color: var(--sign-bg);
    }

    &__label {
      width: var(--sign-size);
      text-align: center;

      &--editing {
        color: var(--label-color);
        background-color: transparent;
      }

      &--normal {
        @include fontMixin(map-get($font-size, md));
        color: var(--label-color);
      }
    }

    &--component {
      --sign-bg: #{$ff-tertiary};
      --sign-color: #{$ff-black};
      --label-color: #{$ff-white};
    }

    &--new {
      --sign-bg: #{$ff-quaternary};
      --sign-color: #{$ff-grey};
      --label-color: #{$ff-grey};
    }
  }
</style>
