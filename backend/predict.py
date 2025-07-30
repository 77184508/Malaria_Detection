from flask import Flask, request, jsonify
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
from keras.layers import TFSMLayer
from dotenv import load_dotenv
import numpy as np
import os

app = Flask(__name__)
load_dotenv()
# Load your saved model
MODEL_PATH = os.getenv("MODEL_PATH", "best_model.h5")
model = load_model(MODEL_PATH)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    img_file = request.files['image']
    img_path = os.path.join('temp', img_file.filename)
    img_file.save(img_path)

    # Preprocess the image for ResNet50
    img = image.load_img(img_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = x / 255.0  # normalize if needed

    # Predict
    preds = model.predict(x)
    # Assuming binary classification: malaria vs. normal
    print(preds[0][0])
    pred_class = 'Malaria' if preds[0][0] < 0.5 else 'Normal'
    accuracy = (1-float(preds[0][0])) * 100 if pred_class == 'Malaria' else (float(preds[0][0])) * 100

    # Clean up temp file
    os.remove(img_path)

    return jsonify({'prediction': pred_class, 'accuracy': round(accuracy, 2)})

if __name__ == '__main__':
    os.makedirs('temp', exist_ok=True)
    app.run(port=6000)