import { useState, useRef, useEffect } from 'react'

const FILTERS = ['All', 'Active', 'Completed']

const SAMPLE_TODOS = [
  { id: 1, text: 'Buy groceries 🛒', completed: false, createdAt: Date.now() - 3000 },
  { id: 2, text: 'Finish project report', completed: true, createdAt: Date.now() - 2000 },
  { id: 3, text: 'Call mom 📞', completed: false, createdAt: Date.now() - 1000 },
]

export default function App() {
  const [todos, setTodos] = useState(SAMPLE_TODOS)
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('All')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [theme, setTheme] = useState('light')
  const inputRef = useRef(null)
  const editRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (editingId !== null && editRef.current) {
      editRef.current.focus()
    }
  }, [editingId])

  const addTodo = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setTodos(prev => [...prev, { id: Date.now(), text: trimmed, completed: false, createdAt: Date.now() }])
    setInput('')
    inputRef.current?.focus()
  }

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const saveEdit = () => {
    const trimmed = editText.trim()
    if (!trimmed) return
    setTodos(prev => prev.map(t => t.id === editingId ? { ...t, text: trimmed } : t))
    setEditingId(null)
    setEditText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  const toggleAll = () => {
    const allDone = todos.every(t => t.completed)
    setTodos(prev => prev.map(t => ({ ...t, completed: !allDone })))
  }

  const filtered = todos.filter(t => {
    if (filter === 'Active') return !t.completed
    if (filter === 'Completed') return t.completed
    return true
  })

  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center py-12 px-4 transition-colors duration-300">

      {/* Header */}
      <div className="w-full max-w-lg mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-base-content">
              my tasks
            </h1>
            <p className="text-base-content/50 text-sm mt-0.5 font-mono">
              {activeCount} remaining · {completedCount} done
            </p>
          </div>
          <label className="swap swap-rotate btn btn-ghost btn-circle">
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            />
            {/* sun */}
            <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7,5,6.36a1,1,0,0,0-1.41,1.41L4.23,8.4A1,1,0,0,0,5.64,7Zm12,.71.71-.71A1,1,0,0,0,16.93,5.64l-.71.71A1,1,0,0,0,17.66,7.66ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
            </svg>
            {/* moon */}
            <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
            </svg>
          </label>
        </div>

        {/* Progress bar */}
        {todos.length > 0 && (
          <div className="mt-3">
            <progress
              className="progress progress-primary w-full h-2 transition-all duration-500"
              value={completedCount}
              max={todos.length}
            />
          </div>
        )}
      </div>

      {/* Input card */}
      <div className="card bg-base-100 shadow-xl w-full max-w-lg mb-4">
        <div className="card-body p-4">
          <div className="flex gap-2">
            {todos.length > 0 && (
              <button
                className="btn btn-ghost btn-square btn-sm self-center tooltip tooltip-right"
                data-tip={todos.every(t => t.completed) ? "Uncheck all" : "Check all"}
                onClick={toggleAll}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            )}
            <input
              ref={inputRef}
              type="text"
              placeholder="What needs to be done?"
              className="input input-bordered flex-1 focus:input-primary transition-all"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTodo()}
            />
            <button
              className="btn btn-primary"
              onClick={addTodo}
              disabled={!input.trim()}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="tabs tabs-boxed bg-base-100 shadow w-full max-w-lg mb-4">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`tab flex-1 transition-all ${filter === f ? 'tab-active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
            {f === 'Active' && activeCount > 0 && (
              <span className="badge badge-sm badge-primary ml-1.5">{activeCount}</span>
            )}
            {f === 'Completed' && completedCount > 0 && (
              <span className="badge badge-sm badge-ghost ml-1.5">{completedCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Todo list */}
      <div className="w-full max-w-lg">
        {filtered.length === 0 ? (
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body items-center py-12 text-base-content/40">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="font-medium">
                {filter === 'All' ? 'No tasks yet — add one above!' :
                 filter === 'Active' ? 'Nothing left to do 🎉' :
                 'No completed tasks yet'}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((todo, idx) => (
              <div
                key={todo.id}
                className={`card bg-base-100 shadow-sm transition-all duration-200 hover:shadow-md ${
                  todo.completed ? 'opacity-60' : ''
                }`}
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div className="card-body p-4 flex-row items-center gap-3">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="checkbox checkbox-primary flex-shrink-0"
                  />

                  {/* Text or edit input */}
                  <div className="flex-1 min-w-0">
                    {editingId === todo.id ? (
                      <input
                        ref={editRef}
                        type="text"
                        className="input input-bordered input-sm w-full focus:input-primary"
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') saveEdit()
                          if (e.key === 'Escape') cancelEdit()
                        }}
                        onBlur={saveEdit}
                      />
                    ) : (
                      <span
                        className={`block truncate cursor-pointer text-base-content transition-all ${
                          todo.completed ? 'line-through text-base-content/40' : ''
                        }`}
                        onDoubleClick={() => !todo.completed && startEdit(todo)}
                        title="Double-click to edit"
                      >
                        {todo.text}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  {editingId === todo.id ? (
                    <div className="flex gap-1 flex-shrink-0">
                      <button className="btn btn-ghost btn-xs btn-square text-success" onClick={saveEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button className="btn btn-ghost btn-xs btn-square text-error" onClick={cancelEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity todo-actions">
                      {!todo.completed && (
                        <button
                          className="btn btn-ghost btn-xs btn-square text-base-content/50 hover:text-primary"
                          onClick={() => startEdit(todo)}
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      )}
                      <button
                        className="btn btn-ghost btn-xs btn-square text-base-content/50 hover:text-error"
                        onClick={() => deleteTodo(todo.id)}
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer actions */}
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

      {/* Hint */}
      <p className="text-base-content/25 text-xs mt-8 font-mono">
        double-click to edit · enter to save · esc to cancel
      </p>

      <style>{`
        .card:hover .todo-actions {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  )
}