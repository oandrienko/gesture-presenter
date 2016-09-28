""" 

Credit and many thanks to Adrian Rosebrock, your tutorials rock.

Original plan was to use this to detect instances of no motion, to
avoid having the obj_track function break when it doesn't detect the 
HSV value it was looking for. However, due to time contrainsts, this
script was left out, but could be used in the future.


"""

import argparse
import datetime
import imutils
import time
import cv2

def motion_detect(frame, firstFrame):

	args = {}
	args["min_area"] = 29000

	text = "Unoccupied"

	frame = imutils.resize(frame, width=500)
	gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
	gray = cv2.GaussianBlur(gray, (21, 21), 0)

	if firstFrame is None:
		firstFrame = gray

	frameDelta = cv2.absdiff(firstFrame, gray)
	thresh = cv2.threshold(frameDelta, 25, 255, cv2.THRESH_BINARY)[1]

	thresh = cv2.dilate(thresh, None, iterations=2)
	(_, cnts, _) = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL,
	        cv2.CHAIN_APPROX_SIMPLE)

	for c in cnts:
		if cv2.contourArea(c) < args["min_area"]:
			continue

		(x, y, w, h) = cv2.boundingRect(c)
		cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
		text = "Occupied"

	return text, firstFrame

