""" 

Was originally going to be used to send the coordinate positions
alongside the open websocket. However, an interval solution was
implemented instead, that alternated between sending back video 
frames and coordinate locations to the browser

"""

from tornado import web
import json

class GestureDetectHandler(web.RequestHandler):

    def get(self):
    	response = {}
    	self.write(json.dumps(response))