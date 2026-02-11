import { useState } from 'react'
import { COLUMNS, type Column, type Task } from './types'

export function useTaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [nextId, setNextId] = useState(1)

  const createTask = (title: string, description: string) => {
    setTasks((prev) => [
      ...prev,
      { id: nextId, title, description, column: 'backlog' },
    ])
    setNextId((n) => n + 1)
  }

  const moveTask = (taskId: number, toColumn: Column) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, column: toColumn } : t))
    )
  }

  const moveLeft = (task: Task) => {
    const idx = COLUMNS.findIndex((c) => c.key === task.column)
    if (idx > 0) moveTask(task.id, COLUMNS[idx - 1].key)
  }

  const moveRight = (task: Task) => {
    const idx = COLUMNS.findIndex((c) => c.key === task.column)
    if (idx < COLUMNS.length - 1) moveTask(task.id, COLUMNS[idx + 1].key)
  }

  const deleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }

  return { tasks, createTask, moveTask, moveLeft, moveRight, deleteTask }
}
