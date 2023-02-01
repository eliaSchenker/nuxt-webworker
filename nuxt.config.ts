// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          chunkFileNames (chunkInfo) {
            console.log(chunkInfo.name)         
            if (chunkInfo.name.includes('workers')) { 
              return '_nuxt/workers/[name].[hash].js'
             }
            return '_nuxt/[name].[hash].js'
          }
        }
      }
    }
  },
  nitro: {
    routeRules: {
      '/_nuxt/workers/**': { headers: {'Service-Worker-Allowed': '/'} },
    }
  }
})
