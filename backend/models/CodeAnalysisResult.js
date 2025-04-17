const mongoose = require('mongoose');

const codeAnalysisResultSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Reference to the User
    codeSnippet: { type: String, required: true },
    fileName: { type: String, required: true },
    vulnerabilityStatus: { type: String, required: true }, // e.g., "Vulnerable" or "Safe"
    category: { type: String, required: true }, // e.g., "SQL Injection", "XSS"
    type: { type: String, required: true }, // e.g., "Code Smell", "Security Vulnerability"
    timestamp: { type: Date, default: Date.now }, // When the analysis was performed
  },
  { collection: 'code_analysis_results' }
);

module.exports = mongoose.model('CodeAnalysisResult', codeAnalysisResultSchema);
