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
    <section>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Create account</button>
      </form>
    </section>
  )
}
