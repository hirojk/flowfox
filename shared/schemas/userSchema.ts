import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  name: z.string(),
  email: z.email().optional().default(''),
})

export type UserType = z.infer<typeof UserSchema>
