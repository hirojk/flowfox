import type { PRIORITY_LIST } from '@constants/priority'
import type { CheckboxItemType, BoardTagItemType } from '@typeDefs/global'

export interface BoardColumnType {
  id: number
  columnName: string
  cards: BoardCardType[]
}

export interface BoardCardType {
  id: number
  taskName: string
  priority: (typeof PRIORITY_LIST)[number]['name']
  description: string
  checklist: Array<CheckboxItemType>
  startDate: Date
  deadline: Date
  tags: Array<BoardTagItemType>
}
