import express from 'express'
import { createUser, getUsers, getUserById, deleteUserById, updateUserById } from '@controllers/userController'

const router = express.Router()

router.post('/register', createUser)
router.get('/', getUsers)
router.get('/:id', getUserById)
router.delete('/:id', deleteUserById)
router.put('/:id', updateUserById)

export default router
