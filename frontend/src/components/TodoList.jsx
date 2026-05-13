import TodoItem from './TodoItem'

export default function TodoList({
  filteredTodos,
  filter,
  activeCount,
  completedCount,
  editingId,
  editText,
  editRef,
  onToggle,
  onStartEdit,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) {
  if (filteredTodos.length === 0) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body items-center py-12 text-base-content/40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-3 opacity-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="font-medium">
            {filter === 'All'
              ? 'No tasks yet — add one above!'
              : filter === 'Active'
              ? 'Nothing left to do 🎉'
              : 'No completed tasks yet'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {filteredTodos.map((todo, idx) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          delay={idx * 40}
          isEditing={editingId === todo.id}
          editText={editText}
          ref={editingId === todo.id ? editRef : null}
          onToggle={onToggle}
          onStartEdit={onStartEdit}
          onEditChange={onEditChange}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
