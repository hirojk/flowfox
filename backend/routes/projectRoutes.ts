import express from 'express'
import {
  createProject,
  getProjectById,
  getAllProjectsByUser,
  deleteProjectById,
  updateProjectById,
} from '@controllers/projectController'

import { createBoardComponent } from '@controllers/boardController'

const router = express.Router()

router.post('/newProject', createProject)
router.get('/:projectId', getProjectById)
router.get('/user/:userId', getAllProjectsByUser)
router.delete('/:projectId', deleteProjectById)
router.put('/:projectId', updateProjectById)

router.post('/:projectId/newBoard', createBoardComponent)

export default router
