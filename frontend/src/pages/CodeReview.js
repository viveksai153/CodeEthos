import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import Navbar2 from '../components/Navbar2';
import Alerts from '../components/Alerts';
import { getCodePrediction } from '../services/apiService'; // Import API service function
import axios from 'axios'; // Make sure to import axios

const CodeReview = () => {
  const [codeSnippet, setCodeSnippet] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [fileName, setFileName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const acceptedLanguages = {
    js: 'javascript',
    py: 'python',
    java: 'java',
    cpp: 'cpp',
  };

  const generateRandomFileName = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number
    return `file_${randomNumber}.js`; // Default to JavaScript extension if no file
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop();
      if (acceptedLanguages[fileExtension]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCodeSnippet(e.target.result);
        };
        reader.readAsText(file);
        setFileName(file.name);
      } else {
        setAlert({
          message: `Invalid file type. Accepted types: ${Object.keys(acceptedLanguages).join(', ')}`,
          type: 'warning',
        });
      }
    } else {
      setFileName(generateRandomFileName()); // Generate random filename if no file is selected
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setAlert(null);
    setResult(null);

    try {
      // Get code prediction result
      const analysisResult = await getCodePrediction(codeSnippet); // Call reusable service
      setResult(analysisResult);
      setShowModal(true);

      // Post the result to the server to save
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (token) {
        await axios.post(
          'http://localhost:5001/api/code-analysis/save',
          {
            codeSnippet: codeSnippet,
            fileName: fileName,
            vulnerabilityStatus: analysisResult.vulnerabilityStatus,
            category: analysisResult.category,
            type: analysisResult.type,
          },
          {
            headers: {
              token: ` ${token}`, // Send token in headers
            },
          }
        );

        setAlert({
          message: `Analysis complete: ${
            analysisResult.vulnerabilityStatus === 'Vulnerable' ? 'Vulnerable' : 'Safe'
          }`,
          type: analysisResult.vulnerabilityStatus === 'Vulnerable' ? 'error' : 'success',
        });
      } else {
        setAlert({
          message: 'No token found. Please log in again.',
          type: 'warning',
        });
      }
    } catch (error) {
      console.error('Error in prediction or saving:', error);
      setAlert({
        message: 'An error occurred during the analysis or saving. Please try again.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar2 />
      {alert && <Alerts message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <div className="container mx-auto mt-10 p-8 max-w-full border rounded-lg shadow-lg bg-white">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex flex-col mb-6 w-full">
            <label htmlFor="file-upload" className="mb-2 text-gray-700 font-semibold">
              Upload Your Code File:
            </label>
            <button
              type="button"
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out mb-2"
              onClick={() => document.getElementById('file-upload').click()}
            >
              Choose File
            </button>
            <input
              type="file"
              id="file-upload"
              accept={Object.keys(acceptedLanguages).map((ext) => `.${ext}`).join(',')}
              onChange={handleFileChange}
              className="hidden"
            />
            {fileName && <p className="text-gray-600 mt-2">Selected File: <strong>{fileName}</strong></p>}
          </div>
          <MonacoEditor
            height="50vh"
            language={fileName ? acceptedLanguages[fileName.split('.').pop()] : 'javascript'}
            value={codeSnippet}
            onChange={(value) => setCodeSnippet(value)}
            options={{
              selectOnLineNumbers: true,
              automaticLayout: true,
              fontSize: 16,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              theme: 'vs-dark',
            }}
            className="border border-gray-300 rounded mb-6 w-full"
          />
          <button
            type="submit"
            className={`w-full md:w-1/3 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Submit Code'}
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Analysis Result</h2>
            <p>
              <strong>Vulnerability Status:</strong> {result.vulnerabilityStatus}
            </p>
            <p>
              <strong>Category:</strong> {result.category}
            </p>
            <p>
              <strong>Type:</strong> {result.type}
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeReview;
