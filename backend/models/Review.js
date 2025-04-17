const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  vulnerabilities: { type: String, default: '0' },  // Change to String
  codeSmells: { type: String, default: '0' },      // Change to String
  bugs: { type: String, default: '0' },            // Change to String
});

module.exports = mongoose.model('Review', ReviewSchema);
