import sys
import json
import pickle

# Load the model
model_path = './model.pkl'
with open(model_path, 'rb') as model_file:
    model = pickle.load(model_file)

def predict_vulnerability(code_snippet):
    # You may need to preprocess the code_snippet as required by your model
    # For this example, we are directly using it
    prediction = model.predict([code_snippet])
    return prediction[0]

if __name__ == '__main__':
    input_data = json.loads(sys.argv[1])
    code_snippet = input_data['code_snippet']
    result = predict_vulnerability(code_snippet)

    # Send back the result as JSON
    response = {'vulnerable': bool(result)}  # Assuming model returns 1 for vulnerable, 0 for safe
    print(json.dumps(response))
