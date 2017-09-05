# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

from pytx.settings.base import *

SECURE_SSL_REDIRECT = True

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}

SKIP_SW = True

BASE_URL = 'https://pallas.neutrondrive.com'

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = STATIC_URL + 'uploads/'

STATICFILES_DIRS.append(MEDIA_ROOT)
