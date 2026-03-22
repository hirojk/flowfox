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
          <li v-for="{ project, link } in projects" :key="project.id" class="projects__item">
            <component
              :is="link ? RouterLink : 'button'"
              :to="{ name: 'project', params: { projectId: project.id } }"
              class="projects__button"
              @click="handleProjectClick(project.id)"
            >
              <div class="projects__icon">
                <strong class="projects__initials">{{ useInitials(project.projectName) }}</strong>
              </div>
              <span class="projects__name">{{ project.projectName }}</span>
            </component>
          </li>
          <li class="projects__item">
            <button class="projects__button projects__button--new">
              <div class="projects__icon">
                <IconSvg class="projects__initials" id="icon-plus" size="1.25em" />
              </div>
              <span class="projects__name">New Project</span>
            </button>
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
  import { useAuth, useNavigation } from '@composables/useNavigation'
  import { useInitials } from '@composables/useInitials'

  const activeUser = computed(() => useAuthStore().activeUser)
  const projectStore = useProjectStore()

  const { handleLogout } = useAuth()
  const { componentRoute } = useNavigation()

  const projects = computed(() =>
    projectStore.allProjects.map((project) => {
      const firstComponentId = projectStore.getFirstComponentId(project.id)

      return {
        project: project,
        link: firstComponentId ? componentRoute(project.id, firstComponentId) : null,
      }
    }),
  )

  function handleProjectClick(projectId: number) {
    // projectStore.updateActiveProject(projectId)
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

    &__button {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1em;

      &--new {
        .projects {
          &__icon {
            background-color: $ff-quaternary;
          }

          &__initials,
          &__name {
            color: $ff-grey;
          }
        }
      }
    }

    &__name {
      @include fontMixin(map-get($font-size, md));
    }

    &__icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 7em;
      height: auto;
      aspect-ratio: 1 / 1;
      border-radius: 1em;
      color: $ff-white;
      background-color: $ff-primary;
    }

    &__initials {
      @include fontMixin(map-get($font-size, xl));
    }
  }
</style>
