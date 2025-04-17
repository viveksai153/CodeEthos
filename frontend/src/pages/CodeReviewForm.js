import React, { useState } from "react";
import { getCodePrediction } from "../services/apiService";

const CodeReviewForm = () => {
  const [codeSnippet, setCodeSnippet] = useState(""); // State to hold the entered code snippet
  const [prediction, setPrediction] = useState(null); // State to hold the prediction result
  const [loading, setLoading] = useState(false); // State to handle loading indicator
  const [error, setError] = useState(null); // State to handle errors

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // Call the API service function with the code snippet
      const result = await getCodePrediction(codeSnippet);
      setPrediction(result); // Update the state with the received prediction
    } catch (error) {
      console.error("Error in prediction:", error);
      setError("Failed to fetch the prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Code Review</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={codeSnippet}
          onChange={(e) => setCodeSnippet(e.target.value)}
          placeholder="Enter code snippet here..."
          rows="5"
          cols="50"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading || !codeSnippet.trim()}
          className={`mt-4 w-full bg-blue-600 text-white p-2 rounded-lg ${
            loading || !codeSnippet.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Analyzing..." : "Get Prediction"}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-600 p-2 border border-red-500 rounded">
          {error}
        </div>
      )}

      {prediction && (
        <div className="mt-6 p-4 bg-gray-100 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Prediction Result:</h3>
          <p>
            <strong>Vulnerability Status:</strong> {prediction.vulnerabilityStatus}
          </p>
          <p>
            <strong>Category:</strong> {prediction.category}
          </p>
          <p>
            <strong>Type:</strong> {prediction.type}
          </p>
        </div>
      )}
    </div>
  );
};

export default CodeReviewForm;
