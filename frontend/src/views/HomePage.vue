<template>
  <q-page>
    <section class="page__header">
      <h1 class="page__headline">Hello {{ activeUser?.name }}</h1>
      <button class="page__logout button button--secondary">Logout</button>
    </section>
    <section class="page__content">
      <div class="projects">
        <h2 class="projects__title">Projects</h2>
        <ul class="projects__list">
          <li v-for="project in projectStore.userProjects" :key="project.id" class="projects__item">
            <button class="projects__button">
              <div class="projects__icon">
                <strong class="projects__initials">{{ useInitials(project.projectName) }}</strong>
              </div>
              <span class="projects__name">{{ project.projectName }}</span>
            </button>
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
  import { useAuthStore } from '@stores/authStore'
  import { useProjectStore } from '@stores/homeStore.ts'
  import { useInitials } from '@/composables/useInitials'

  const activeUser = computed(() => useAuthStore().activeUser)
  const projectStore = useProjectStore()

  onMounted(async () => {
    if (!activeUser) return
    try {
      await projectStore.loadProjects()
    } catch (error) {
      console.error('Error loading projects:', error)
    }
  })
</script>

<style lang="scss" scoped>
  .page {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4em;
    }

    &__headline {
      color: $ff-primary;
    }

    &__logout {
      padding: 1em 4em;
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
