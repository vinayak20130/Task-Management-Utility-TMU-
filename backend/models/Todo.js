const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
    enum: ['todo', 'inprogress', 'done'],
    maxLength: 50,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Todo', todoSchema);
