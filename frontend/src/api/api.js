const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

async function request(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  })
  const text = await res.text()
  try {
    const json = text ? JSON.parse(text) : null
    if (!res.ok) throw { status: res.status, body: json || text }
    return json
  } catch (e) {
    if (e instanceof SyntaxError) {
      if (!res.ok) throw { status: res.status, body: text }
      return text
    }
    throw e
  }
}

export function register(user) {
  return request('/api/auth/register', { method: 'POST', body: JSON.stringify(user) })
}

export function login(email, password) {
  return request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
}

export function getCurrentUser(email) {
  return request(`/api/auth/me?email=${encodeURIComponent(email)}`)
}
