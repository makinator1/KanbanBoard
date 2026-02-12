import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskCard from './TaskCard'
import type { Task } from './types'

describe('TaskCard', () => {
  const baseTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test description',
    column: 'in-process',
  }

  const defaultProps = {
    task: baseTask,
    onDelete: vi.fn(),
    onMoveLeft: vi.fn(),
    onMoveRight: vi.fn(),
    onDragStart: vi.fn(),
  }

  it('renders task title and description', () => {
    render(<TaskCard {...defaultProps} />)

    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('hides description when empty', () => {
    const task = { ...baseTask, description: '' }
    render(<TaskCard {...defaultProps} task={task} />)

    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.queryByText('Test description')).not.toBeInTheDocument()
  })

  it('disables move-left in backlog column', () => {
    const task = { ...baseTask, column: 'backlog' as const }
    render(<TaskCard {...defaultProps} task={task} />)

    expect(screen.getByTitle('Move left')).toBeDisabled()
  })

  it('disables move-right in finished column', () => {
    const task = { ...baseTask, column: 'finished' as const }
    render(<TaskCard {...defaultProps} task={task} />)

    expect(screen.getByTitle('Move right')).toBeDisabled()
  })

  it('calls onDelete when delete button clicked', async () => {
    const onDelete = vi.fn()
    const user = userEvent.setup()
    render(<TaskCard {...defaultProps} onDelete={onDelete} />)

    await user.click(screen.getByTitle('Delete task'))

    expect(onDelete).toHaveBeenCalledWith(1)
  })

  it('calls onMoveLeft when left button clicked', async () => {
    const onMoveLeft = vi.fn()
    const user = userEvent.setup()
    render(<TaskCard {...defaultProps} onMoveLeft={onMoveLeft} />)

    await user.click(screen.getByTitle('Move left'))

    expect(onMoveLeft).toHaveBeenCalledWith(baseTask)
  })

  it('calls onMoveRight when right button clicked', async () => {
    const onMoveRight = vi.fn()
    const user = userEvent.setup()
    render(<TaskCard {...defaultProps} onMoveRight={onMoveRight} />)

    await user.click(screen.getByTitle('Move right'))

    expect(onMoveRight).toHaveBeenCalledWith(baseTask)
  })
})
