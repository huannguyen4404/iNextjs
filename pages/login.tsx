import { LoginForm } from '@/components/auth'
import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter()
  const { profile, login, logout } = useAuth({ revalidateOnMount: false })

  async function handleLoginClick() {
    try {
      await login()
      console.log('redirect to dashboard')
      router.push('/about')
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
      <button onClick={() => router.push('/about')}>Go to About</button>
      
      
      <LoginForm />
    </div>
  )
}
