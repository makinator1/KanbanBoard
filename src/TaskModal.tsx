import { useState } from 'react'
import './TaskModal.css'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateTask: (title: string, description: string) => void
}

function TaskModal({ isOpen, onClose, onCreateTask }: TaskModalProps) {
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')

  if (!isOpen) return null

  const handleCreate = () => {
    if (!newTitle.trim()) return
    onCreateTask(newTitle.trim(), newDescription.trim())
    setNewTitle('')
    setNewDescription('')
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>New Task</h2>
        <div className="form-group">
          <label htmlFor="task-title">Title</label>
          <input
            id="task-title"
            type="text"
            placeholder="Task title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
          />
        </div>
        <div className="form-group">
          <label htmlFor="task-desc">Description</label>
          <textarea
            id="task-desc"
            placeholder="Optional description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            rows={3}
          />
        </div>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="create-button" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskModal
