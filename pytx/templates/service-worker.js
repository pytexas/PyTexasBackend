{% load static conference %}
var RELEASE = '{{ release }}';
var CACHE_NAME = 'release-{{ release }}';
var CONF_HTTP = '{{ base_url }}/{{ conf }}/';
var HTTP = '{{ base_url }}';
var CORE_FILES = [
  "/{{ conf }}/",
  "{% url "conference-data" conf %}",
  "https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab|Material+Icons",
  {% for css in files.css %}"{% static css %}",
  {% endfor %}{% for js in files.js %}"{% static js %}",
  {% endfor %}{% for f in files.fonts %}"{% static f %}",
  {% endfor %}{% for f in files.images %}"{% static f %}",
  {% endfor %}{% for f in files.md %}"{% static f|dist:"md" %}",
  {% endfor %}
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Service Worker Caching');
        return cache.addAll(CORE_FILES);
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(names) {
        return Promise.all(
          names.map(function(cname) {
            if (cname != CACHE_NAME) {
              console.log('Clearing Cache: ', cname);
              return caches.delete(cname);
            }
          })
        );
      })
      .then(function () {
        return clients.claim();
      })
  );
});


function network_fetch (event) {
  var fetchRequest = event.request.clone();

  return fetch(fetchRequest).then(function(response) {
    console.log('Response from network:', event.request.url);
    if (event.request.url.indexOf('https://fonts.gstatic.com/') === 0) {
      caches.open(CACHE_NAME)
        .then(function(cache) {
          console.log('Added to Cache', event.request.url);
          return cache.put(event.request, response);
        });
    }

    return response.clone();
  }).catch(function(error) {
    console.error('Fetching failed:', error);
    throw error;
  });
}

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          // console.log('Cached Response:', event.request.url);
          return response;
        }

        if (event.request.url.indexOf(CONF_HTTP) === 0) {
          return caches.match("/{{ conf }}/")
            .then(function(response) {
              if (response) {
                console.log('Index Cached Response:', event.request.url);
                return response;
              }

              return network_fetch(event);
            });
        }

        return network_fetch(event);
      })
    );
});

function clear_all_cache (event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.map(function(cname) {
          console.log('Clearing Cache: ', cname);
          return caches.delete(cname);
        })
      );
    })
  );
}

self.addEventListener('message', function (event) {
  console.log("SW Received Message: ", event.data);

  if (event.data.task == 'clear') {
    clear_all_cache(event);
    event.ports[0].postMessage('cleared');
  }
});
