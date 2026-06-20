import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { type UserType, ROLE_VALUES } from '@pagewise/shared'

import { useAuthStore } from '@stores/authStore'
import api from '@services/api'

vi.mock('axios', async (importOriginal) => {
  const actual = await importOriginal<typeof import('axios')>()
  return {
    ...actual,
    default: {
      ...actual.default,
      isAxiosError: (e: unknown): boolean => typeof e === 'object' && e !== null && 'response' in e,
    },
  }
})

vi.mock('@services/api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}))

const mockUser = {
  username: 'jan',
  role: ROLE_VALUES.USER,
} as UserType

describe('authStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('isLoggedIn is false initially', () => {
    const store = useAuthStore()
    expect(store.isLoggedIn).toBe(false)
  })

  it('isLoggedIn is true after fetchUser succeeds', async () => {
    vi.mocked(api.get).mockResolvedValueOnce({
      success: true,
      data: mockUser,
    })

    const store = useAuthStore()
    await store.fetchUser()

    expect(store.isLoggedIn).toBe(true)
    expect(store.user?.username).toBe('jan')
  })

  it('sets user to null on 401', async () => {
    vi.mocked(api.get).mockRejectedValueOnce({ response: { status: 401 } })

    const store = useAuthStore()
    await store.fetchUser()

    expect(store.user).toBeNull()
    expect(store.isLoggedIn).toBe(false)
  })

  it('clears user on logout', async () => {
    vi.mocked(api.post).mockResolvedValueOnce({})
    const store = useAuthStore()
    store.user = mockUser

    await store.logout()

    expect(store.user).toBeNull()
  })
})
