<template>
  <q-page>
    <header class="page__header">
      <h1 class="page__headline">Hello {{ activeUser?.name }}</h1>
      <RouterLink class="page__logout button button--secondary" :to="{ name: 'login' }" @click="handleLogout">
        Logout
      </RouterLink>
    </header>
    <section class="page__content">
      <div class="projects">
        <h2 class="projects__title">Projects</h2>
        <ul class="projects__list">
          <li v-for="project in projectStore.allProjects" :key="project.id" class="projects__item">
            <PageItem
              buttonStyle="project"
              :label="project.name"
              :route="{ name: 'project', params: { projectId: String(project.id) } }"
            />
          </li>
          <li class="projects__item">
            <PageItem buttonStyle="new" icon="icon-plus" label="New Project" @click="projectStore.createNewProject()" />
          </li>
        </ul>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useAuthStore } from '@stores/authStore'
  import { useProjectStore } from '@stores/homeStore.ts'
  import { useAuth } from '@composables/useNavigation'

  import PageItem from '@components/PageItem.vue'

  const activeUser = computed(() => useAuthStore().activeUser)
  const projectStore = useProjectStore()

  const { handleLogout } = useAuth()

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
    &__headline {
      color: $ff-primary;
    }
  }

  .projects {
    display: flex;
    flex-direction: column;
    gap: 1.5em;

    &__list {
      display: flex;
      gap: 2em;
    }
  }
</style>
