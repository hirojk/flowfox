import type { IconType } from '@typeDefs/globalTypes'
import { PRIORITY_VALUES, type BoardCardType } from '@flowfox/shared'

export const PRIORITY_LIST: IconType[] = [
  { name: 'Critical', icon: 'icon-critical' },
  { name: 'High', icon: 'icon-high' },
  { name: 'Medium', icon: 'icon-medium' },
  { name: 'Low', icon: 'icon-low' },
] as const

export const sortedCardsByPriority = (cards: BoardCardType[]): BoardCardType[] => {
  return [...cards].sort((a, b) => {
    const aIdx = PRIORITY_VALUES.indexOf(a.priority ?? 'Medium')
    const bIdx = PRIORITY_VALUES.indexOf(b.priority ?? 'Medium')
    return aIdx - bIdx
  })
}
