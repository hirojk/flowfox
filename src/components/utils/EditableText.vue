<template>
  <q-input
    v-if="isEditing"
    v-model="inputText"
    dense
    autofocus
    borderless
    @blur="saveEdit"
    @keyup.enter="saveEdit"
    @keyup.esc="cancelEdit"
  />
  <h2 v-else @click="startEdit" class="column-title">
    {{ props.text }}
  </h2>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  const props = defineProps<{
    text: string;
    saveEvent: (newName: string) => void;
  }>();

  const isEditing = ref(false);
  const inputText = ref('');

  const startEdit = () => {
    inputText.value = props.text;
    isEditing.value = true;
  };

  const saveEdit = () => {
    if (inputText.value.trim()) {
      props.saveEvent(inputText.value.trim());
    }
    isEditing.value = false;
  };

  const cancelEdit = () => {
    isEditing.value = false;
  };
</script>
