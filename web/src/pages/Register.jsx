import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../api/api'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    register({ email, password, fullName })
      .then((res) => {
        console.log('registered', res)
        alert('Account created')
        navigate('/login')
      })
      .catch((err) => {
        console.error('Register failed', err)
        alert('Register failed')
      })
  }

  return (
    <section className="page">
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
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
            minLength={6}
            required
          />
        </div>
        <button type="submit">Create account</button>
      </form>
    </section>
  )
}
