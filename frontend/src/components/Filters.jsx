import { FILTERS } from '../constants'

export default function Filters({ filter, onSetFilter, activeCount, completedCount }) {
  return (
    <div className="tabs tabs-boxed bg-base-100 shadow w-full max-w-lg mb-4">
      {FILTERS.map((item) => (
        <button
          key={item}
          className={`tab flex-1 transition-all ${filter === item ? 'tab-active' : ''}`}
          onClick={() => onSetFilter(item)}
        >
          {item}
          {item === 'Active' && activeCount > 0 && (
            <span className="badge badge-sm badge-primary ml-1.5">{activeCount}</span>
          )}
          {item === 'Completed' && completedCount > 0 && (
            <span className="badge badge-sm badge-ghost ml-1.5">{completedCount}</span>
          )}
        </button>
      ))}
    </div>
  )
}
