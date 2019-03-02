export function image(path) {
  if (IMAGES[path]) {
    return IMAGES[path];
  }

  return URLS.static + path;
}

export function resize(url, w, h, extra) {
  if (extra) {
    extra = '&' + extra;
  } else {
    extra = '';
  }

  if (url.indexOf("gravatar") > -1) {
    return url.replace("s=256", "s=" + w);
  }

  if (DEBUG) {
    return url;
  }

  if (url.startsWith('https://pytexas.s3.amazonaws.com/')) {
    url = url.replace('https://pytexas.s3.amazonaws.com', '');
    return `https://pytx.imgix.net${url}?w=${w}&h=${h}${extra}`;
  }

  return `https://pytxapp.imgix.net${url}?w=${w}&h=${h}${extra}`;
}

export function time(dt) {
  return dt.toLocaleTimeString();
}
