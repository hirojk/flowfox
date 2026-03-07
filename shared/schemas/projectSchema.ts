import { z } from 'zod'
import { BoardSchema } from './boardSchema'

export const ComponentSchema = z.discriminatedUnion('type', [BoardSchema])

export const ProjectSchema = z.object({
  id: z.number(),
  projectName: z.string(),
  creatorId: z.string(),
  components: z.array(ComponentSchema).default([]),
})

export type ComponentType = z.infer<typeof ComponentSchema>
export type ProjectType = z.infer<typeof ProjectSchema>
