import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Tasks from './pages/Tasks'

function App() {
  const token = localStorage.getItem('token')

  return (
    <Routes>
      <Route path="/" element={<Navigate to={token ? '/tasks' : '/login'} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  )
}

export default App