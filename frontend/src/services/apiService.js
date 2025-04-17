import axios from "axios";

const API_URL = "http://127.0.0.1:5000/predict"; // Replace with your Python API URL

export const getCodePrediction = async (codeSnippet) => {
  try {
    const response = await axios.post(API_URL, {
      codeSnippet: codeSnippet,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching prediction:", error);
    throw error;
  }
};
