import { type PriorityType } from '@flowfox/shared'
import { MODAL_WINDOWS } from '@constants/windows'

export interface IconType {
  name: string
  icon: string
}

export interface PriorityIconType extends IconType {
  name: PriorityType
}

export type ModalWindowType = (typeof MODAL_WINDOWS)[number]
