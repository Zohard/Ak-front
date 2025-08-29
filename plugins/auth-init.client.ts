export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  
  // Initialize auth on app start (only once)
  if (!authStore.isReady) {
    authStore.initializeAuth()
  }
})