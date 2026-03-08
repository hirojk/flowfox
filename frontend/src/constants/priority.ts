import type { BoardCardType } from '@shared/schemas/boardSchema'
import type { IconType } from '@typeDefs/global.ts'
import { PRIORITY_VALUES, type PriorityName } from '@shared/constants/priority'

export interface PriorityIconType extends IconType {
  name: PriorityName
}

export const PRIORITY_LIST: IconType[] = [
  { name: 'Critical', icon: 'icon-critical' },
  { name: 'High', icon: 'icon-high' },
  { name: 'Medium', icon: '' },
  { name: 'Low', icon: 'icon-low' },
] as const

export { PRIORITY_VALUES, type PriorityName } from '@shared/constants/priority'

export const sortedCardsByPriority = (cards: BoardCardType[]): BoardCardType[] => {
  return [...cards].sort((a, b) => {
    const aIdx = PRIORITY_VALUES.indexOf(a.priority ?? 'Medium')
    const bIdx = PRIORITY_VALUES.indexOf(b.priority ?? 'Medium')
    return aIdx - bIdx
  })
}
