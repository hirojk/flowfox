export const PRIORITY_VALUES = ['Critical', 'High', 'Medium', 'Low'] as const

export type PriorityName = (typeof PRIORITY_VALUES)[number]

export const DEFAULT_PRIORITY: PriorityName = 'Medium'
