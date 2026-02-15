import express from 'express'
import {
  createProject,
  getAllProjectsByUser,
  deleteProjectById,
  updateProjectById,
} from '@controllers/projectController'

const router = express.Router()

router.post('/register', createProject)
router.get('/:userId', getAllProjectsByUser)
router.delete('/:projectId', deleteProjectById)
router.put('/:projectId', updateProjectById)

export default router
