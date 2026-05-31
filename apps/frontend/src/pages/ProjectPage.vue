<template>
  <ModalUI>
    <ProjectSetting v-if="appStore.modalContent === 'project-setting'" />
  </ModalUI>

  <q-page class="page--project" v-bind="$attrs">
    <header class="page__header">
      <div class="page__headerContent">
        <InitialUI :size="+5" :label="projectStore.activeProject?.name!" :backgroundColor="colors['pw-primary']" />
        <TextEditor
          class="page__headline"
          htmlTag="h1"
          textStyle="h2"
          :text="projectStore.activeProject?.name || ''"
          :saveEvent="
            (newProjectName) => projectStore.updateProjectName(projectStore.activeProject?.id!, newProjectName)
          "
        />
      </div>
      <button class="button button--primary" @click="openSettingsModal('project-setting')">Project setting</button>
    </header>
    <section class="page__content">
      <div class="components">
        <div class="page__title-wrapper">
          <h2 class="components__title">Pages</h2>
          <LinkUI label="Create New Page" @click="handleNewComponent" />
        </div>
        <ul class="components__list page__list">
          <li v-for="component in projectStore.activeProject?.components" :key="component.id" class="components__item">
            <PageItem
              :id="`board-${component.id}`"
              buttonStyle="component"
              themeColor="orange"
              :icon="`icon-${component.type}`"
              :label="component.name"
              :route="{ name: 'component', params: { componentId: String(component.id) } }"
              @confirm="(newName) => boardStore.updateBoardName(component.id, newName)"
              @cancel="boardStore.deleteBoard(component.id)"
            />
          </li>
        </ul>
      </div>
      <LineDivider v-for="i in 10" :key="i" variant="tertiary" />
    </section>
  </q-page>
  <LineDivider class="line-divider__footer" variant="primary" />
</template>

<script setup lang="ts">
  import colors from '@styles/colors.json'

  import TextEditor from '@components/ui/TextEditor.vue'
  import ProjectSetting from '@components/project/ProjectSetting.vue'
  import PageItem from '@components/PageItem.vue'
  import InitialUI from '@components/ui/InitialUI.vue'

  import { openSettingsModal } from '@composables/useModal'
  import { triggerInputFocus } from '@/composables/useIosInteractions'
  import { useAppStore } from '@stores/appStore'
  import { useProjectStore } from '@stores/projectStore'
  import { useBoardStore } from '@stores/boardStore'

  const appStore = useAppStore()
  const projectStore = useProjectStore()
  const boardStore = useBoardStore()

  const handleNewComponent = () => {
    triggerInputFocus(async () => {
      appStore.currentEditingId = (await boardStore.createNewBoard()).id
    }, '.components__item:nth-last-child(1) input')
  }

  defineOptions({ inheritAttrs: false })
</script>

<style lang="scss" scoped>
  .page--project {
    padding: $page-padding-y $page-padding-x calc($page-padding-y * 2);

    .page__content {
      gap: 0;
    }

    .components {
      display: flex;
      flex-direction: column;
      gap: 1.5em;

      &__title {
        padding: 0.2em;
        color: $pw-black;
      }
    }
  }
</style>
