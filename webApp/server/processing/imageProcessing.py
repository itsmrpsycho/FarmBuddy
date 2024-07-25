import cv2
import os
import matplotlib
matplotlib.use('Agg')

def process_image(img):
    
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)