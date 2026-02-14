import express from 'express'
import { createProject, getAllProjectsByUser } from '@controllers/projectController'

const router = express.Router()

router.post('/register', createProject)
router.get('/:userId', getAllProjectsByUser)

export default router
