import { StorageKeys } from '@/constants'
import { LoginPayload, UserProfile } from '@/models'
import { authApi } from '@/services'
import useSWR, { SWRConfiguration } from 'swr'

function getUserInfo(): UserProfile | null {
  try {
    return JSON.parse(localStorage.getItem(StorageKeys.USER_INFO) || '')
  } catch (error) {
    console.log('Failed to parse user info from localstorage', error)
    return null
  }
}

export function useAuth(options?: SWRConfiguration) {
  const swrOptions: SWRConfiguration = {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    ...options,
    fallbackData: getUserInfo(),
    onSuccess(data) {
      localStorage.setItem(StorageKeys.USER_INFO, JSON.stringify(data))
    },
    onError(err) {
      // sentry, ddtrace...
      console.log(err)
      logout()
    },
  }

  const { data: profile, error, mutate } = useSWR<UserProfile | null>(`/profile`, swrOptions)

  const firstLoading = profile === undefined && error === undefined

  async function login(payload: LoginPayload) {
    await authApi.login(payload)
    await mutate()
  }

  async function logout() {
    await authApi.logout()
    mutate(null, false)
    localStorage.removeItem(StorageKeys.USER_INFO)
  }

  return { profile, error, login, logout, firstLoading }
}
