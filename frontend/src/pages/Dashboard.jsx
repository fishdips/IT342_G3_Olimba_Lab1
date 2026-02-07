import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStoredUser, clearStoredUser } from '../auth/auth'

export default function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    const u = getStoredUser()
    if (!u) navigate('/login')
  }, [])

  function logout() {
    clearStoredUser()
    navigate('/login')
  }

  return (
    <section>
      <h2>Dashboard</h2>
      <p>This is a placeholder dashboard. Add widgets or data here.</p>
      <div>
        <button onClick={() => navigate('/profile')}>Go to profile</button>
        <button onClick={logout}>Logout</button>
      </div>
    </section>
  )
}
