import 'express'
import type { UserType } from '@pagewise/shared'

declare module 'express' {
  interface Request {
    user?: Omit<UserType, 'password'>
  }
}
