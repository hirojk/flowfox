<template>
  <ModalWindow>
    <ProjectSetting v-if="appStore.modalContent === 'project-setting'" />
  </ModalWindow>

  <q-page class="page--project" v-bind="$attrs">
    <header class="page__header">
      <div class="page__headerContent">
        <TextEditor
          class="page__headline"
          htmlTag="h1"
          :text="projectStore.activeProject?.name || ''"
          :saveEvent="
            (newProjectName) => projectStore.updateProjectName(projectStore.activeProject?.id!, newProjectName)
          "
        />
      </div>
      <button class="button button--primary" @click="openSettingsModal('project-setting')">Setting</button>
    </header>
    <section class="page__content">
      <div class="components">
        <h2 class="components__title">Components</h2>
        <ul class="components__list">
          <li v-for="component in projectStore.activeProject?.components" :key="component.id" class="components__item">
            <PageItem
              :id="component.id"
              buttonStyle="component"
              :icon="`icon-${component.type}`"
              :label="component.name"
              :route="{ name: 'component', params: { componentId: String(component.id) } }"
              @confirm="(newName) => boardStore.updateBoardName(component.id, newName)"
              @cancel="boardStore.deleteBoard(component.id)"
            />
          </li>
          <li class="components__item">
            <PageItem buttonStyle="new" icon="icon-plus" label="New Component" @click="handleNewComponent" />
          </li>
        </ul>
      </div>
    </section>
  </q-page>
  <backdrop />
</template>

<script setup lang="ts">
  import TextEditor from '@components/fields/TextEditor.vue'
  import ProjectSetting from '@components/project/ProjectSetting.vue'
  import PageItem from '@components/PageItem.vue'
  import Backdrop from '@components/Backdrop.vue'
  import { openSettingsModal } from '@composables/useModal'
  import { focusAfterAsync } from '@/composables/useIosInteractions'
  import { useAppStore } from '@stores/appStore'
  import { useProjectStore } from '@stores/projectStore'
  import { useBoardStore } from '@stores/boardStore'

  const appStore = useAppStore()
  const projectStore = useProjectStore()
  const boardStore = useBoardStore()

  const handleNewComponent = () => {
    focusAfterAsync(async () => {
      const newComponent = await boardStore.createNewBoard()
      appStore.currentEditingId = newComponent.id
    }, '.page-item:last-child [contenteditable]')
  }

  defineOptions({ inheritAttrs: false })
</script>

<style lang="scss" scoped>
  .page--project {
    background-color: $ff-tertiary;

    .page {
      &__headline {
        color: $ff-primary;
      }
    }

    .components {
      display: flex;
      flex-direction: column;
      gap: 1.5em;

      &__title {
        padding: 0.2em;
        color: $ff-black;
      }

      &__list {
        display: flex;
        gap: 2em;
      }
    }
  }
</style>
