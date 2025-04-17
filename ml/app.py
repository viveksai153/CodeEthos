from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the machine learning model
model_path = './model.pkl'  # Make sure the path is correct
with open(model_path, 'rb') as f:
    model = pickle.load(f)

# Define the feature extraction function
def extract_features(code_snippet):
    # Implement the same feature extraction logic here
    features = []
    
    # Length of the code snippet
    features.append(len(code_snippet))
    
    # Check for dangerous C/C++ functions
    dangerous_functions = ['gets(', 'strcpy(', 'malloc(', 'free(']
    features.append(sum([code_snippet.count(func) for func in dangerous_functions]))
    
    # Check for potential XSS patterns (script tags, onerror, etc.)
    xss_patterns = ['<script>', 'onerror=', 'innerHTML', 'alert(']
    features.append(sum([code_snippet.count(pattern) for pattern in xss_patterns]))
    
    # Check for buffer overflow risks (array out of bounds, pointer misuse)
    buffer_overflow_indicators = ['[10]', 'a[10]', 'malloc(', 'free(']
    features.append(sum([code_snippet.count(indicator) for indicator in buffer_overflow_indicators]))
    
    # Check for insecure user input handling
    insecure_input_patterns = ['JSON.parse', 'request.getParameter', 'userInput']
    features.append(sum([code_snippet.count(pattern) for pattern in insecure_input_patterns]))
    
    return features

# Define the route to predict code vulnerabilities
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        code_snippet = data['code_snippet']
        
        # Extract features from the code snippet
        features = extract_features(code_snippet)
        features = np.array(features).reshape(1, -1)
        
        # Make a prediction using the loaded model
        prediction = model.predict(features)
        prediction_label = 'vulnerable' if prediction[0] == 1 else 'safe'
        
        return jsonify({'prediction': prediction_label})
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
