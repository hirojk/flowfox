import { connectToDatabase, dbState } from './database'
import { Application } from 'express'

export async function startlocalServer(app: Application, PORT: string | number) {
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging') {
    connectToDatabase()
      .then(() => {
        dbState.isDbConnected = true
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
