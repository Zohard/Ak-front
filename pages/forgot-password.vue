<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 flex items-center justify-center">
          <img 
            src="/logo.svg" 
            alt="Anime-Kun" 
            class="h-12 w-12"
            @error="hideImage"
          />
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Mot de passe oublié
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Entrez votre adresse email pour recevoir un lien de réinitialisation
        </p>
      </div>

      <!-- Success message -->
      <div v-if="success" class="rounded-md bg-green-50 dark:bg-green-900/20 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <Icon name="heroicons:check-circle" class="h-5 w-5 text-green-400" />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800 dark:text-green-200">
              Email envoyé avec succès
            </h3>
            <div class="mt-2 text-sm text-green-700 dark:text-green-300">
              Un lien de réinitialisation a été envoyé à votre adresse email. Vérifiez votre boîte de réception et vos spams.
            </div>
          </div>
        </div>
      </div>

      <form v-if="!success" class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Adresse email
          </label>
          <input
            id="email"
            v-model="form.email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="form-input"
            placeholder="votre@email.com"
            :class="{ 'border-red-500': errors.email }"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ errors.email }}
          </p>
        </div>

        <!-- Error message -->
        <div v-if="error" class="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <Icon name="heroicons:exclamation-triangle" class="h-5 w-5 text-red-400" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
                Erreur
              </h3>
              <div class="mt-2 text-sm text-red-700 dark:text-red-300">
                {{ error }}
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <Icon v-else name="heroicons:envelope" class="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
            </span>
            {{ loading ? 'Envoi...' : 'Envoyer le lien' }}
          </button>
        </div>

        <div class="text-center">
          <NuxtLink 
            to="/login" 
            class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Retour à la connexion
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page metadata
useHead({
  title: 'Mot de passe oublié - Anime-Kun',
  meta: [
    { name: 'description', content: 'Réinitialisez votre mot de passe Anime-Kun' }
  ]
})

// Form state
const form = reactive({
  email: ''
})

const loading = ref(false)
const success = ref(false)
const error = ref('')
const errors = reactive({
  email: ''
})

// Validation
const validateForm = () => {
  errors.email = ''
  
  if (!form.email) {
    errors.email = 'L\'adresse email est requise'
    return false
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errors.email = 'Format d\'email invalide'
    return false
  }
  
  return true
}

// Submit handler
const handleSubmit = async () => {
  if (!validateForm()) return
  
  loading.value = true
  error.value = ''
  
  try {
    const authStore = useAuthStore()
    await authStore.forgotPassword(form.email)
    success.value = true
  } catch (err: any) {
    error.value = err.message || 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
}

const hideImage = (event: Event) => {
  (event.target as HTMLImageElement).style.display = 'none'
}
</script>

<style scoped>
.form-input {
  @apply w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white;
}

.form-input:focus {
  @apply ring-2 ring-blue-500 border-blue-500;
}
</style>
