import os
import subprocess

from django import http


def backup(request):
  token = request.GET.get('token', '')
  ENVIRONMENT = os.environ.get('ENVIRONMENT', '')

  if token == os.environ.get('BACKUP_TOKEN', ''):
    if ENVIRONMENT == 'production':
      sts = subprocess.call("./upload_db.bsh", shell=True)

    return http.HttpResponse("OK", content_type="text/plain")

  return http.HttpResponse("NOT-OK", content_type="text/plain")
