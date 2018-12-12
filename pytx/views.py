from django import http
from django.db.models.signals import post_save, post_delete

from pytx.release import update_data_version

def redirect (request, year='2017'):
  return http.HttpResponseRedirect('http://{}.pytexas.org'.format(year))

def redirect_no_conf (request, year='2019'):
  return http.HttpResponseRedirect('/{}/'.format(year))

def archive (request):
  return http.HttpResponseRedirect('http://archive.pytexas.org' + request.path)

def data_changed (*args, **kw):
  if 'sender' in kw:
    name = kw['sender'].__name__

    if name in ['Conference', 'Session', 'SponsorshipLevel', 'SocialHandle', 'Sponsor', 'Room', 'User']:
      if name == 'User':
        if 'instance' in kw:
          if kw['instance'].session_set.filter(status='accepted').count() == 0:
            return

      update_data_version()

post_save.connect(data_changed, dispatch_uid='all_post_save')
# post_delete.connect(data_changed, dispatch_uid='all_post_delete')
