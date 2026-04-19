<template>
  <textarea
    v-if="props.multiline"
    ref="inputRef"
    v-bind="{ ...$attrs, ...ariaAttrs }"
    :class="['textEditor textEditor--textarea', currentTag.style]"
    :readonly="!isEditing"
    :name="localText"
    :value="localText"
    @click="startEdit"
    @touchend.prevent="startEdit"
    @blur="handleBlur"
    @keydown.enter.exact="handleEnter"
    @keydown.esc="cancelEdit"
  />

  <input
    v-else
    ref="inputRef"
    v-bind="{ ...$attrs, ...ariaAttrs }"
    :class="['textEditor textEditor--input', currentTag.style]"
    :readonly="!isEditing"
    :name="localText"
    :value="localText"
    @click="startEdit"
    @touchend.prevent="startEdit"
    @blur="handleBlur"
    @keydown.enter.prevent="handleEnter"
    @keydown.esc="cancelEdit"
  />
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'

  defineOptions({ inheritAttrs: false })

  const props = defineProps<{
    htmlTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'strong' | 'span'
    multiline?: boolean
    text: string
    editMode?: boolean
    saveEvent: (newName: string) => void
    cancelEvent?: () => void
  }>()

  const htmlTagMap: Record<string, { style: string; level?: number }> = {
    h1: { style: 'h1', level: 1 },
    h2: { style: 'h2', level: 2 },
    h3: { style: 'h3', level: 3 },
    h4: { style: 'h4', level: 4 },
    h5: { style: 'h5', level: 5 },
    h6: { style: 'h6', level: 6 },
    p: { style: 'p' },
    strong: { style: 'strong' },
    span: { style: 'span' },
  }

  const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null)
  const currentTag = htmlTagMap[props.htmlTag || 'span'] ?? { style: 'span' }
  const isEditing = ref(false)
  const localText = ref(props.text)

  const ariaAttrs: Record<string, unknown> = {}
  if (currentTag.level) {
    ariaAttrs.role = 'heading'
    ariaAttrs['aria-level'] = currentTag.level
    ariaAttrs['aria-label'] = props.text
  }

  const startEdit = () => {
    if (isEditing.value) return
    isEditing.value = true
    inputRef.value?.removeAttribute('readonly')
    inputRef.value?.focus()
  }

  const cancelEdit = () => {
    if (inputRef.value) inputRef.value.value = props.text
    submit()
  }

  const submit = (value?: string) => {
    isEditing.value = false
    if (value) {
      localText.value = value
      props.saveEvent(value)
    } else {
      props.cancelEvent?.()
    }
  }

  const handleEnter = () => {
    inputRef.value?.blur()
    submit(inputRef.value?.value.trim())
  }
  const handleBlur = () => {
    const value = inputRef.value?.value.trim()
    if (!value) {
      cancelEdit()
      return
    }
    submit(value)
  }

  watch(
    () => props.text,
    (newText) => {
      if (!isEditing.value) localText.value = newText
    },
  )

  watch(
    () => props.editMode,
    (editModeState) => {
      if (editModeState) isEditing.value = true
    },
  )
</script>

<style lang="scss" scoped>
  .textEditor {
    width: 100%;
    border: 2px solid transparent;
    border-radius: 0.25em;
    padding: 0.1em;
    cursor: text;
    pointer-events: auto;

    &--textarea {
      resize: none;
      field-sizing: content;
    }

    &:read-write {
      border: 2px solid currentcolor;
      background: transparent;
    }
  }
</style>
