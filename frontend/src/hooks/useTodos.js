import { useState, useRef, useEffect } from 'react'
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../api/todoApi'

export function useTodos() {
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

  return {
    // State
    todos,
    input,
    filter,
    editingId,
    editText,
    theme,
    loading,
    error,
    filteredTodos,
    activeCount,
    completedCount,
    // Refs
    inputRef,
    editRef,
    // Handlers
    setInput,
    setFilter,
    setEditText,
    setTheme,
    addTodo,
    toggleTodo,
    deleteTodoItem,
    startEdit,
    saveEdit,
    cancelEdit,
    clearCompleted,
    toggleAll,
  }
}
