import os

from django.conf import settings

JS = [
  'vue.min.js',
  'vue-router.min.js',
  'vue-material.js',
  # 'raven.min.js',
  # 'plugins/vue.min.js',
  # 'axios.min.js',
  
  # 'nac.js',
]

CSS = [
  'vue-material.css',
  #'nac.css'
]

IMAGES = [
  'img/banner80.png',
  # 'img/google.png',
]

FONTS = [
  'Roboto-Regular.woff2',
  'Roboto-Bold.woff2',
  'MaterialIcons-Regular.woff2',
]

def tpl_files ():
  tpls = []
  
  base_dir = os.path.join(settings.BASE_DIR, 'static', 'nac')
  for root, dirs, files in os.walk(base_dir):
    for file in files:
      if file.endswith('.html'):
        fullpath = os.path.join(root, file)
        relpath = fullpath.replace(base_dir + '/', '')
        relpath = relpath.replace('/', '-')
        relpath = relpath[:-5]
        with open(fullpath, 'r') as fh:
          tpls.append({'path': relpath, 'content': fh.read()})
          
  return tpls
  
if settings.DEBUG:
  for i, f in enumerate(JS):
    if '.min.' in f:
      JS[i] = f.replace('.min.', '.')
      