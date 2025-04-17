import axios from 'axios';

export const predictVulnerability = async (codeSnippet) => {
    const response = await axios.post('/ml/predict', { code_snippet: codeSnippet });
    return response.data;
};
