import { useEffect, useState } from 'react'
import { getCurrentUser } from '../api/api'

export default function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('user')
    if (!raw) return
    const parsed = JSON.parse(raw)
    if (!parsed || !parsed.email) return
    getCurrentUser(parsed.email)
      .then((u) => setUser(u))
      .catch((err) => console.error('fetch profile', err))
  }, [])

  return (
    <section>
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>ID: {user.id}</p>
        </div>
      ) : (
        <p>Not signed in</p>
      )}
    </section>
  )
}
