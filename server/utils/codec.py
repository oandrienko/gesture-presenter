""" Decodes and encodes the video stream that if first sent from server """

import cv2
import numpy as np

def decode(src):
	cv2.CV_LOAD_IMAGE_COLOR = 1
    nparr = np.fromstring(src, np.uint8)
    img = cv2.imdecode(nparr, cv2.CV_LOAD_IMAGE_COLOR)

    return img

def encode(src):
	blob = cv2.imencode('.jpg', src)[1].tobytes()

	return blob