const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  code: { type: String, required: true },
  result: { type: String, required: true },  // Could also be an object if results are more complex
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Code', codeSchema);
