import {defineNuxtPlugin} from "#app";
//Import worker from the worker directory
import MyWorker from '~/worker/serviceworker.ts?worker&url';

// Plugin to register the service worker on app mount
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.hook('app:mounted', () => {
        if ('serviceWorker' in window.navigator) {
            // Scope needs to be root (/), so that the service worker works on all pages.
            window.navigator.serviceWorker.register(MyWorker, {scope: '/', type: 'module'}).then(() => {
                console.log('Service worker has been registered')
            }).catch((error) => {
                console.log('Service worker registration failed', error);
            });
        
        }
    })
});
