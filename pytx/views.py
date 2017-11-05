from django import http
from django.db.models.signals import post_save, post_delete

from pytx.release import update_data_version

def archive (request):
  return http.HttpResponseRedirect('http://archive.pytexas.org' + request.path)
  
def data_changed (*args, **kw):
  update_data_version()
  
post_save.connect(data_changed, dispatch_uid='all_post_save')
post_delete.connect(data_changed, dispatch_uid='all_post_delete')
