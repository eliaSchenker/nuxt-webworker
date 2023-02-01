<template>
  <div>
    <h1>Nuxt Service Worker</h1>
    <p>Service worker api available: {{ serviceWorkerAvailable }}</p>
    <p>Worker url: {{  MyWorker }}</p>
    <hr/>
    <div v-if="serviceWorker">
      <p>Active Service Worker</p>
      <p>State: {{ serviceWorker.state }}</p>
      <button @click="update">Update</button><br/><br/>
      <button @click="unregister">Unregister</button><br/><br/>
      <button @clicK="sendMessage">Send message</button><br/><br/>
      <button @click="makeRequest">Make request</button><p>Request should be intercepted by the service worker</p><br/><br/>
    </div>
    <p v-else>No service worker registration found</p>
  </div>
</template>
<script lang="ts" setup>
  import MyWorker from '~/assets/workers/serviceworker.ts?worker&url'

  import { ref, computed } from 'vue';
  import { useIntervalFn } from '@vueuse/core';

  const serviceWorkerAvailable = computed(() => {
    if(process.client) {
      return 'serviceWorker' in window.navigator;
    }
    return false;
  });

  const serviceWorker = useState('serviceWorker', (): ServiceWorker | null | undefined => null);
  const serviceWorkerRegistration = useState('serviceWorkerRegistration', (): ServiceWorkerRegistration | null | undefined => null);

  // Periodically check the registration of the worker and update the ui
  useIntervalFn(() => {
    if (serviceWorkerAvailable.value) {
      window.navigator.serviceWorker.getRegistration(MyWorker).then((registration) => {
        if(registration) {
          serviceWorker.value = registration?.active;
          serviceWorkerRegistration.value = registration;
        } else {
          serviceWorker.value = null;
        }
      });
    }
  }, 1000);

  // Update the service worker
  const update = (() => {
    if (serviceWorkerRegistration.value) {
      serviceWorkerRegistration.value.update();
    }
  });

  // Unregister the service worker
  const unregister = (() => {
    if (serviceWorkerRegistration.value) {
      serviceWorkerRegistration.value.unregister();
    }
  });

  const sendMessage = () => {
    if(serviceWorkerAvailable.value) {
      // Send sample message to the service worker (worker prints the sum of this number using the imported calculator)
      serviceWorker.value?.postMessage(100);
    }
  }

  // Make a test request to /serviceworkertest, which should be intercepted by the service worker
  const makeRequest = () => {
    if(serviceWorkerAvailable.value) {
      const downloadUrl = `serviceworkertest`;
      useFetch(downloadUrl);
    }
  }
</script>