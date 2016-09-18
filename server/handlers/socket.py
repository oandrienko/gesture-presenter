from tornado import websocket
import cv2
from collections import deque
import numpy as np

import json

from utils.obj_track import obj_track

from utils.motion_detect import motion_detect


cl = []

class SocketHandler(websocket.WebSocketHandler):

    alternate = True 

    #values for feeding pack to motion_detect
    pts = deque(maxlen=64)
    counter = 0
    dX = 0
    dY = 0
    direction = ""

    # first_frame = None

    def check_origin(self, origin):
        return True

    def open(self):
        if self not in cl:
            # first_frame = None
            cl.append(self)

    def on_close(self):
        if self in cl:
            cl.remove(self)

    def on_message(self, message):
	
        cv2.CV_LOAD_IMAGE_COLOR = 1
        nparr = np.fromstring(message, np.uint8)
        img = cv2.imdecode(nparr, cv2.CV_LOAD_IMAGE_COLOR)

        # (txt, self.first_frame) = motion_detect(img, self.first_frame)

        (img, 
            self.pts, 
            self.counter, 
            self.dX, 
            self.dY, 
            self.direction)  = obj_track(img, self.pts, self.counter, self.dX, self.dY, self.direction)


        img_str = cv2.imencode('.jpg', img)[1].tobytes()

        if self.alternate:
            self.write_message(img_str, True)
        else:
            response = {}
            response['isJSON'] = True
            response['dir'] = self.direction
            response['dX'] = self.dX
            response['dY'] = self.dY
            # response['mv'] = False if txt == "Unoccupied" else True
            self.write_message(json.dumps(response))

        self.alternate = not self.alternate


