import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStoredUser, clearStoredUser } from '../auth/auth'

export default function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    const u = getStoredUser()
    if (!u) navigate('/login')
  }, [navigate])

  function logout() {
    clearStoredUser()
    navigate('/login')
  }

  return (
    <section className="page">
      <div className="page-header">
        <h2>Dashboard</h2>
        <button className="ghost" onClick={logout}>Log out</button>
      </div>
      <p>This is a placeholder dashboard. Add widgets or data here.</p>
      <div className="actions">
        <button onClick={() => navigate('/profile')}>Go to profile</button>
      </div>
    </section>
  )
}
