import express from 'express'
import {
  createProject,
  getProjectById,
  getAllProjectsByUser,
  // deleteProjectById,
  // updateProjectById,
} from '../controllers/projectController.js'

import { createBoardComponent, updateBoard } from '../controllers/boardController.js'

const router = express.Router()

router.post('/', createProject)
router.get('/user', getAllProjectsByUser)

router.post('/:projectId/board', createBoardComponent)
router.put('/:projectId/board/:boardId', updateBoard)

router.get('/:projectId', getProjectById)
// router.delete('/:projectId', deleteProjectById)
// router.put('/:projectId', updateProjectById)

export default router
