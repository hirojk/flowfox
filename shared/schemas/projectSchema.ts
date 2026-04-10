import { z } from 'zod'
import { BoardSchema } from './boardSchema.js'

export const ComponentSchema = z.discriminatedUnion('type', [BoardSchema])

export const ProjectSchema = z.object({
  id: z.number(),
  name: z.string().default('New Project'),
  creatorId: z.number(),
  components: z.array(ComponentSchema).default([]),
})

export type ComponentType = z.infer<typeof ComponentSchema>
export type ProjectType = z.infer<typeof ProjectSchema>
