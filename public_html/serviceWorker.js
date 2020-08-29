const shoppityCache = "shoppity-site-v1"
const assets = [
	"./index.html",
	"./assets/css/style.css",
	"./assets/js/app.js",
	"./images/icon/icon-18x18.png",
	"./images/coffee1.jpg",
	"./images/coffee9.jpg"
]

self.addEventListener("install", (installEvent) => {
	self.skipWaiting();
	// installEvent.waitUntil(
	// 	caches.open(staticShoppity).then(cache => {
	// 		cache.addAll(assets)
	// 	})
	// )
	console.log("Installed latest version...");
})

// self.addEventListener("fetch", (fetchEvent) => {
// 	console.log("Fetching");
// 	fetchEvent.respondWith(
// 	  caches.match(fetchEvent.request).then(response => {
// 		return response || fetch(fetchEvent.request)
// 	  })
// 	)
// });



self.addEventListener('fetch', (event) => {
	event.respondWith(caches.open('shoppityCache').then(async (cache) => {
		const response = await cache.match(event.request);
		console.log("cache request: " + event.request.url);

		var fetchPromise = fetch(event.request).then((networkResponse) => {
			// Update the cache...                   
			console.log("fetch completed: " + event.request.url, networkResponse);
			if (networkResponse) {
				console.debug("updated cached page: " + event.request.url, networkResponse);
				cache.put(event.request, networkResponse.clone());
			}
			return networkResponse;
		}, event => {
			// Rejected promise - just ignore it, we're offline...  
			console.log("Error in fetch()", event);
			event.waitUntil(
				// Name the *cache* in the caches.open()...
				caches.open('shoppityCache').then((cache_1) => {
					// Take a list of URLs, then fetch them from the server and add the response to the cache...
					return cache_1.addAll(assets);
					// return cache_1.addAll([
					// 	'./index.html',
					// 	'./assets/css/style.css',
					// 	'./assets/js/app.js',
					// 	'./images/*'
					// ]);
				})
			);
		});
		return response || fetchPromise;
	}));
});




// window.addEventListener("load", () => {
// 	hasNetwork(navigator.onLine);
// 	window.addEventListener("online", () => {
// 		// Set hasNetwork to online when they change to online.
// 		hasNetwork(true);
// 	});
	
// 	window.addEventListener("offline", () => {
// 		// Set hasNetwork to offline when they change to offline.
// 		hasNetwork(false);
// 	});
// })



