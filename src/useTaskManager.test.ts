import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTaskManager } from './useTaskManager'

describe('useTaskManager', () => {
  it('createTask adds a task to backlog with correct id', () => {
    const { result } = renderHook(() => useTaskManager())

    act(() => {
      result.current.createTask('Test Task', 'A description')
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0]).toEqual({
      id: 1,
      title: 'Test Task',
      description: 'A description',
      column: 'backlog',
    })
  })

  it('createTask auto-increments ids', () => {
    const { result } = renderHook(() => useTaskManager())

    act(() => {
      result.current.createTask('First', '')
    })
    act(() => {
      result.current.createTask('Second', '')
    })

    expect(result.current.tasks[0].id).toBe(1)
    expect(result.current.tasks[1].id).toBe(2)
  })

  it('moveTask changes task column', () => {
    const { result } = renderHook(() => useTaskManager())

    act(() => {
      result.current.createTask('Task', '')
    })
    act(() => {
      result.current.moveTask(1, 'in-process')
    })

    expect(result.current.tasks[0].column).toBe('in-process')
  })

  it('moveLeft moves task to previous column', () => {
    const { result } = renderHook(() => useTaskManager())

    act(() => {
      result.current.createTask('Task', '')
    })
    act(() => {
      result.current.moveTask(1, 'in-process')
    })
    act(() => {
      result.current.moveLeft(result.current.tasks[0])
    })

    expect(result.current.tasks[0].column).toBe('backlog')
  })

  it('moveLeft does nothing when already in backlog', () => {
    const { result } = renderHook(() => useTaskManager())

    act(() => {
      result.current.createTask('Task', '')
    })
    act(() => {
      result.current.moveLeft(result.current.tasks[0])
    })

    expect(result.current.tasks[0].column).toBe('backlog')
  })

  it('moveRight moves task to next column', () => {
    const { result } = renderHook(() => useTaskManager())

    act(() => {
      result.current.createTask('Task', '')
    })
    act(() => {
      result.current.moveRight(result.current.tasks[0])
    })

    expect(result.current.tasks[0].column).toBe('in-process')
  })

  it('moveRight does nothing when already in finished', () => {
    const { result } = renderHook(() => useTaskManager())

    act(() => {
      result.current.createTask('Task', '')
    })
    act(() => {
      result.current.moveTask(1, 'finished')
    })
    act(() => {
      result.current.moveRight(result.current.tasks[0])
    })

    expect(result.current.tasks[0].column).toBe('finished')
  })

  it('deleteTask removes the task', () => {
    const { result } = renderHook(() => useTaskManager())

    act(() => {
      result.current.createTask('Task', '')
    })
    act(() => {
      result.current.deleteTask(1)
    })

    expect(result.current.tasks).toHaveLength(0)
  })
})
