import express from 'express'
import {
  createProject,
  getProjectById,
  getAllProjectsByUser,
  // deleteProjectById,
  // updateProjectById,
} from '../controllers/projectController'

import { createBoardComponent, updateBoard } from '../controllers/boardController'

const router = express.Router()

router.post('/', createProject)
router.get('/user/:userId', getAllProjectsByUser)

router.post('/:projectId/boards', createBoardComponent)
router.put('/:projectId/boards/:boardId', updateBoard)

router.get('/:projectId', getProjectById)
// router.delete('/:projectId', deleteProjectById)
// router.put('/:projectId', updateProjectById)

export default router
