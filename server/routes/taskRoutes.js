const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createTask, getTasks, updateTask, deleteTask, reorderTasks
} = require('../controllers/taskController');

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);
router.post('/reorder', auth, reorderTasks);

module.exports = router;
// Update on 2025-02-16T14:21:05
// Update on 2025-02-18T19:29:30