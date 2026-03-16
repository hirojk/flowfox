import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@stores/authStore'
import { useProjectStore } from '@stores/homeStore.ts'
import { slugify } from '@services/helpers'
import type { BoardType } from '@flowfox/shared'

export const useAuth = () => {
  const authStore = useAuthStore()

  const handleLogout = () => {
    authStore.logout()
  }

  return { handleLogout }
}

export const useNavigation = () => {
  const componentRoute = (projectName: string, component: BoardType | undefined) => {
    if (!projectName || !component) return null

    return {
      name: 'component',
      params: { projectSlug: slugify(projectName), componentSlug: slugify(component.boardName) },
    }
  }

  return { componentRoute }
}

export const useComponentResolver = () => {
  const route = useRoute()
  const projectStore = useProjectStore()

  const activeProject = computed(() =>
    projectStore.userProjects.find((p) => slugify(p.projectName) === route.params.projectSlug),
  )

  const activeComponent = computed(() =>
    activeProject.value?.components?.find((b) => slugify(b.boardName) === route.params.componentSlug),
  )

  return { activeProject, activeComponent }
}
