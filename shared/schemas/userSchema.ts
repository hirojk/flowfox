import { z } from 'zod'
import { ROLE_VALUES } from '../constants/roles.js'

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  name: z.string(),
  email: z.email().optional().default(''),
  password: z.string(),
  role: z.enum(ROLE_VALUES).default('user'),
})

export type UserType = z.infer<typeof UserSchema>
