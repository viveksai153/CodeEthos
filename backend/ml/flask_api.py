from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import joblib
import numpy as np

# Load the trained models and the TF-IDF vectorizer
model_safe = joblib.load('model_safe.pkl')
model_category = joblib.load('model_category.pkl')
model_type = joblib.load('model_type.pkl')
tfidf = joblib.load('tfidf_vectorizer.pkl')

# Load the label encoders
label_encoder_safe = joblib.load('label_encoder_safe.pkl')
label_encoder_category = joblib.load('label_encoder_category.pkl')
label_encoder_type = joblib.load('label_encoder_type.pkl')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Function to predict vulnerability, category, and type for a given code snippet
def predict_vulnerability_and_metadata(user_input):
    user_input_transformed = tfidf.transform([user_input]).toarray()
    prediction_safe = model_safe.predict(user_input_transformed)[0]
    prediction_category = model_category.predict(user_input_transformed)[0]
    prediction_type = model_type.predict(user_input_transformed)[0]

    label_safe = "Safe" if prediction_safe == 1 else "Vulnerable"
    label_category = label_encoder_category.inverse_transform([prediction_category])[0]
    label_type = label_encoder_type.inverse_transform([prediction_type])[0]

    return label_safe, label_category, label_type

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    user_input = data.get('codeSnippet')
    if not user_input:
        return jsonify({"error": "Code snippet is required"}), 400

    # Get prediction for the user input
    prediction_safe, prediction_category, prediction_type = predict_vulnerability_and_metadata(user_input)

    return jsonify({
        "vulnerabilityStatus": prediction_safe,
        "category": prediction_category,
        "type": prediction_type
    })

if __name__ == '__main__':
    app.run(debug=True)
