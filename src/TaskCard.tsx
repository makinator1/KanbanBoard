import type { DragEvent } from 'react'
import type { Task } from './types'
import './TaskCard.css'

interface TaskCardProps {
  task: Task
  onDelete: (taskId: number) => void
  onMoveLeft: (task: Task) => void
  onMoveRight: (task: Task) => void
  onDragStart: (e: DragEvent, taskId: number) => void
}

function TaskCard({ task, onDelete, onMoveLeft, onMoveRight, onDragStart }: TaskCardProps) {
  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <div className="task-card-header">
        <span className="task-title">{task.title}</span>
        <button
          className="task-delete"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          &times;
        </button>
      </div>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      <div className="task-actions">
        <button
          className="move-button"
          onClick={() => onMoveLeft(task)}
          disabled={task.column === 'backlog'}
          title="Move left"
        >
          &larr;
        </button>
        <button
          className="move-button"
          onClick={() => onMoveRight(task)}
          disabled={task.column === 'finished'}
          title="Move right"
        >
          &rarr;
        </button>
      </div>
    </div>
  )
}

export default TaskCard
