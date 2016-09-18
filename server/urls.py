from handlers.home import HomeHandler
from handlers.socket import SocketHandler
from handlers.gesture import GestureDetectHandler

url_patterns = [
	(r'/', HomeHandler),
	(r'/ws/image_stream', SocketHandler),
	(r'/api/check_gesture', GestureDetectHandler),
]