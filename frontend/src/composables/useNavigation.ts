import { useAuthStore } from '@stores/authStore'

export const useAuth = () => {
  const authStore = useAuthStore()

  const handleLogout = () => {
    authStore.logout()
  }

  return { handleLogout }
}

export const useNavigation = () => {
  const componentRoute = (componentType: string | undefined, projectId: number, componentId: number | undefined) => {
    if (!componentId || !componentType) return

    return { name: componentType, params: { projectId, componentId } }
  }

  return { componentRoute }
}
