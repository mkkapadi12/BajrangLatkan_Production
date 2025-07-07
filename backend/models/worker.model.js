const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  skills: [{ type: String }],
  experience: { type: Number, required: true },
  salary: { type: Number, required: true },
  status: { type: String, enum: ['Active', 'Inactive','Training'], default: 'Active' },
  avatar: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Worker', workerSchema);