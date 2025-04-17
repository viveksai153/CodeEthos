const { spawn } = require('child_process');
const path = require('path');

exports.predict = (req, res) => {
    const { code_snippet } = req.body;

    // Path to your Python script and model
    const pythonScriptPath = path.join(__dirname, '../ml/predict.py');

    // Create a child process to run the Python script
    const pythonProcess = spawn('python', [pythonScriptPath, JSON.stringify({ code_snippet })]);

    pythonProcess.stdout.on('data', (data) => {
        const result = JSON.parse(data.toString());
        res.json(result);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).send('An error occurred while processing your request.');
    });

    pythonProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
};
