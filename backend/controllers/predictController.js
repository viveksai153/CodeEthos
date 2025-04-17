const { PythonShell } = require('python-shell');
const Code = require('../models/code');

// Function to handle prediction logic
exports.predictVulnerability = (req, res) => {
  const { codeSnippet } = req.body;

  if (!codeSnippet) {
    return res.status(400).json({ message: 'Code snippet is required' });
  }

  // Define Python options to run the feature extraction and prediction logic
  let options = {
    mode: 'text',
    pythonPath: '/usr/bin/python3', // Adjust this path to your Python environment
    scriptPath: './python_scripts', // The folder where your Python feature extraction script is located
    args: [codeSnippet] // Pass the code snippet as an argument
  };

  PythonShell.run('predict_vulnerability.py', options, function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error running the prediction model' });
    }

    // The result will be returned as a list containing the prediction (1: vulnerable, 0: safe)
    const prediction = result[0];

    // Save the code snippet and its prediction result to the database
    const newCodeEntry = new Code({ code: codeSnippet, result: prediction });
    newCodeEntry.save()
      .then(() => {
        res.status(201).json({
          message: 'Code analyzed and saved successfully',
          codeSnippet: codeSnippet,
          prediction: prediction === '1' ? 'Vulnerable' : 'Safe'
        });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Error saving the result to the database', error });
      });
  });
};
