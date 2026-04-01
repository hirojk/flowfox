<template>
  <component
    :is="props.htmlTag || 'p'"
    v-bind="$attrs"
    ref="editorRef"
    :class="['textEditor', props.textStyle]"
    :contenteditable="isEditing"
    @click="startEdit"
    @blur="saveEdit"
    @keydown.enter="handleEnter"
    @keyup.esc="cancelEdit"
  >
    {{ props.text }}
  </component>
</template>

<script setup lang="ts">
  import { ref, nextTick } from 'vue'

  defineOptions({ inheritAttrs: false })

  const props = defineProps<{
    htmlTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'strong' | 'span' | 'div'
    textStyle?: string
    multiline?: boolean
    text: string
    saveEvent: (newName: string) => void
  }>()

  const isEditing = ref(false)
  const editorRef = ref<HTMLElement | null>(null)

  const startEdit = async (event: MouseEvent) => {
    if (isEditing.value) return

    isEditing.value = true
    await nextTick()

    const sel = window.getSelection()
    sel?.removeAllRanges()

    const position = document.caretPositionFromPoint(event.clientX, event.clientY)
    if (position) {
      const range = document.createRange()
      range.setStart(position.offsetNode, position.offset)
      range.collapse(true)
      sel?.addRange(range)
    }
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
    const newText = editorRef.value?.innerText.trim()
    if (newText) props.saveEvent(newText)
    isEditing.value = false
  }

  const cancelEdit = () => {
    isEditing.value = false
    if (editorRef.value) editorRef.value.innerText = props.text
  }
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
      background-color: rgba($ff-grey, 0.05);
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
