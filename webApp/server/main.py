import cv2
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from processing.imageProcessing import process_image
from processing.diseaseClassification import modelInference

app = Flask(__name__)
cors = CORS(app, origins='*')

UPLOAD_FOLDER = 'client/public/uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/api/users', methods=['GET'])
def users():
    return jsonify({
        "users": [
            "san1",
            "josasde",
            "jake",
            "jane"
        ]
    })

@app.route('/api/image', methods=['GET'])
def image():
    # The URL/path to your image
    client_path = "./client/public"
    img_src = "./client/public/potrait.jpg"

    img = cv2.imread(img_src)
    height, width = img.shape[:2]
    
    output = {
        "img_src": img_src[len(client_path):],
        "width": width,
        "height": height
    }

    return jsonify(output)

@app.route('/uploadDisease', methods=['POST'])
def upload_file():
    client_path = "./client/public"
    if 'file!' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file!']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file:
        file_path = UPLOAD_FOLDER + "/input.JPG"
        if os.path.exists(file_path):
            os.remove(file_path)
        file.save(file_path)
        img = cv2.imread(file_path)
        output = modelInference(img)
        output = output.capitalize()
        print(output)

        return jsonify({"message": "File uploaded successfully", "file_path": file_path[len(client_path)-1:], "model_output":output}), 200

if __name__ == '__main__':
    app.run(debug=True, port=8080)