import { describe, it, expect } from 'vitest'

import { ProjectSchema } from '../schemas/projectSchema.js'

describe('ProjectSchema', () => {
  it('parses a valid project with defaults', () => {
    const result = ProjectSchema.parse({ id: 1, creatorId: 42, name: 'My Project' })
    expect(result.components).toEqual([])
  })

  it('fails without required fields', () => {
    expect(() => ProjectSchema.parse({ name: 'Missing id and creatorId' })).toThrow()
  })
})
