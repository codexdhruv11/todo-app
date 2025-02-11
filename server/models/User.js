const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('User', userSchema);
// Update on 2025-02-16T03:10:04
// Update on 2025-02-21T23:34:50
// Update on 2025-02-12T06:18:48
// Update on 2025-02-11T17:17:37