import jwt from 'jsonwebtoken'

export const normalizedUsername = (username: string): string => {
  return username.toLowerCase()
}

export const createToken = (payload: object): string => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '7d' })
}
