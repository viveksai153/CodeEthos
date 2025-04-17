const CodeAnalysisResult = require('../models/CodeAnalysisResult');

// Save analysis result
exports.saveAnalysisResult = async (req, res) => {
    try {
      const { codeSnippet, fileName, vulnerabilityStatus, category, type } = req.body;
  
      // Extract userId from the decoded token attached by the middleware
      const userId = req.user.userId; 
  
      if (!codeSnippet || !fileName || !vulnerabilityStatus || !category || !type) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      // Create a new analysis result
      const analysisResult = new CodeAnalysisResult({
        userId, // Pass userId to the model
        codeSnippet,
        fileName,
        vulnerabilityStatus,
        category,
        type,
      });
  
      const savedResult = await analysisResult.save();
  
      res.status(201).json({ message: 'Analysis result saved successfully.', data: savedResult });
    } catch (error) {
      console.error('Error saving analysis result:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
  

// Fetch results for a specific user
exports.getUserResults = async (req, res) => {
  try {
    const userId =req.user.userId; // Extracted from token

    // Find results by userId
    const results = await CodeAnalysisResult.find({ userId }).sort({ timestamp: -1 });

    res.status(200).json({ data: results });
  } catch (error) {
    console.error('Error fetching user results:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
