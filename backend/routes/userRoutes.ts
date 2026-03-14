import express from 'express'
import { createUser, getAllUsers, getUserById, deleteUserById, updateUserById } from '../controllers/userController.js'

const router = express.Router()

router.post('/', createUser)
router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.delete('/:id', deleteUserById)
router.put('/:id', updateUserById)

export default router
