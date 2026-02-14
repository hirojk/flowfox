import express from 'express'
import { createUser, getUsers, getUserById, deleteUserById } from '@controllers/userController'

const router = express.Router()

router.post('/register', createUser)
router.get('/', getUsers)
router.get('/:id', getUserById)
router.delete('/:id', deleteUserById)

export default router
