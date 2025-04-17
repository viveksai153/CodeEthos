from sklearn.ensemble import RandomForestClassifier
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split

# Example dataset loading (replace with your actual dataset)
# Assuming you have a CSV with features and labels for vulnerability detection
data = pd.read_csv('your_dataset.csv')

# Split dataset into features (X) and labels (y)
X = data.drop('Vulnerable', axis=1)  # 'Vulnerable' is the label column
y = data['Vulnerable']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the RandomForestClassifier model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save the trained model to a file
joblib.dump(model, 'vulnerability_model.pkl')

# Optionally, print model score for validation
score = model.score(X_test, y_test)
print(f"Model trained with accuracy: {score}")
