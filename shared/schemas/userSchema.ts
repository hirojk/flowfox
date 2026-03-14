import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  fullName: z.string(),
})

export type UserType = z.infer<typeof UserSchema>
