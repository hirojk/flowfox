import { connectToDatabase } from './database.js'
import { Application } from 'express'

const PORT: string | number = process.env.PORT || 5000

export const startLocalServer = async (app: Application): Promise<void> => {
  connectToDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`\nLocal server running on port ${PORT}\n`)
        console.log('------------------------------------------------\n')
      })
    })
    .catch((error) => {
      console.error('Failed to start local server:', error)
      console.log('------------------------------------------------\n')
      process.exit(1)
    })
}
