import { useAuthStore } from '@stores/authStore'
import { useRouter } from 'vue-router'

export const useAuth = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    authStore.logout()
    router.push({ name: 'login' })
  }

  return { handleLogout }
}

export const useNavigation = () => {
  const router = useRouter()

  const goToHome = () => {
    router.push({ name: 'home' })
  }

  const goToComponent = (componentType: string | undefined, projectId: number, componentId: number | undefined) => {
    if (!componentId || !componentType) return

    router.push({ name: componentType, params: { projectId, componentId } })
  }

  return { goToHome, goToComponent }
}
