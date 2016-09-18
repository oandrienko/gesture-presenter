from tornado import web
import json

from socket import cl, cl_id

class GestureDetectHandler(web.RequestHandler):

    def get(self):
    	print 'Calling GestureDetectHandler...'
    	response = {}
    	# response['cl'] = cl

    	self.write(json.dumps(response))

    # @web.asynchronous
    # def get(self, *args):
    #     # self.finish()
    #     # id = self.get_argument("id")
    #     # value = self.get_argument("value")
    #     # data = {"id": id, "value" : value}
    #     # data = json.dumps(data)
    #     print 'Calling'
    #     self.write("HELLO")
    #     self.finish()


    # @web.asynchronous
    # def post(self):
    #     pass