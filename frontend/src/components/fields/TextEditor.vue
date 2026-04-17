<template>
  <component
    :is="props.htmlTag || 'p'"
    v-bind="$attrs"
    ref="editorRef"
    :class="['textEditor', props.textStyle]"
    :contenteditable="isEditing"
    @click="startEdit"
    @blur="handleBlur"
    @keydown.enter="handleEnter"
    @keyup.esc="cancelEdit"
  >
    {{ props.text }}
  </component>
</template>

<script setup lang="ts">
  import { ref, nextTick, watch } from 'vue'

  defineOptions({ inheritAttrs: false })

  const props = defineProps<{
    htmlTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'strong' | 'span' | 'div'
    textStyle?: string
    multiline?: boolean
    text: string
    editMode?: boolean
    saveEvent: (newName: string) => void
    cancelEvent?: () => void
  }>()

  const editorRef = ref<HTMLElement | null>(null)
  const isEditing = ref<boolean>(props.editMode ?? false)
  const editAction = ref<'save' | 'cancel' | null>(null)

  const setCursor = async (event?: MouseEvent) => {
    await nextTick()
    const element = editorRef.value
    if (!element) return

    element.focus()

    const inputRange = document.createRange()
    const cursorPosition = event && document.caretPositionFromPoint(event.clientX, event.clientY)

    if (cursorPosition) {
      inputRange.setStart(cursorPosition.offsetNode, cursorPosition.offset)
      inputRange.collapse(true)
    } else {
      inputRange.selectNodeContents(element as Node)
      inputRange.collapse(false)
    }

    window.getSelection()?.removeAllRanges()
    window.getSelection()?.addRange(inputRange)
  }

  const startEdit = async (event: MouseEvent) => {
    if (isEditing.value) return

    isEditing.value = true
    await setCursor(event)
  }

  const handleEnter = (event: KeyboardEvent) => {
    if (props.multiline) {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault()
        saveEdit()
      }
    } else {
      event.preventDefault()
      saveEdit()
    }
  }

  const saveEdit = () => {
    editAction.value = 'save'
    const newText = editorRef.value?.innerText.trim()
    isEditing.value = false
    if (newText) props.saveEvent(newText)
    else props.cancelEvent?.()
  }

  const cancelEdit = () => {
    editAction.value = 'cancel'
    isEditing.value = false
    if (editorRef.value) editorRef.value.innerText = props.text
    props.cancelEvent?.()
  }

  const handleBlur = () => {
    if (editAction.value) {
      editAction.value = null
      return
    }
    cancelEdit()
  }

  watch(
    () => props.editMode,
    async (editModeState) => {
      if (editModeState) {
        isEditing.value = true
        setCursor()
      }
    },
    { immediate: true },
  )
</script>

<style lang="scss" scoped>
  .textEditor {
    position: relative;
    width: 100%;
    padding: 0.2em;
    white-space: pre-wrap;
    cursor: text;

    &:active {
      border-radius: 0.25em;
      background-color: rgba($ff-grey, 0.1);
    }

    &[contenteditable='true'] {
      position: relative;
      isolation: isolate;
      outline: none;

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border: 2px solid currentcolor;
        border-radius: 0.25em;
        pointer-events: none;
        z-index: -1;
      }
    }
  }
</style>
