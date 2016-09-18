from tornado import websocket

import cv2
import numpy as np

import json

cl = []

class SocketHandler(websocket.WebSocketHandler):

    alternate = True 

    def check_origin(self, origin):
        return True

    def open(self):
        if self not in cl:
            # cl_id[cl] = cl.count
            cl.append(self)

    def on_close(self):
        if self in cl:
            # del cl_id[cl]
            cl.remove(self)

    def on_message(self, message):
	
        cv2.CV_LOAD_IMAGE_COLOR = 1
        nparr = np.fromstring(message, np.uint8)
        img = cv2.imdecode(nparr, cv2.CV_LOAD_IMAGE_COLOR)

        anterior = 0
        faceCascade = cv2.CascadeClassifier('static/haarcascade_frontalface_default.xml')
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = faceCascade.detectMultiScale(
        	gray,
        	scaleFactor=1.1,
        	minNeighbors=5,
        	minSize=(30, 30)
        	# flags=cv2.cv.CV_HAAR_SCALE_IMAGE
        )
        for (x, y, w, h) in faces:
        	cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)

        if anterior != len(faces):
        	anterior = len(faces)

        img_str = cv2.imencode('.jpg', img)[1].tobytes()

        if self.alternate:
            self.write_message(img_str, True)
        else:
            response = {}
            response['isJSON'] = True
            self.write_message(json.dumps(response))

        self.alternate = not self.alternate
