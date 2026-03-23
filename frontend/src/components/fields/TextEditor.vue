<template>
  <component
    :is="props.htmlTag || 'p'"
    v-bind="$attrs"
    class="textEditor"
    :contenteditable="isEditing"
    @click="startEdit"
    @blur="saveEdit"
    @keydown.enter="handleEnter"
    @keyup.esc="cancelEdit"
    ref="editorRef"
  >
    {{ props.text }}
  </component>
</template>

<script setup lang="ts">
  import { ref, nextTick } from 'vue'

  defineOptions({ inheritAttrs: false })

  const props = defineProps<{
    htmlTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'strong' | 'span' | 'div'
    multiline?: boolean
    text: string
    saveEvent: (newName: string) => void
  }>()

  const isEditing = ref(false)
  const editorRef = ref<HTMLElement | null>(null)

  const startEdit = async () => {
    isEditing.value = true
    await nextTick()
    editorRef.value?.focus()
    const range = document.createRange()
    const sel = window.getSelection()
    range.selectNodeContents(editorRef.value!)
    range.collapse(false)
    sel?.removeAllRanges()
    sel?.addRange(range)
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
    white-space: pre-wrap;
    cursor: text;

    // &[contenteditable='true'] {
    //   outline: none;
    // }
  }
</style>
