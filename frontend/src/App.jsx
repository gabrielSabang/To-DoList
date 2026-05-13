import { useState, useRef, useEffect } from 'react'
import './App.css'
import { FILTERS } from './constants'
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todoApi'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import Filters from './components/Filters'
import TodoList from './components/TodoList'
import ErrorBanner from './components/ErrorBanner'

export default function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('All')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [theme, setTheme] = useState('light')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)
  const editRef = useRef(null)

  useEffect(() => {
    const loadTodos = async () => {
      setError(null)

      try {
        const data = await fetchTodos()
        setTodos(data)
      } catch (err) {
        console.error(err)
        setError('Unable to load tasks from the backend.')
      } finally {
        setLoading(false)
      }
    }

    loadTodos()
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (editingId !== null && editRef.current) {
      editRef.current.focus()
    }
  }, [editingId])

  const handleApiError = (message, err) => {
    console.error(message, err)
    setError(message)
  }

  const addTodo = async () => {
    const trimmed = input.trim()
    if (!trimmed) return

    setInput('')
    inputRef.current?.focus()

    try {
      const newTodo = await createTodo(trimmed)
      setTodos((prev) => [...prev, newTodo])
    } catch (err) {
      handleApiError('Unable to add task.', err)
    }
  }

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id)
    if (!todo) return

    try {
      const updated = await updateTodo(id, { completed: !todo.completed })
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: updated.completed } : t)))
    } catch (err) {
      handleApiError('Unable to update task status.', err)
    }
  }

  const deleteTodoItem = async (id) => {
    try {
      await deleteTodo(id)
      setTodos((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      handleApiError('Unable to delete task.', err)
    }
  }

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const saveEdit = async () => {
    const trimmed = editText.trim()
    if (!trimmed || editingId === null) return

    try {
      const updated = await updateTodo(editingId, { text: trimmed })
      setTodos((prev) => prev.map((t) => (t.id === editingId ? { ...t, text: updated.text } : t)))
      setEditingId(null)
      setEditText('')
    } catch (err) {
      handleApiError('Unable to save task edit.', err)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const clearCompleted = async () => {
    const completedTasks = todos.filter((t) => t.completed)
    if (completedTasks.length === 0) return

    try {
      await Promise.all(completedTasks.map((task) => deleteTodo(task.id)))
      setTodos((prev) => prev.filter((t) => !t.completed))
    } catch (err) {
      handleApiError('Unable to clear completed tasks.', err)
    }
  }

  const toggleAll = async () => {
    const allDone = todos.every((t) => t.completed)

    try {
      await Promise.all(todos.map((t) => updateTodo(t.id, { completed: !allDone })))
      setTodos((prev) => prev.map((t) => ({ ...t, completed: !allDone })))
    } catch (err) {
      handleApiError('Unable to update all tasks.', err)
    }
  }

  const filteredTodos = todos.filter((t) => {
    if (filter === 'Active') return !t.completed
    if (filter === 'Completed') return t.completed
    return true
  })

  const activeCount = todos.filter((t) => !t.completed).length
  const completedCount = todos.filter((t) => t.completed).length

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center text-lg font-medium">Loading tasks...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center py-12 px-4 transition-colors duration-300">
      <div className="w-full max-w-lg mb-8">
        <Header
          activeCount={activeCount}
          completedCount={completedCount}
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
          todoCount={todos.length}
        />
      </div>

      <ErrorBanner message={error} />

      <div className="card bg-base-100 shadow-xl w-full max-w-lg mb-4">
        <div className="card-body p-4">
          <TodoInput
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onAdd={addTodo}
            onToggleAll={toggleAll}
            showToggleAll={todos.length > 0}
            allCompleted={todos.every((t) => t.completed)}
          />
        </div>
      </div>

      <Filters
        filter={filter}
        onSetFilter={setFilter}
        activeCount={activeCount}
        completedCount={completedCount}
      />

      <div className="w-full max-w-lg">
        <TodoList
          filteredTodos={filteredTodos}
          filter={filter}
          activeCount={activeCount}
          completedCount={completedCount}
          editingId={editingId}
          editText={editText}
          editRef={editRef}
          onToggle={toggleTodo}
          onStartEdit={startEdit}
          onEditChange={(e) => setEditText(e.target.value)}
          onSaveEdit={saveEdit}
          onCancelEdit={cancelEdit}
          onDelete={deleteTodoItem}
        />

        {completedCount > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              className="btn btn-ghost btn-sm text-error/70 hover:text-error hover:bg-error/10"
              onClick={clearCompleted}
            >
              Clear {completedCount} completed
            </button>
          </div>
        )}
      </div>

      <p className="text-base-content/25 text-xs mt-8 font-mono">
        double-click to edit · enter to save · esc to cancel
      </p>
    </div>
  )
}
