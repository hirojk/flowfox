import express from 'express'
import { createProject, getAllProjectsByUser, getProjectById } from '../controllers/projectController'

const router = express.Router()

router.post('/', createProject)
router.get('/user/:userId', getAllProjectsByUser)
router.get('/:projectId', getProjectById)

export default router
