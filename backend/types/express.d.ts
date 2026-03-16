import 'express'
import type { UserType } from '@flowfox/shared'

declare module 'express' {
  interface Request {
    user?: Omit<UserType, 'password'>
  }
}
