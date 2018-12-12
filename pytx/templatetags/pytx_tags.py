from django import template

import os

register = template.Library()

@register.filter
def distfolder(path, d):
  return os.path.join(d, path)
