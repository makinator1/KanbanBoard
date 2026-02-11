export type Column = 'backlog' | 'in-process' | 'finished'

export interface Task {
  id: number
  title: string
  description: string
  column: Column
}

export const COLUMNS: { key: Column; label: string }[] = [
  { key: 'backlog', label: 'Backlog' },
  { key: 'in-process', label: 'In Process' },
  { key: 'finished', label: 'Finished' },
]
