import express from 'express'
import {
  createProject,
  getAllProjectsByUser,
  deleteProjectById,
  updateProjectById,
} from '@controllers/projectController'

import { createBoardComponent } from '@controllers/boardController'

const router = express.Router()

router.post('/newProject', createProject)
router.get('/:userId', getAllProjectsByUser)
router.delete('/:projectId', deleteProjectById)
router.put('/:projectId', updateProjectById)

router.post('/:projectId/newBoard', createBoardComponent)

export default router
