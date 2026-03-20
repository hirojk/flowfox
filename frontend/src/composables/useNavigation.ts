import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@stores/authStore'
import { useProjectStore } from '@stores/homeStore.ts'

export const useAuth = () => {
  const authStore = useAuthStore()

  const handleLogout = () => {
    authStore.logout()
  }

  return { handleLogout }
}

export const useNavigation = () => {
  const componentRoute = (projectId: number, componentId: number) => {
    if (!projectId || !componentId) return null

    return {
      name: 'component',
      params: { projectId: String(projectId), componentId: String(componentId) },
    }
  }

  return { componentRoute }
}

export const useComponentResolver = () => {
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
