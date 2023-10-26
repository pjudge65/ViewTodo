const mongoose = require('mongoose');

/**
 * Define todo schema
 */
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dueDate: { type: String, required: true },
  project: { type: String, required: false },
  priority: { type: String, required: false },
  notes: { type: String, required: false },
});

module.exports = mongoose.model("Todo", todoSchema);
