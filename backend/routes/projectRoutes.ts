import express from 'express'
import {
  createProject,
  getAllProjectsByUser,
  getProjectById,
  deleteProjectById,
  updateProjectById,
} from '../controllers/projectController.js'

import { createBoardComponent, getBoardById, deleteBoardById, updateBoardById } from '../controllers/boardController.js'

const router = express.Router()

router.post('/', createProject)
router.get('/user', getAllProjectsByUser)

router.post('/:projectId/board', createBoardComponent)
router.get('/:projectId/board/:boardId', getBoardById)
router.delete('/:projectId/board/:boardId', deleteBoardById)
router.put('/:projectId/board/:boardId', updateBoardById)

router.get('/:projectId', getProjectById)
router.delete('/:projectId', deleteProjectById)
router.put('/:projectId', updateProjectById)

export default router
