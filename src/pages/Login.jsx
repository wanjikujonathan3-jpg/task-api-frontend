import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../api'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await API.post('/auth/login/', { username, password })
      localStorage.setItem('token', response.data.access)
      navigate('/tasks')
    } catch (err) {
      setError('Invalid username or password')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Task Manager</h2>
        <p style={styles.subtitle}>Sign in to your account</p>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              style={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button style={styles.button} type="submit">
            Sign In
          </button>
        </form>
        <p style={styles.link}>
          Don't have an account?{' '}
          <Link to="/register" style={styles.linkText}>Register</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' },
  card: { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
  title: { margin: '0 0 0.5rem', fontSize: '24px', fontWeight: '600' },
  subtitle: { margin: '0 0 1.5rem', color: '#666' },
  error: { color: 'red', marginBottom: '1rem', fontSize: '14px' },
  field: { marginBottom: '1rem' },
  label: { display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: '500' },
  input: { width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '0.75rem', backgroundColor: '#4F46E5', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', marginTop: '0.5rem' },
  link: { textAlign: 'center', marginTop: '1rem', fontSize: '14px', color: '#666' },
  linkText: { color: '#4F46E5', textDecoration: 'none' },
}

export default Login