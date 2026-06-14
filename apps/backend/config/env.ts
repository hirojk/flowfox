import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const root = path.resolve(__dirname, '../../../')
const requiredEnvVars = ['ADMIN_USER', 'ADMIN_PASS', 'MONGODB_URI', 'APP_ENV']

// base env
dotenv.config({
  path: path.join(root, '.env'),
  quiet: true,
})

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
})
