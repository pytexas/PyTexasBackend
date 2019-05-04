from django import http
from django.conf import settings
from django.db.models.signals import post_save, post_delete
from django.template.response import TemplateResponse

from pytx.release import update_data_version

ROBOTS = """User-agent: *
Disallow: /static/$
Disallow: /static-2020/$
Disallow: /static-2019/$
"""


def robots(request):
  return http.HttpResponse(ROBOTS, content_type='text/plain')


def webmaster_tools(request):
  return TemplateResponse(request, 'google442b861f8353f428.html')


def static_redirect(request):
  return http.HttpResponseRedirect(settings.STATIC_URL + request.path[1:])


def redirect(request, year='2017'):
  return http.HttpResponseRedirect('http://{}.pytexas.org'.format(year))


def redirect_no_conf(request, year='2019'):
  return http.HttpResponseRedirect('/{}/'.format(year))


def archive(request):
  return http.HttpResponseRedirect('http://archive.pytexas.org' + request.path)


def data_changed(*args, **kw):
  if 'sender' in kw:
    name = kw['sender'].__name__

    if name in [
        'Conference', 'Session', 'SponsorshipLevel', 'SocialHandle', 'Sponsor',
        'Room', 'User'
    ]:
      if name == 'User':
        if 'instance' in kw:
          if kw['instance'].session_set.filter(status='accepted').count() == 0:
            return

      update_data_version()


post_save.connect(data_changed, dispatch_uid='all_post_save')
# post_delete.connect(data_changed, dispatch_uid='all_post_delete')
