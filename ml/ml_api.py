from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from joblib import load

app = Flask(__name__)

# Load the pre-trained model
model = load('model.joblib')

# Define your feature extraction logic
def extract_features(code_snippet):
    features = []
    features.append(len(code_snippet))
    dangerous_functions = ['gets(', 'strcpy(', 'malloc(', 'free(']
    features.append(sum([code_snippet.count(func) for func in dangerous_functions]))
    xss_patterns = ['<script>', 'onerror=', 'innerHTML', 'alert(']
    features.append(sum([code_snippet.count(pattern) for pattern in xss_patterns]))
    buffer_overflow_indicators = ['[10]', 'a[10]', 'malloc(', 'free(']
    features.append(sum([code_snippet.count(indicator) for indicator in buffer_overflow_indicators]))
    insecure_input_patterns = ['JSON.parse', 'request.getParameter', 'userInput']
    features.append(sum([code_snippet.count(pattern) for pattern in insecure_input_patterns]))
    return np.array(features).reshape(1, -1)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    code_snippet = data['code_snippet']
    features = extract_features(code_snippet)
    prediction = model.predict(features)
    return jsonify({'vulnerable': int(prediction[0])})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
