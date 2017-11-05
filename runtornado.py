#!/usr/bin/env python

import os

import tornado.httpserver
import tornado.ioloop
import tornado.web
import tornado.wsgi
import tornado.log

PORT = int(os.environ.get('PORT', '8000'))
ENV = os.environ.get('ENVIRONMENT', 'development')
AUTORELOAD = True
if ENV == 'production':
  AUTORELOAD = False
  
class HelloHandler(tornado.web.RequestHandler):
  def get(self):
    self.write('Hello from tornado')

def main():
  tornado.log.enable_pretty_logging()
  
  from pytx.wsgi import application
  container = tornado.wsgi.WSGIContainer(application)
  
  tornado_app = tornado.web.Application([
    ('/hello', HelloHandler),
    ('.*', tornado.web.FallbackHandler, dict(fallback=container)),
  ], autoreload=AUTORELOAD)

  server = tornado.httpserver.HTTPServer(tornado_app)
  server.listen(PORT)

  tornado.ioloop.IOLoop.instance().start()
  
if __name__ == '__main__':
  main()
  