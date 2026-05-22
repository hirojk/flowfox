import express from 'express'
import { createUser, getAllUsers, getUserById, deleteUserById, updateUserById } from '../controllers/userController.js'
import { adminMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', adminMiddleware, createUser)
router.get('/', adminMiddleware, getAllUsers)
router.get('/:id', getUserById)
router.delete('/:id', deleteUserById)
router.put('/:id', updateUserById)

export default router
