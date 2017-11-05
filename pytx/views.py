from django import http
from django.views.decorators.csrf import csrf_exempt

import time

def archive (request):
  return http.HttpResponseRedirect('http://archive.pytexas.org' + request.path)
  
class EventStream:
  def __init__ (self):
    self.version_sent = False
    
  def __iter__ (self):
    return self
    
  def __next__ (self):
    if not self.version_sent:
      self.version_sent = True
      return "data:Server Sent Data\n\n"
      
    #time.sleep(1)
    
@csrf_exempt
def release_stream(request):
  response = http.StreamingHttpResponse(EventStream(), content_type="text/event-stream")
  response['Cache-Control'] = 'no-cache'
  return response
  