import { computed, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@stores/authStore'
import { useProjectStore } from '@stores/projectStore'
import type { ProjectType, BoardType } from '@flowfox/shared'

export const useAuth = (): { handleLogout: () => void } => {
  const authStore = useAuthStore()

  const handleLogout = () => {
    authStore.logout()
  }

  return { handleLogout }
}

export const useNavigation = (): { componentRoute: (projectId: number, componentId: number) => void } => {
  const componentRoute = (projectId: number, componentId: number) => {
    if (!projectId || !componentId) return null

    return {
      name: 'component',
      params: { projectId: String(projectId), componentId: String(componentId) },
    }
  }

  return { componentRoute }
}

// prettier-ignore
export const useComponentResolver = (): { activeProject: ComputedRef<ProjectType | undefined>; activeComponent: ComputedRef<BoardType | undefined> } => {
  const route = useRoute()
  const projectStore = useProjectStore()

  const activeProject = computed(() =>
    projectStore.allProjects.find((project) => project.id === Number(route.params.projectId)),
  )

  const activeComponent = computed(() =>
    activeProject.value?.components?.find((component) => component.id === Number(route.params.componentId)),
  )

  return { activeProject, activeComponent }
}
