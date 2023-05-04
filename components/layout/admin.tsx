import { LayoutProps } from '@/models/index'
import Link from 'next/link'
import * as React from 'react'
import { Auth } from '../common'
import { useAuth } from '@/hooks'

export function AdminLayout({ children }: LayoutProps) {
  const { profile, logout } = useAuth()

  async function handleLogoutClick() {
    try {
      await logout()
      console.log('redirect to login page')
    } catch (error) {
      console.log('logout failed', error)
    }
  }

  return (
    <Auth>
      <h1>Admin Layout</h1>
      <div>Sidebar</div>

      <p>Profile: {JSON.stringify(profile)}</p>

      <button onClick={handleLogoutClick}>Logout</button>

      <Link href="/">Home</Link>
      <Link href="/about">About</Link>

      <div>{children}</div>
    </Auth>
  )
}
