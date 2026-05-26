<template>
  <q-page v-bind="$attrs">
    <header class="page__header">
      <div class="page__topbar">
        <h1 class="page__headline">Hello {{ activeUser?.name }},</h1>
        <Avatar @click="(e: MouseEvent) => avatarDropdown?.open(e.currentTarget as HTMLElement)">
          <DropdownUI
            ref="avatarDropdown"
            :description="`${activeUser?.name}`"
            :options="[{ name: 'Logout', route: { name: 'login' }, action: handleLogout }]"
          />
        </Avatar>
      </div>
      <p class="page__subline">Good to have you here. Ready to pick up where you left off?</p>
    </header>
    <LineDivider variant="secondary" />
    <section class="page__content">
      <div class="projects">
        <div class="page__title-wrapper">
          <h2 class="projects__title">Your Projects</h2>
          <LinkUI label="Create New Project" @click="handleNewProject" />
        </div>
        <ul class="projects__list">
          <li v-for="project in projectStore.allProjects" :key="project.id" class="projects__item">
            <PageItem
              :id="`project-${project.id}`"
              buttonStyle="project"
              :label="project.name"
              :route="{ name: 'project', params: { projectId: String(project.id) } }"
              @confirm="(newName) => projectStore.updateProjectName(project.id, newName)"
              @cancel="projectStore.deleteProject(project.id)"
            />
          </li>
        </ul>
      </div>
      <LineDivider v-for="i in 5" :key="i" variant="tertiary" />
    </section>
  </q-page>
  <LineDivider class="line-divider__footer" variant="primary" />
</template>

<script setup lang="ts">
  import { computed, useTemplateRef, onMounted } from 'vue'
  import { useAuth } from '@composables/useNavigation'
  import { triggerInputFocus } from '@composables/useIosInteractions'
  import { useAppStore } from '@stores/appStore'
  import { useAuthStore } from '@stores/authStore'
  import { useProjectStore } from '@stores/projectStore'

  import Avatar from '@components/ui/Avatar.vue'
  import PageItem from '@components/PageItem.vue'

  const activeUser = computed(() => useAuthStore().activeUser)
  const appStore = useAppStore()
  const projectStore = useProjectStore()

  const { handleLogout } = useAuth()

  const avatarDropdown = useTemplateRef<{ open: (element: HTMLElement) => void }>('avatarDropdown')

  const handleNewProject = () => {
    triggerInputFocus(async () => {
      appStore.currentEditingId = (await projectStore.createNewProject()).id
    }, '.projects__item:nth-last-child(1) input')
  }

  onMounted(async () => {
    if (!activeUser.value) return
    try {
      await projectStore.loadProjects()
    } catch (error) {
      console.error('Error loading projects:', error)
    }
  })
</script>

<style lang="scss" scoped>
  .page {
    padding: $page-padding-y $page-padding-x calc($page-padding-y * 2);

    &__header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2em;
      height: auto;
    }

    &__topbar {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }

  .projects {
    display: flex;
    flex-direction: column;
    gap: 2em;

    &__list {
      display: flex;
      gap: 2em;
    }
  }
</style>
