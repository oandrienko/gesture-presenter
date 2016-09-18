from tornado import web

class HomeHandler(web.RequestHandler):
    def get(self):
        self.render("index.html")