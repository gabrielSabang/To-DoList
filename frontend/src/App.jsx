import './App.css'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import Filters from './components/Filters'
import TodoList from './components/TodoList'
import ErrorBanner from './components/ErrorBanner'
import { useTodos } from './hooks/useTodos'

export default function App() {
  const {
    // State
    todos,
    loading,
    error,
    input,
    filter,
    theme,
    editingId,
    editText,
    filteredTodos,
    activeCount,
    completedCount,
    // Refs
    inputRef,
    editRef,
    // Handlers
    setInput,
    setFilter,
    setTheme,
    addTodo,
    toggleTodo,
    deleteTodoItem,
    startEdit,
    saveEdit,
    cancelEdit,
    clearCompleted,
    toggleAll,
  } = useTodos()

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
