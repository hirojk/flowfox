<template>
  <component
    :is="props.route && !isEditing ? RouterLink : 'button'"
    :class="`page-item page-item--${props.buttonStyle}`"
    :to="props.route && !isEditing ? props.route : undefined"
    :style="{ '--sign-size': signSize + 'em' }"
    @click="props.action"
  >
    <div class="page-item__sign">
      <IconSvg v-if="props.icon" :id="props.icon" class="page-item__icon" :size="`${signSize / 2}em`" />
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
  import { useInitials } from '@composables/useDisplay'
  import { useAppStore } from '@stores/appStore'

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
    --label-color: currentcolor;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;

    &__initials {
      @include fontMixin(map.get($font-size, xl));
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
      background-color: var(--sign-bg);
      color: var(--sign-color);
    }

    &__label {
      width: var(--sign-size);
      text-align: center;

      &--editing {
        background-color: transparent;
        color: var(--label-color);
      }

      &--normal {
        @include fontMixin(map.get($font-size, md));

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
