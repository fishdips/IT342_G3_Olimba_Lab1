import './App.css'
import Nav from './components/Nav'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import { Routes, Route, Navigate } from 'react-router-dom'
import { isAuthenticated } from './auth/auth'

function RequireAuth({ children }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />
  return children
}

function RedirectIfAuthed({ children }) {
  if (isAuthenticated()) return <Navigate to="/dashboard" replace />
  return children
}

function App() {
  return (
    <div className="app">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <RedirectIfAuthed>
                <Login />
              </RedirectIfAuthed>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectIfAuthed>
                <Register />
              </RedirectIfAuthed>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
