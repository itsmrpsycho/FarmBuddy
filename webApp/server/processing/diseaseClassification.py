from ultralytics import YOLO
import matplotlib.pyplot as plt
import cv2
import numpy as np
import io
import matplotlib
matplotlib.use('Agg')

def load_model(model_path="server/processing/Models/best.pt"):
    model = YOLO(model_path)
    return model

def modelInference(img):
    # Load the model
    model = load_model()
    results = model.predict(img)
    index = results[0].probs.top1
    output = results[0].names[index]

    return output
