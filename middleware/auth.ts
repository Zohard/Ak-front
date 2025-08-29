export default defineNuxtRouteMiddleware(async (to, from) => {
  // Client-only guard
  if (process.server) return

  const authStore = useAuthStore()

  // Known public auth routes
  const publicAuthRoutes = new Set(['/login', '/register', '/forgot-password'])
  if (publicAuthRoutes.has(to.path)) return

  // Ensure auth is initialized once before checking
  if (!authStore.isReady) {
    authStore.initializeAuth()
    await nextTick()
  }

  // Consider both reactive state and persisted token to avoid false negatives during init
  const hasTokenRef = (authStore.accessToken as unknown as { value: string | null })?.value
  const hasTokenLS = process.client ? localStorage.getItem('access_token') : null
  const isLoggedIn = !!(hasTokenRef || hasTokenLS)
  if (!isLoggedIn) {
    const redirectPath = to.fullPath
    return navigateTo(`/login?redirect=${encodeURIComponent(redirectPath)}`)
  }
})
