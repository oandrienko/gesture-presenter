from tornado import web
import json

class GestureDetectHandler(web.RequestHandler):

    def get(self):
    	response = {}
    	self.write(json.dumps(response))