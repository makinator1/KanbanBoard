import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskModal from './TaskModal'

describe('TaskModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onCreateTask: vi.fn(),
  }

  it('renders form fields', () => {
    render(<TaskModal {...defaultProps} />)

    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByText('Create')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('calls onCreateTask with trimmed title and description', async () => {
    const onCreateTask = vi.fn()
    const user = userEvent.setup()
    render(<TaskModal {...defaultProps} onCreateTask={onCreateTask} />)

    await user.type(screen.getByLabelText('Title'), '  My Task  ')
    await user.type(screen.getByLabelText('Description'), '  Some desc  ')
    await user.click(screen.getByText('Create'))

    expect(onCreateTask).toHaveBeenCalledWith('My Task', 'Some desc')
  })

  it('does not submit with empty title', async () => {
    const onCreateTask = vi.fn()
    const user = userEvent.setup()
    render(<TaskModal {...defaultProps} onCreateTask={onCreateTask} />)

    await user.click(screen.getByText('Create'))

    expect(onCreateTask).not.toHaveBeenCalled()
  })

  it('resets form after submission', async () => {
    const user = userEvent.setup()
    render(<TaskModal {...defaultProps} />)

    const titleInput = screen.getByLabelText('Title')
    const descInput = screen.getByLabelText('Description')

    await user.type(titleInput, 'Task')
    await user.type(descInput, 'Desc')
    await user.click(screen.getByText('Create'))

    expect(titleInput).toHaveValue('')
    expect(descInput).toHaveValue('')
  })

  it('calls onClose when clicking outside', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<TaskModal {...defaultProps} onClose={onClose} />)

    const overlay = screen.getByText('New Task').closest('.modal')!.parentElement!
    await user.click(overlay)

    expect(onClose).toHaveBeenCalled()
  })
})
