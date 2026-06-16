import { describe, it, expect } from 'vitest'

import { PRIORITY_LIST } from '@constants/priority'
import { getIcon } from '@utils/helpers'

describe('getIcon', () => {
  it('returns the icon for a known name', () => {
    expect(getIcon(PRIORITY_LIST, 'High')).toBe('icon-high')
  })

  it('returns the iconName as fallback when not found', () => {
    expect(getIcon(PRIORITY_LIST, 'unknown')).toBe('unknown')
  })
})
