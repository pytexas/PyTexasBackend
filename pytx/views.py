import os
import subprocess

from django import http

def archive (request):
  return http.HttpResponseRedirect('http://archive.pytexas.org' + request.path)
  