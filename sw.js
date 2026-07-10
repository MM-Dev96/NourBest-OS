"use strict";
const CACHE="nourbest-os-v3";
const CORE=["./","./index.html","./styles.css","./storage-db.js","./plugin-api.js","./vendor/qrcode.min.js","./plugins/dashboard.js","./app.js","./manifest.webmanifest","./release.json","./icons/nourbest.svg","./icons/nourbest-192.png","./icons/nourbest-512.png","./screenshots/desktop.png","./screenshots/mobile.png"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE))));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("message",event=>{if(event.data?.type==="SKIP_WAITING")self.skipWaiting();if(event.data?.type==="REFRESH_CACHE")event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>event.source?.postMessage({type:"CACHE_READY"})));});
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok&&new URL(event.request.url).origin===location.origin){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;}).catch(()=>event.request.mode==="navigate"?caches.match("./index.html"):Response.error())));});
