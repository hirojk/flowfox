import { loginUser } from '../controllers/userController.js'
import { Router } from 'express'

const router = Router()

router.post('/login', loginUser)

export default router
