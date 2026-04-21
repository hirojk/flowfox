<template>
  <component
    :is="props.multiline ? 'textarea' : 'input'"
    ref="inputRef"
    v-bind="{ ...$attrs, ...ariaAttrs }"
    :class="[
      'textEditor',
      props.multiline ? 'textEditor--textarea' : 'textEditor--input',
      props.textStyle ? props.textStyle : currentTag.style,
      props.singleEdit && hasEdited ? 'textEditor--pointer' : '',
    ]"
    :readonly="!isEditing"
    :name="localText"
    :value="localText"
    @click="handleClick"
    @touchend="handleTouch"
    @blur="handleBlur"
    @keydown.enter="handleEnter"
    @keydown.esc="cancelEdit"
  />
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { useAppStore } from '@stores/appStore'

  defineOptions({ inheritAttrs: false })

  const props = defineProps<{
    editMode?: boolean
    singleEdit?: boolean
    htmlTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'strong' | 'span'
    textStyle?: string
    multiline?: boolean
    text: string
    saveEvent: (newName: string) => void
    cancelEvent?: () => void
  }>()
  const appStore = useAppStore()

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
  const hasEdited = computed(() => props.text !== '')
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
    if (props.singleEdit && hasEdited.value) return
    isEditing.value = true
    appStore.isEditing = true
    inputRef.value?.removeAttribute('readonly')
    inputRef.value?.focus()
  }

  const cancelEdit = () => {
    if (inputRef.value) inputRef.value.value = props.text
    submit()
  }

  const submit = (value?: string) => {
    isEditing.value = false
    appStore.isEditing = false
    if (inputRef.value) inputRef.value.readOnly = true
    if (value) {
      localText.value = value
      props.saveEvent(value)
    } else props.cancelEvent?.()
  }

  const getNewTextValue = () => inputRef.value?.value.trim()
  const handleClick = (e: MouseEvent) => {
    if (props.singleEdit && hasEdited.value) return
    if (props.editMode) e.stopPropagation()
    startEdit()
  }
  const handleEnter = (e: KeyboardEvent) => {
    if (props.multiline && !e.ctrlKey && !e.metaKey) return

    e.preventDefault()
    inputRef.value?.blur()
    submit(getNewTextValue())
  }
  const handleBlur = () => {
    if (getNewTextValue()) submit(getNewTextValue())
    else cancelEdit()
  }
  const handleTouch = (e: TouchEvent) => {
    if (props.singleEdit && hasEdited.value) return
    e.preventDefault()
    startEdit()
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

    &:read-write {
      border: 2px solid currentcolor;
      background: transparent;
    }

    &--textarea {
      resize: none;
      field-sizing: content;
    }

    &--pointer {
      cursor: pointer;
    }
  }
</style>
