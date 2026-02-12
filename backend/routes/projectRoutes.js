const express = require('express')
const { createProject, getAllProjectsByUser, getProjectById } = require('../controllers/projectController')

const router = express.Router()

router.post('/', createProject)
router.get('/user/:userId', getAllProjectsByUser)
router.get('/:projectId', getProjectById)

module.exports = router
