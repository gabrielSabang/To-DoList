import { forwardRef } from 'react'

const TodoItem = forwardRef(
  (
    {
      todo,
      delay,
      isEditing,
      editText,
      onToggle,
      onStartEdit,
      onEditChange,
      onSaveEdit,
      onCancelEdit,
      onDelete,
    },
    ref,
  ) => (
    <div
      className={`card bg-base-100 shadow-sm transition-all duration-200 hover:shadow-md group ${
        todo.completed ? 'opacity-60' : ''
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="card-body p-4 flex-row items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="checkbox checkbox-primary flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              ref={ref}
              type="text"
              className="input input-bordered input-sm w-full focus:input-primary"
              value={editText}
              onChange={onEditChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSaveEdit()
                if (e.key === 'Escape') onCancelEdit()
              }}
              onBlur={onSaveEdit}
            />
          ) : (
            <span
              className={`block truncate cursor-pointer text-base-content transition-all ${
                todo.completed ? 'line-through text-base-content/40' : ''
              }`}
              onDoubleClick={() => !todo.completed && onStartEdit(todo)}
              title="Double-click to edit"
            >
              {todo.text}
            </span>
          )}
        </div>

        {isEditing ? (
          <div className="flex gap-1 flex-shrink-0">
            <button className="btn btn-ghost btn-xs btn-square text-success" onClick={onSaveEdit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
            <button className="btn btn-ghost btn-xs btn-square text-error" onClick={onCancelEdit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity todo-actions">
            {!todo.completed && (
              <button
                className="btn btn-ghost btn-xs btn-square text-base-content/50 hover:text-primary"
                onClick={() => onStartEdit(todo)}
                title="Edit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            )}
            <button
              className="btn btn-ghost btn-xs btn-square text-base-content/50 hover:text-error"
              onClick={() => onDelete(todo.id)}
              title="Delete"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  ),
)

export default TodoItem
