import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/auth'

export default function Nav() {
  const authed = isAuthenticated()

  return (
    <nav className="top-nav">
      <div className="nav-left">
        <Link to="/">Home</Link>
      </div>
      <div className="nav-right">
        {!authed && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {authed && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
          </>
        )}
      </div>
    </nav>
  )
}
