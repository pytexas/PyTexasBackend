# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

from pytx.settings.base import *

SECURE_SSL_REDIRECT = False

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    },
    'sessions': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': 'django_cache',
    },
}

SKIP_SW = False

BASE_URL = 'https://cool-sea-0598.graviton.ninja:9000'

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = '/media/'

STATICFILES_DIRS.append(MEDIA_ROOT)

ALLOWED_HOSTS += ['localhost', '127.0.0.1']

try:
  from pytx.settings.local import *

except:
  pass
