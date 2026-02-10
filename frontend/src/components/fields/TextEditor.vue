<template>
  <q-input
    v-if="isEditing"
    v-model="inputText"
    :type="props.multiline ? 'textarea' : 'text'"
    :autogrow="props.multiline"
    dense
    autofocus
    borderless
    @blur="saveEdit"
    @keydown.enter="handleEnter"
    @keyup.esc="cancelEdit"
  />
  <component v-else :is="props.htmlTag || 'p'" class="textEditor" @click="startEdit">
    {{ props.text }}
  </component>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  htmlTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'strong' | 'span' | 'div'
  multiline?: boolean
  text: string
  saveEvent: (newName: string) => void
}>()

const isEditing = ref(false)
const inputText = ref('')

const startEdit = () => {
  inputText.value = props.text
  isEditing.value = true
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
  if (inputText.value.trim()) {
    props.saveEvent(inputText.value.trim())
  }
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
}
</script>

<style lang="scss" scoped>
.textEditor {
  white-space: pre-wrap;
}
</style>
