
//precache
self.addEventListener('install', e=>{
	let cacheName = 'test',
	    cacheList = [];

	console.log('install ......');
	e.waitUntil(
		caches.open(cacheName).then(cache => {
			cache.addAll(cacheList);
			console.log('precache success');
		}).catch( err => console.log(err) )
	);
	console.log('install success');
});

//拦截响应并缓存
//self.addEventListener('fetch', fetchCallback);

//activate
self.addEventListener('activate', activateCallback);


function fetchCallback(e){
	console.log(`fetch--->${e.request}`);
	e.respondWith(
		caches.match(e.request).then(res=>{
			//catch
			if(res){ console.log('cache'); return res; }

			//fetch
			console.log('fetch ...');
			return fetch(e.request).then(res=>{
				//bad response
				if(!res || res.status !== 200){
					return res;
				}

				console.log('fetch success');
				//cache response
				let cacheName = 'test';//
				let res2 = res.clone();
				caches.open(cacheName).then(cache=>{
					console.log('cache ...');
					cache.put(e.request,  res2);
					console.log('cache success');
				}).catch(err=> console.log(err) );

				return res;
			});
		}).catch(err => console.log(err) )
	);
}

function activateCallback(e){
	console.log(`activate`);
}
