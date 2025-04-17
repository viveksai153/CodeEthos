// controllers/codeController.js
const CodeReview = require('../models/CodeReview');

// Mock function to simulate ML prediction
const analyzeCode = async (codeSnippet) => {
    // Mocking an analysis result, replace with actual ML integration
    const vulnerabilities = codeSnippet.includes('eval') ? ['Use of eval'] : [];
    const codeSmells = codeSnippet.length > 100 ? ['Long code'] : [];
    const bugs = codeSnippet.includes('var ') ? ['Use of var instead of let/const'] : [];
    const status = vulnerabilities.length > 0 || codeSmells.length > 0 || bugs.length > 0 ? 'Vulnerable' : 'Safe';

    return { vulnerabilities, codeSmells, bugs, status };
};

// POST /api/ml/predict - Analyze code and save the results to MongoDB
const analyzeAndSaveCode = async (req, res) => {
    try {
        const { code_snippet, file_name } = req.body;

        if (!code_snippet || !file_name) {
            return res.status(400).json({ message: 'Code snippet and file name are required.' });
        }

        // Perform the analysis (mocked here)
        const analysisResult = await analyzeCode(code_snippet);

        // Create and save the code review result in the database
        const codeReview = new CodeReview({
            fileName: file_name,
            vulnerabilities: analysisResult.vulnerabilities,
            codeSmells: analysisResult.codeSmells,
            bugs: analysisResult.bugs,
            status: analysisResult.status
        });

        await codeReview.save();

        // Send the result back to the client
        res.status(201).json({
            message: 'Code analyzed successfully',
            result: {
                fileName: codeReview.fileName,
                vulnerabilities: codeReview.vulnerabilities,
                codeSmells: codeReview.codeSmells,
                bugs: codeReview.bugs,
                status: codeReview.status
            }
        });
    } catch (error) {
        console.error('Error analyzing code:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { analyzeAndSaveCode };
