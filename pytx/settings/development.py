# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

from pytx.settings.base import *

CACHES = {
  'default': {
    'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
  }
}
