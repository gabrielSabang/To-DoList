import { forwardRef } from 'react'

const TodoInput = forwardRef(
  ({ value, onChange, onAdd, onToggleAll, showToggleAll, allCompleted }, ref) => (
    <div className="flex gap-2">
      {showToggleAll && (
        <button
          className="btn btn-ghost btn-square btn-sm self-center tooltip tooltip-right"
          data-tip={allCompleted ? 'Uncheck all' : 'Check all'}
          onClick={onToggleAll}
        >
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
      )}

      <input
        ref={ref}
        type="text"
        placeholder="What needs to be done?"
        className="input input-bordered flex-1 focus:input-primary transition-all"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && onAdd()}
      />

      <button className="btn btn-primary" onClick={onAdd} disabled={!value.trim()}>
        Add
      </button>
    </div>
  ),
)

export default TodoInput
