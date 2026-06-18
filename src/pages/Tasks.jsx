import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('pending')
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const fetchTasks = async () => {
    try {
      let url = '/tasks/'
      const params = []
      if (search) params.push(`search=${search}`)
      if (filterStatus) params.push(`status=${filterStatus}`)
      if (params.length) url += '?' + params.join('&')
      const response = await API.get(url)
      setTasks(response.data.results)
    } catch (err) {
      if (err.response?.status === 401) navigate('/login')
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [search, filterStatus])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await API.post('/tasks/', { title, description, status })
      setTitle('')
      setDescription('')
      setStatus('pending')
      setError('')
      fetchTasks()
    } catch (err) {
      setError(err.response?.data?.message?.title?.[0] || 'Failed to create task')
    }
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}/`)
      fetchTasks()
    } catch (err) {
      console.error(err)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.patch(`/tasks/${id}/`, { status: newStatus })
      fetchTasks()
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Tasks</h1>
        <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Add New Task</h3>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleCreate}>
          <input
            style={styles.input}
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            style={styles.input}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button style={styles.button} type="submit">Add Task</button>
        </form>
      </div>

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Filter & Search</h3>
        <input
          style={styles.input}
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          style={styles.input}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div style={styles.taskList}>
        {tasks.length === 0 ? (
          <p style={styles.empty}>No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} style={styles.taskCard}>
              <div style={styles.taskTop}>
                <h4 style={styles.taskTitle}>{task.title}</h4>
                <span style={{
                  ...styles.badge,
                  backgroundColor: task.status === 'completed' ? '#d1fae5' : task.status === 'in_progress' ? '#dbeafe' : '#fef9c3',
                  color: task.status === 'completed' ? '#065f46' : task.status === 'in_progress' ? '#1e40af' : '#854d0e',
                }}>
                  {task.status.replace('_', ' ')}
                </span>
              </div>
              {task.description && <p style={styles.taskDesc}>{task.description}</p>}
              <div style={styles.taskActions}>
                <select
                  style={styles.smallSelect}
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
  title: { fontSize: '28px', fontWeight: '700', margin: 0 },
  logoutBtn: { padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  card: { backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', marginBottom: '1.5rem' },
  sectionTitle: { margin: '0 0 1rem', fontSize: '16px', fontWeight: '600' },
  error: { color: 'red', fontSize: '14px', marginBottom: '0.5rem' },
  input: { width: '100%', padding: '0.65rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', marginBottom: '0.75rem' },
  button: { width: '100%', padding: '0.75rem', backgroundColor: '#4F46E5', color: 'white', border: 'none', borderRadius: '4px', fontSize: '15px', cursor: 'pointer' },
  taskList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  taskCard: { backgroundColor: 'white', padding: '1rem 1.25rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' },
  taskTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' },
  taskTitle: { margin: 0, fontSize: '16px', fontWeight: '600' },
  badge: { fontSize: '12px', padding: '2px 10px', borderRadius: '20px', fontWeight: '500' },
  taskDesc: { fontSize: '14px', color: '#555', margin: '0 0 0.75rem' },
  taskActions: { display: 'flex', gap: '0.5rem', alignItems: 'center' },
  smallSelect: { padding: '0.4rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', cursor: 'pointer' },
  deleteBtn: { padding: '0.4rem 0.75rem', backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', fontSize: '13px', cursor: 'pointer' },
  empty: { textAlign: 'center', color: '#999', padding: '2rem' },
}

export default Tasks
