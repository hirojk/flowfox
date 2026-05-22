export const PRIORITY_VALUES = ['Critical', 'High', 'Medium', 'Low'] as const
export const DEFAULT_PRIORITY: PriorityType = 'Medium'

export type PriorityType = (typeof PRIORITY_VALUES)[number]
