export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  const config = useRuntimeConfig()

  // Preserve the original $fetch to avoid recursive interceptor calls on retry
  const originalFetch = globalThis.$fetch
  // Simple flag to prevent concurrent refresh loops
  let isRefreshing = false

  globalThis.$fetch = $fetch.create({
    onRequest({ request, options }) {
      const url = typeof request === 'string' ? request : request.toString()
      const apiBase = (config.public.apiBase || '').replace(/\/$/, '')

      // Never rewrite Nuxt server API calls (/api/*) to backend baseURL
      const isNuxtServerApi = url.startsWith('/api/') && !url.startsWith('/api/proxy/')
      const isBackendUrl = apiBase && (url.startsWith(apiBase))
      const isMedia = url.startsWith('/media/')

      if (!isNuxtServerApi && (isBackendUrl || isMedia)) {
        if (!url.startsWith('http')) {
          options.baseURL = config.public.apiBase
        }
      }

      // Always attach auth headers to both Nuxt server API and backend calls
      const headers = authStore.getAuthHeaders()
      if (headers && (headers as any).Authorization) {
        options.headers = {
          ...(options.headers as any || {}),
          ...headers
        }
      }
    },
    onResponseError({ response, request, options }) {
      // Handle 401 errors by attempting token refresh exactly once
      const hasRefresh = !!((authStore.refreshToken as unknown as { value: string | null })?.value)
      if (response.status === 401 && hasRefresh && !isRefreshing) {
        isRefreshing = true
        return authStore.refreshAccessToken()
          .then(() => {
            // Retry original request with fresh token using the original (un-intercepted) fetch
            const retryOptions = {
              ...(options || {}),
              headers: {
                ...((options && (options as any).headers) || {}),
                ...authStore.getAuthHeaders()
              }
            } as any
            return originalFetch(request as any, retryOptions)
          })
          .catch(() => {
            // Refresh failed, redirect to login on client
            if (process.client) {
              navigateTo('/login')
            }
          })
          .finally(() => {
            isRefreshing = false
          })
      }
    }
  })
})
