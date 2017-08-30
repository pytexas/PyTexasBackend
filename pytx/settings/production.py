import os

from pytx.release import RELEASE

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

from pytx.settings.base import *

SECURE_SSL_REDIRECT = True

RAVEN_CONFIG = {
  'dsn': os.environ.get('RAVEN_BACKEND', None),
  'release': RELEASE,
}
