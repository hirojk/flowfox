<template>
  <ModalUI>
    <ProjectSetting v-if="appStore.modalContent === 'project-setting'" />
  </ModalUI>

  <q-page class="page--project" v-bind="$attrs">
    <div class="page__headerWrapper">
      <BreadcrumbsUI />
      <header class="page__header">
        <div class="page__headerContent">
          <InitialUI
            :size="3"
            variant="primary"
            usage="project"
            theme="orange"
            :label="projectStore.activeProject?.name!"
          />
          <InputFieldUI
            class="page__headline"
            htmlTag="h1"
            textStyle="h2"
            :text="projectStore.activeProject?.name || ''"
            :saveEvent="
              (newProjectName) => projectStore.updateProjectName(projectStore.activeProject?.id!, newProjectName)
            "
          />
        </div>
        <IconButtonUI class="page__project-setting" icon="icon-custom" @click="openSettingsModal('project-setting')" />
      </header>
    </div>
    <section ref="pageContent" class="page__content">
      <div class="components page__category">
        <div class="page__title-wrapper">
          <h2>Pages</h2>
          <LinkUI
            label="Create New Page"
            :dropdown="[
              {
                name: 'Board',
                action: () => handleNewComponent(),
              },
            ]"
          />
        </div>
        <ul class="components__list page__list">
          <li v-for="component in projectStore.activeProject?.components" :key="component.id" class="components__item">
            <PageItem
              :id="`board-${component.id}`"
              buttonStyle="page"
              :componentStyle="component.type"
              theme="orange"
              :icon="`icon-${component.type}`"
              :label="component.name"
              :route="{ name: 'component', params: { componentId: String(component.id) } }"
              @confirm="(newName) => boardStore.updateBoardName(component.id, newName)"
              @cancel="boardStore.deleteBoard(component.id)"
            />
          </li>
        </ul>
      </div>
      <LineDivider v-for="i in dividerCount" :key="i" variant="tertiary" />
    </section>
  </q-page>
  <LineDivider class="line-divider__footer" variant="primary" />
</template>

<script setup lang="ts">
  import { useTemplateRef } from 'vue'
  import InputFieldUI from '@components/ui/InputFieldUI.vue'
  import ProjectSetting from '@components/project/ProjectSetting.vue'
  import BreadcrumbsUI from '@/components/ui/BreadcrumbsUI.vue'
  import PageItem from '@components/PageItem.vue'
  import InitialUI from '@components/ui/InitialUI.vue'
  import IconButtonUI from '@components/ui/IconButtonUI.vue'

  import { openSettingsModal } from '@composables/useModal'
  import { triggerInputFocus } from '@composables/useIosInteractions'
  import { useDecorationLines } from '@composables/useDecoration'
  import { useAppStore } from '@stores/appStore'
  import { useProjectStore } from '@stores/projectStore'
  import { useBoardStore } from '@stores/boardStore'

  const appStore = useAppStore()
  const projectStore = useProjectStore()
  const boardStore = useBoardStore()

  const contentRef = useTemplateRef<HTMLElement>('pageContent')
  const { dividerCount } = useDecorationLines(contentRef)

  const handleNewComponent = () => {
    triggerInputFocus(async () => {
      appStore.currentEditingId = (await boardStore.createNewBoard()).id
    }, '.components__item:nth-last-child(1) input')
  }

  defineOptions({ inheritAttrs: false })
</script>

<style lang="scss" scoped>
  .page--project {
    padding: $spacing-page-y $spacing-page-x calc($spacing-page-y * 2);
  }
</style>
