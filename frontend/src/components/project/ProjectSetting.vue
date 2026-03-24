<template>
  <Teleport defer to="#modal-footer">
    <button class="project-setting__delete button button--primary" @click="onDeleteBoard">
      <IconSvg id="icon-cancel" />
      Delete this Project
    </button>
  </Teleport>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@stores/homeStore'
  import { useDeletePrompt } from '@composables/usePrompt'

  const projectStore = useProjectStore()
  const { open } = useDeletePrompt()

  const onDeleteBoard = () => {
    open('Are you sure?', projectStore.deleteActiveProject, { name: 'home' })
  }
</script>

<style lang="scss" scoped>
  .project-setting {
    &__delete {
      width: 100%;
    }
  }
</style>
