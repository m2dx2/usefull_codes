const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  	'./', // Alias for index.html
 	'stylesheets/sidebar.css',
	'stylesheets/bootstrap-multiselect.css',
	'stylesheets/sidebar.css',
	'stylesheets/style.css',
	'stylesheets/bootstrap.min.css',
	'stylesheets/table/vendor/metisMenu/metisMenu.min.js',
	'stylesheets/table/vendor/datatables/js/jquery.dataTables.min.js',
	'stylesheets/table/vendor/datatables-plugins/dataTables.bootstrap.min.js',
	'stylesheets/table/vendor/datatables-responsive/dataTables.responsive.js',
	'images/logo1.png',
	'images/icon/search.png',
	'images/icon/exit.png',
	'favicon.png',
	'javascripts/bootstrap-multiselect.js',
	'javascripts/bootstrap.min.js',
	'javascripts/bootstrap-datepicker.js',
	'javascripts/jquery.validate.min.js',
	'js/query_script.js',
	'javascripts/moment.min.js'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
  	//skipping post request
  	if(event.request.method!="POST"){
  		   event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  	}
 
  }
});
