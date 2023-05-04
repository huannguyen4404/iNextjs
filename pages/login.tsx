import { authApi } from '@/services'
import * as React from 'react'

export default function LoginPage() {
  async function handleLoginClick() {
    try {
      await authApi.login({
        username: 'huan',
        password: '123456',
      })
    } catch (error) {
      console.log('login failed', error)
    }
  }

  async function handleGetProfileClick() {
    try {
      await authApi.getProfile()
    } catch (error) {
      console.log('getProfile failed', error)
    }
  }

  async function handleLogoutClick() {
    try {
      await authApi.logout()
    } catch (error) {
      console.log('logout failed', error)
    }
  }

  return (
    <div>
      <h1>Login Page</h1>

      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleGetProfileClick}>Get profile</button>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  )
}
