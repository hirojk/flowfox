import express from 'express'
import { createUser, getUsers, getUserById } from '../controllers/userController'

const router = express.Router()

router.post('/register', createUser)
router.get('/', getUsers)
router.get('/:id', getUserById)

export default router
