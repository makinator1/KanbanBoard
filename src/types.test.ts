import { describe, it, expect } from 'vitest'
import { COLUMNS } from './types'

describe('COLUMNS', () => {
  it('has correct keys and labels', () => {
    expect(COLUMNS).toEqual([
      { key: 'backlog', label: 'Backlog' },
      { key: 'in-process', label: 'In Process' },
      { key: 'finished', label: 'Finished' },
    ])
  })
})
