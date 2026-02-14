import express from 'express'
import { createProject, getAllProjectsByUser, deleteProjectById } from '@controllers/projectController'

const router = express.Router()

router.post('/register', createProject)
router.get('/:userId', getAllProjectsByUser)
router.delete('/:projectId', deleteProjectById)

export default router
