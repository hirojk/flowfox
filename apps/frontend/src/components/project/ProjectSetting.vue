<template>
  <Teleport defer to="#modal-header">
    <h1 class="project-setting__headline h3">Project Setting</h1>
  </Teleport>
  <Teleport defer to="#modal-footer">
    <section class="project-setting__dangerzone modal__category modal__category--dangerzone">
      <h2 class="modal__category-headline h4">Danger Zone</h2>
      <div class="modal__category-content">
        <div class="modal__category-textWrapper">
          <h3 class="modal__category-text modal__category-text--strong">Delete project</h3>
          <p class="modal__category-text">
            Once you delete a project, there is no going back. <br />
            Please be certain.
          </p>
        </div>
        <ButtonUI class="project-setting__delete" variant="error" label="Delete project" @click="onDeleteBoard" />
      </div>
    </section>
  </Teleport>
</template>

<script setup lang="ts">
  import { useDeletePrompt } from '@composables/usePromptWindow'
  import { useProjectStore } from '@stores/projectStore'

  const projectStore = useProjectStore()
  const { open } = useDeletePrompt()

  const onDeleteBoard = () => {
    if (!projectStore.activeProject) return

    open(
      `Are you sure you want to delete the project "${projectStore.activeProject?.name}" ?`,
      () => projectStore.deleteProject(projectStore.activeProject!.id),
      { name: 'home' },
    )
  }
</script>
