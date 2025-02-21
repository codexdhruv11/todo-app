const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  status: { type: String, enum: ['pending', 'done'], default: 'pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  position: { type: Number, default: 0 }
});

module.exports = mongoose.model('Task', taskSchema);
// Update on 2025-02-11T15:12:33
// Update on 2025-02-20T05:09:31
// Update on 2025-02-21T11:59:33