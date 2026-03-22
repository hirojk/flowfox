<template>
  <q-page v-bind="$attrs">
    <header class="page__header">
      <div class="page__headerContent">
        <TextEditor
          class="page__headline"
          htmlTag="h1"
          :text="projectStore.activeProject?.projectName || ''"
          :saveEvent="(newProjectName) => projectStore.updateProjectName(newProjectName)"
        />
      </div>
      <button class="button button--primary">Setting</button>
    </header>
    <section class="page__content"></section>
  </q-page>
  <backdrop />
</template>

<script setup lang="ts">
  import { useProjectStore } from '@stores/homeStore.ts'

  import TextEditor from '@components/fields/TextEditor.vue'
  import Backdrop from '@components/Backdrop.vue'

  const projectStore = useProjectStore()

  defineOptions({ inheritAttrs: false })
</script>
