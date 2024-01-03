// src/routes/taskRoutes.js

const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, taskController.createTask);
router.get('/', authMiddleware, taskController.getAllTasks);
router.get('/:taskId', authMiddleware, taskController.getTaskById);
router.patch('/:taskId', authMiddleware, taskController.updateTask);
router.delete('/:taskId', authMiddleware, taskController.deleteTask);

module.exports = router;
