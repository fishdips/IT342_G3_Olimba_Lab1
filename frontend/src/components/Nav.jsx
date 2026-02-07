import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, clearStoredUser } from '../auth/auth'

export default function Nav() {
  const navigate = useNavigate()
  const authed = isAuthenticated()

  function logout() {
    clearStoredUser()
    navigate('/login')
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      {' '}-{' '}
      {!authed && <><Link to="/login">Login</Link>{' '}-{' '}<Link to="/register">Register</Link>{' '}-{' '}</>}
      <Link to="/dashboard">Dashboard</Link>
      {' '}-{' '}
      <Link to="/profile">Profile</Link>
      {' '}-{' '}
      {authed && <button onClick={logout}>Logout</button>}
    </nav>
  )
}
