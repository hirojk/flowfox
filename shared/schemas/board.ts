import { z } from 'zod'

export const CheckboxItemSchema = z.object({
  isChecked: z.boolean().default(false),
  label: z.string(),
})

export const BoardTagSchema = z.object({
  label: z.string(),
  color: z.string(),
})

export const BoardCardSchema = z.object({
  id: z.number(),
  taskName: z.string(),
  priority: z.enum(['Low', 'Medium', 'High']).default('Medium'),
  description: z.string().default(''),
  checklist: z.array(CheckboxItemSchema).default([]),
  startDate: z.coerce.date(),
  deadline: z.coerce.date(),
  tags: z.array(BoardTagSchema).default([]),
})

export const BoardColumnSchema = z.object({
  id: z.number(),
  columnName: z.string(),
  cards: z.array(BoardCardSchema).default([]),
})

export const ProjectSchema = z.object({
  projectName: z.string(),
  userId: z.string(),
  columns: z.array(BoardColumnSchema).default([]),
})

export type CheckboxItemType = z.infer<typeof CheckboxItemSchema>
export type BoardTagType = z.infer<typeof BoardTagSchema>
export type BoardCardType = z.infer<typeof BoardCardSchema>
export type BoardColumnType = z.infer<typeof BoardColumnSchema>
export type ProjectType = z.infer<typeof ProjectSchema>
