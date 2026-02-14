import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../api/api'

export default function Profile() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const raw = localStorage.getItem('user')
    if (!raw) {
      navigate('/login')
      return
    }
    const parsed = JSON.parse(raw)
    if (!parsed || !parsed.email) {
      navigate('/login')
      return
    }
    getCurrentUser(parsed.email)
      .then((u) => setUser(u))
      .catch((err) => console.error('fetch profile', err))
  }, [navigate])

  return (
    <section className="page">
      <div className="page-header">
        <h2>Profile</h2>
        <button className="ghost" onClick={() => navigate('/dashboard')}>Back to dashboard</button>
      </div>
      {user ? (
        <div className="card">
          <p><strong>Full name:</strong> {user.fullName || 'N/A'}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID:</strong> {user.id}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </section>
  )
}
