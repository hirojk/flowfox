import dotenv from 'dotenv'
import path from 'path'

const requiredEnvVars = ['ADMIN_USER', 'ADMIN_PASS', 'ACCESS_TOKEN_SECRET', 'MONGODB_URI', 'NODE_ENV']

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
  quiet: true,
})

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
})
