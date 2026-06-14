import { type PriorityType } from '@pagewise/shared'
import { MODAL_WINDOWS } from '@constants/windows'

export interface IconType {
  name: string
  icon: string
}

export interface PriorityIconType extends IconType {
  name: PriorityType
}

export type ModalUIType = (typeof MODAL_WINDOWS)[number]

export interface DropdownItem {
  name: string
  action: () => void
}
