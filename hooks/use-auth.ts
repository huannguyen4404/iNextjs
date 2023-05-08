import { LoginPayload, UserProfile } from '@/models'
import { authApi } from '@/services'
import useSWR, { SWRConfiguration } from 'swr'

export function useAuth(options?: SWRConfiguration) {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR<UserProfile | null>(`/profile`, {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    ...options,
  })

  const firstLoading = profile === undefined && error === undefined

  async function login(payload: LoginPayload) {
    await authApi.login(payload)
    await mutate()
  }

  async function logout() {
    await authApi.logout()

    mutate(null, false)
  }

  return { profile, error, login, logout, firstLoading }
}
