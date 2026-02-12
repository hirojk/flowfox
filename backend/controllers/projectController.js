const Project = require('../models/Project')

// Create new project
async function createProject(req, res) {
  try {
    const { projectName, userId } = req.body

    const project = new Project({
      projectName,
      userId,
      columns: [],
    })

    if (!projectName || !userId) {
      return res.status(400).json({
        error: 'projectName and userId are required',
      })
    }

    await project.save()

    res.status(201).json({
      message: 'Project created successfully',
      project,
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}

// Get all projects by user ID
async function getAllProjectsByUser(req, res) {
  try {
    const { userId } = req.params

    const User = require('../models/User')
    const user = await User.findById(userId)
    const projects = await Project.find({ userId })

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      })
    }

    res.json({
      projectCount: projects.length,
      projects,
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}

// Get single project
async function getProjectById(req, res) {
  try {
    const { projectId } = req.params
    const { userId } = req.query
    const project = await Project.findOne({ _id: projectId, userId })

    if (!userId) {
      return res.status(400).json({
        error: 'userId is required',
      })
    }

    if (!project) {
      return res.status(404).json({
        error: 'Project not found',
      })
    }

    res.json({ project })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { createProject, getAllProjectsByUser, getProjectById }
