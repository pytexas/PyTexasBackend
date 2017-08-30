import subprocess

from django import http

def backup (request):
  sts = subprocess.call("./upload_db.bsh", shell=True)
  return http.HttpResponse("OK", content_type="text/plain")
  