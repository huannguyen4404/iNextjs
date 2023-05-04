import { useAuth } from '@/hooks'

export default function LoginPage() {
  const { profile, login, logout } = useAuth({ revalidateOnMount: false })

  async function handleLoginClick() {
    try {
      await login()
      console.log('redirect to dashboard')
    } catch (error) {
      console.log('login failed', error)
    }
  }

  async function handleLogoutClick() {
    try {
      await logout()
      console.log('redirect to login page')
    } catch (error) {
      console.log('logout failed', error)
    }
  }

  return (
    <div>
      <h1>Login Page</h1>
      <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>
      <button onClick={handleLoginClick}>Login</button>&nbsp;|&nbsp;
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  )
}
