import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="page">
      <h2>Welcome</h2>
      <p>Choose an action to continue.</p>
      <div className="actions">
        <Link className="button" to="/login">Log in</Link>
        <Link className="button" to="/register">Register</Link>
      </div>
    </section>
  )
}
