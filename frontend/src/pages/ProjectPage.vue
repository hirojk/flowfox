<template>
  <ModalWindow>
    <ProjectSetting v-if="modalStore.currentWindow === 'project-setting'" />
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
      <button class="button button--tertiary" @click="openSettingsModal('project-setting')">Setting</button>
    </header>
    <section class="page__content">
      <div class="components">
        <h2 class="components__title">Components</h2>
        <ul class="components__list">
          <li v-for="component in projectStore.activeProject?.components" :key="component.id" class="components__item">
            <PageItem
              buttonStyle="component"
              :id="component.id"
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
  import { useAppStore, useModalStore } from '@stores/appStore'
  import { useProjectStore } from '@stores/projectStore'
  import { useBoardStore } from '@stores/boardStore'

  const appStore = useAppStore()
  const modalStore = useModalStore()
  const projectStore = useProjectStore()
  const boardStore = useBoardStore()

  const handleNewComponent = async () => {
    const newComponent = await boardStore.createNewBoard()
    appStore.currentEditingId = newComponent.id
  }

  defineOptions({ inheritAttrs: false })
</script>

<style lang="scss" scoped>
  .page--project {
    background-color: $ff-secondary;

    .page {
      &__headline {
        color: $ff-white;
      }
    }

    .components {
      display: flex;
      flex-direction: column;
      gap: 1.5em;

      &__title {
        color: $ff-white;
      }

      &__list {
        display: flex;
        gap: 2em;
      }

      .page-item--new {
        --label-color: #{$ff-white};
      }
    }
  }
</style>
