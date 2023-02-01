// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  nitro: {
    routeRules: {
      // Tried to add the header to the service worker script using nitro, which unfortunately doesn't work
      '/worker/**': { headers: {'Service-Worker-Allowed': '/', 'Content-Type': 'application/javascript'} },
    }
  }
})
