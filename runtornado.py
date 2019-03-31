#!/usr/bin/env python

import os
import logging

from tornado import gen
import tornado.httpserver
import tornado.ioloop
import tornado.log
import tornado.web
import tornado.wsgi
import tornado.websocket

from pytx.release import RELEASE, DATA, release_key

PORT = int(os.environ.get('PORT', '8000'))
ENV = os.environ.get('ENVIRONMENT', 'development')
AUTORELOAD = True
if ENV == 'production':
  AUTORELOAD = False


class ReleaseWebSocket(tornado.websocket.WebSocketHandler):

  def open(self):
    logging.info("WebSocket opened")
    self.stop = False
    self.send_release()

  @gen.coroutine
  def send_release(self):
    while True:
      if self.stop:
        return

      self.write_message(release_key())
      yield gen.sleep(50)

  def on_message(self, message):
    pass

  def on_close(self):
    self.stop = True
    logging.info("WebSocket closed")


def main():
  tornado.log.enable_pretty_logging()

  from pytx.wsgi import application
  container = tornado.wsgi.WSGIContainer(application)

  tornado_app = tornado.web.Application([
      ('/release-stream$', ReleaseWebSocket),
      ('.*', tornado.web.FallbackHandler, dict(fallback=container)),
  ],
                                        autoreload=AUTORELOAD)

  server = tornado.httpserver.HTTPServer(tornado_app)
  server.listen(PORT)

  tornado.ioloop.IOLoop.instance().start()


if __name__ == '__main__':
  main()
