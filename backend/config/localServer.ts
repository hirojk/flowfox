import { connectToDatabase } from './database'
import { Application } from 'express'

const PORT: string | number = process.env.PORT || 5000

export async function startlocalServer(app: Application) {
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging') {
    connectToDatabase()
      .then(() => {
        app.listen(PORT, () => {
          console.log(`\nServer running on port ${PORT}\n`)
          console.log('------------------------------------------------\n')
        })
      })
      .catch((error) => {
        console.error('Failed to start server:', error)
        console.log('------------------------------------------------\n')
        process.exit(1)
      })
  }
}
