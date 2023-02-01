// Serviceworker example

// Sample import, to check if imports are working
import { Calculator } from "~~/calculator/calculator";

declare var self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event) => {
    console.log('Installed');

    event.waitUntil(self.skipWaiting());
});
  
self.addEventListener('activate', (event) => {
    console.log('Activating');
    event.waitUntil(clients.claim());
    console.log('Claimed', clients)
});

self.addEventListener('message', (event) => {
    console.log('Message', event.data);
    console.log('Import test', new Calculator().sumUpTo(1000)); // Imports should work in the service worker
});

self.addEventListener('fetch', (event) => {
    console.log('Request in SW', event.request);
});


export {};
