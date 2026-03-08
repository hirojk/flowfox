import express from 'express'
import { createUser, getAllUsers, getUserById, deleteUserById, updateUserById } from '@controllers/userController'

const router = express.Router()

router.post('/newUser', createUser)
router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.delete('/:id', deleteUserById)
router.put('/:id', updateUserById)

export default router
