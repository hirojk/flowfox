import dotenv from 'dotenv'
import path from 'path'

const root = path.resolve(__dirname, '../../')
const requiredEnvVars = ['ADMIN_USER', 'ADMIN_PASS', 'ACCESS_TOKEN_SECRET', 'MONGODB_URI', 'NODE_ENV']

// base env
dotenv.config({
  path: path.join(root, '.env'),
  quiet: true,
})

// local overrides
dotenv.config({
  path: path.join(root, '.env.local'),
  quiet: true,
})

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
})
