import time
import os

RELEASE = os.environ.get('HEROKU_RELEASE_VERSION', '')
DEV = False
DATA = {'VERSION': 0}


def release_key():
  return '{}.{}'.format(RELEASE, DATA['VERSION'])


def update_data_version():
  DATA['VERSION'] += 1


if not RELEASE:
  RELEASE = str(time.time())
  DEV = True
