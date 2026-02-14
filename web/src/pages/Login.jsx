import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/api'
import { setStoredUser } from '../auth/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    login(email, password)
      .then((user) => {
        setStoredUser(user)
        navigate('/dashboard')
      })
      .catch((err) => {
        console.error('Login failed', err)
        alert('Login failed')
      })
  }

  return (
    <section className="page">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign in</button>
      </form>
    </section>
  )
}
