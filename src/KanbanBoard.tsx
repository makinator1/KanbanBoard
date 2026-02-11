import { useState, type DragEvent } from 'react'
import { COLUMNS, type Column } from './types'
import { useTaskManager } from './useTaskManager'
import TaskCard from './TaskCard'
import TaskModal from './TaskModal'
import './KanbanBoard.css'

interface KanbanBoardProps {
  onLogout: () => void
}

function KanbanBoard({ onLogout }: KanbanBoardProps) {
  const { tasks, createTask, moveTask, moveLeft, moveRight, deleteTask } = useTaskManager()
  const [showModal, setShowModal] = useState(false)
  const [dragOverColumn, setDragOverColumn] = useState<Column | null>(null)

  const handleDragStart = (e: DragEvent, taskId: number) => {
    e.dataTransfer.setData('text/plain', String(taskId))
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: DragEvent, column: Column) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverColumn(column)
  }

  const handleDragLeave = () => {
    setDragOverColumn(null)
  }

  const handleDrop = (e: DragEvent, column: Column) => {
    e.preventDefault()
    setDragOverColumn(null)
    const taskId = Number(e.dataTransfer.getData('text/plain'))
    moveTask(taskId, column)
  }

  return (
    <div className="kanban-container">
      <header className="kanban-header">
        <h1>Kanban Board</h1>
        <div className="kanban-header-actions">
          <button className="new-task-button" onClick={() => setShowModal(true)}>
            + New Task
          </button>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="kanban-columns">
        {COLUMNS.map(({ key, label }) => (
          <div
            key={key}
            className={`kanban-column ${dragOverColumn === key ? 'drag-over' : ''}`}
            onDragOver={(e) => handleDragOver(e, key)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, key)}
          >
            <div className="column-header">
              <h2>{label}</h2>
              <span className="task-count">
                {tasks.filter((t) => t.column === key).length}
              </span>
            </div>
            <div className="column-body">
              {tasks
                .filter((t) => t.column === key)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={deleteTask}
                    onMoveLeft={moveLeft}
                    onMoveRight={moveRight}
                    onDragStart={handleDragStart}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      <TaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreateTask={createTask}
      />
    </div>
  )
}

export default KanbanBoard
