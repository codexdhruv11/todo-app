const Task = require('../models/Task');

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const task = new Task({ 
      title, 
      description, 
      dueDate, 
      user: req.user.id,
      position: await Task.countDocuments({ user: req.user.id })
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { user: req.user.id };
    if (status) filter.status = status;
    
    const tasks = await Task.find(filter).sort('position');
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const reorderTasks = async (req, res) => {
  try {
    const { tasks } = req.body;
    for (const [index, task] of tasks.entries()) {
      await Task.findByIdAndUpdate(task._id, { position: index });
    }
    res.json({ message: 'Tasks reordered' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask, reorderTasks };
// Update on 2025-02-18T13:55:57
// Update on 2025-02-17T19:30:30
// Update on 2025-02-17T23:16:27