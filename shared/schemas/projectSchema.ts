import { z } from 'zod'
import { BoardColumnSchema } from './boardSchema'

export const ProjectSchema = z.object({
  id: z.number(),
  projectName: z.string(),
  creatorId: z.string(),
  components: z.array(BoardColumnSchema).default([]),
})

export type ProjectType = z.infer<typeof ProjectSchema>
