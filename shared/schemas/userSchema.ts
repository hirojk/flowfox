import { z } from 'zod'
import { ROLE_VALUES } from '../constants/app.js'

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  name: z.string(),
  email: z.email().optional().default(''),
  password: z.string(),
  role: z.enum(ROLE_VALUES).default(ROLE_VALUES.USER),
})

export type UserType = z.infer<typeof UserSchema>
