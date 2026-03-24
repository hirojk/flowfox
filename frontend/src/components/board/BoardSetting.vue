<template>
  <Teleport defer to="#modal-footer">
    <button class="board-setting__delete button button--primary" @click="onDeleteBoard">
      <IconSvg id="icon-cancel" />
      Delete this Board
    </button>
  </Teleport>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@stores/homeStore'
  import { useBoardStore } from '@stores/boardStore'
  import { useDeletePrompt } from '@composables/usePrompt'

  const projectStore = useProjectStore()
  const boardStore = useBoardStore()

  const { open } = useDeletePrompt()

  const onDeleteBoard = () => {
    open('Are you sure?', boardStore.deleteActiveBoard, {
      name: 'project',
      params: { projectId: String(projectStore.activeProject?.id) },
    })
  }
</script>

<style lang="scss" scoped>
  .board-setting {
    &__delete {
      width: 100%;
    }
  }
</style>
