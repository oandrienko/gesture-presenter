from tornado import web, ioloop

from settings import settings 
from urls import url_patterns

class GesturePresenter(web.Application):
    def __init__(self):
        web.Application.__init__(self, url_patterns, **settings)


def main():
    app = GesturePresenter()
    app.listen(8888)
    ioloop.IOLoop.instance().start()

if __name__ == "__main__":
    main()
