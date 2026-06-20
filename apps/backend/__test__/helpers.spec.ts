import { describe, it, expect } from 'vitest'

import { renameUserToLowercase } from '../utils/helpers.js'

describe('renameUserToLowercase', () => {
  it('converts uppercase to lowercase', () => {
    expect(renameUserToLowercase('ADMIN')).toBe('admin')
  })

  it('leaves lowercase unchanged', () => {
    expect(renameUserToLowercase('jan')).toBe('jan')
  })

  it('handles mixed case', () => {
    expect(renameUserToLowercase('JanKolar')).toBe('jankolar')
  })
})
