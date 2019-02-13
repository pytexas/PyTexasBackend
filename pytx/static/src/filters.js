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

  // if (DEBUG) {
  //   return url;
  // }

  return `https://pytxapp.imgix.net${url}?w=${w}&h=${h}${extra}`;
}

export function time(dt) {
  return dt.toLocaleTimeString();
}
