export default defineNuxtRouteMiddleware(async (to, from) => {
  // Client-only guard
  if (process.server) return

  const authStore = useAuthStore()

  // Ensure auth store initialized before checking
  if (!authStore.isReady) {
    authStore.initializeAuth()
    await nextTick()
  }

  // Pinia refs need .value in JS
  const isLoggedIn = !!(authStore.isAuthenticated as unknown as { value: boolean }).value

  // If already logged in, keep users out of guest-only pages
  if (isLoggedIn) {
    const fallback = '/'
    let target = (to.query.redirect as string) || fallback
    // Prevent redirecting back to login which would create a loop
    if (typeof target === 'string' && target.startsWith('/login')) {
      target = fallback
    }
    return navigateTo(target)
  }
})
