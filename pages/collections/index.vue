<template>
  <div class="main-content">
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="section-title flex items-center gap-3">
        <Icon name="heroicons:globe-alt" class="w-8 h-8 text-purple-600 dark:text-purple-400" />
        Collections Publiques
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Découvrez les collections d'animes et mangas partagées par la communauté
      </p>
    </div>

    <!-- View Mode Toggle -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div class="flex items-center justify-center">
        <div class="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              viewMode === 'collections' 
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            ]"
            @click="viewMode = 'collections'"
          >
            <Icon name="heroicons:rectangle-stack" size="xs" class="mr-2" />
            Collections Publiques
          </button>
          <button
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              viewMode === 'users' 
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            ]"
            @click="viewMode = 'users'"
          >
            <Icon name="heroicons:users" size="xs" class="mr-2" />
            Parcourir les Utilisateurs
          </button>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Recherche
          </label>
          <input
            v-model="searchTerm"
            type="text"
            :placeholder="viewMode === 'users' ? 'Nom d\'utilisateur...' : 'Nom de la collection...'"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <!-- Sort -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Trier par
          </label>
          <select 
            v-model="sortBy" 
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
          >
            <template v-if="viewMode === 'users'">
              <option value="username">Nom A-Z</option>
              <option value="-username">Nom Z-A</option>
              <option value="totalItems">Plus d'éléments</option>
              <option value="-totalItems">Moins d'éléments</option>
            </template>
            <template v-else>
              <option value="createdAt">Plus récentes</option>
              <option value="-createdAt">Plus anciennes</option>
              <option value="name">Nom A-Z</option>
              <option value="-name">Nom Z-A</option>
              <option value="itemCount">Plus d'éléments</option>
              <option value="-itemCount">Moins d'éléments</option>
            </template>
          </select>
        </div>

        <!-- Create Collection (if logged in) -->
        <div class="flex items-end">
          <NuxtLink 
            v-if="authStore.isAuthenticated"
            to="/my-collections"
            class="btn-primary flex items-center gap-2 w-full justify-center"
          >
            <Icon name="heroicons:plus" size="sm" />
            Mes Collections
          </NuxtLink>
          <NuxtLink 
            v-else
            to="/login"
            class="btn-secondary flex items-center gap-2 w-full justify-center"
          >
            <Icon name="heroicons:user" size="sm" />
            Se connecter
          </NuxtLink>
        </div>
      </div>

      <!-- Active filters display -->
      <div v-if="searchTerm" class="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <span class="text-sm text-gray-600 dark:text-gray-400">Filtres actifs:</span>
        
        <span class="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full">
          Recherche: "{{ searchTerm }}"
          <button @click="searchTerm = ''" class="hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5">
            <Icon name="heroicons:x-mark" class="w-3 h-3" />
          </button>
        </span>
        
        <button 
          @click="clearFilters"
          class="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
        >
          Tout effacer
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="pending" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
      <span class="ml-3 text-gray-600 dark:text-gray-300">Chargement des collections...</span>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-12">
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6 max-w-md mx-auto">
        <Icon name="heroicons:exclamation-triangle" class="w-8 h-8 text-red-500 mx-auto mb-3" />
        <h3 class="text-lg font-medium text-red-800 dark:text-red-200 mb-2">Erreur de chargement</h3>
        <p class="text-red-600 dark:text-red-300 text-sm mb-4">{{ error }}</p>
        <Button @click="refresh" variant="secondary">Réessayer</Button>
      </div>
    </div>

    <!-- Users Grid (when viewMode === 'users') -->
    <div v-if="viewMode === 'users' && data?.data?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="user in data.data"
        :key="user.id"
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 group"
      >
        <!-- User Header -->
        <div class="p-6 border-b border-gray-100 dark:border-gray-700">
          <div class="flex items-start gap-3 mb-3">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
              <span class="text-white font-semibold text-lg">{{ user.username.charAt(0).toUpperCase() }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-lg text-gray-900 dark:text-white truncate">
                {{ user.username }}
              </h3>
              <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Icon name="heroicons:calendar" size="xs" />
                <span>Membre depuis {{ formatDate(user.joinedAt) }}</span>
              </div>
            </div>
          </div>
          
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span class="flex items-center gap-1">
                <Icon name="heroicons:film" size="xs" />
                {{ user.totalPublicAnimes }} animes
              </span>
              <span class="flex items-center gap-1">
                <Icon name="heroicons:book-open" size="xs" />
                {{ user.totalPublicMangas }} mangas
              </span>
            </div>
            <span class="text-sm font-medium text-purple-600 dark:text-purple-400">
              {{ user.totalPublicItems }} total
            </span>
          </div>
          
          <!-- Collection Types Summary -->
          <div class="space-y-2">
            <div
              v-for="collection in user.collections"
              :key="collection.type"
              class="flex items-center justify-between text-xs"
            >
              <span class="text-gray-600 dark:text-gray-400">{{ collection.name }}</span>
              <div class="flex items-center gap-2">
                <span class="text-purple-600 dark:text-purple-400">{{ collection.animeCount }}A</span>
                <span class="text-blue-600 dark:text-blue-400">{{ collection.mangaCount }}M</span>
              </div>
            </div>
          </div>
        </div>

        <!-- User Actions -->
        <div class="p-6">
          <NuxtLink 
            :to="`/user/${user.username}`"
            class="block w-full text-center py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200 mb-2"
          >
            Voir le profil
            <Icon name="heroicons:user" size="xs" class="ml-2" />
          </NuxtLink>
          <NuxtLink 
            :to="`/collections/user/${user.id}`"
            class="block w-full text-center py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200"
          >
            Voir les collections
            <Icon name="heroicons:rectangle-stack" size="xs" class="ml-2" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Collections Grid (when viewMode === 'collections') -->
    <div v-else-if="viewMode === 'collections' && data?.collections?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="collection in data.collections"
        :key="collection.id"
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 group"
      >
        <!-- Collection Header -->
        <div class="p-6 border-b border-gray-100 dark:border-gray-700">
          <div class="flex items-start gap-3 mb-3">
            <div :class="[
              'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
              getCollectionColor(collection)
            ]">
              <Icon :name="getCollectionIcon(collection)" size="sm" class="text-white" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-lg text-gray-900 dark:text-white truncate">
                {{ collection.name }}
              </h3>
              <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Icon name="heroicons:user" size="xs" />
                <span class="truncate">{{ collection.user?.pseudo || 'Utilisateur' }}</span>
                <span>•</span>
                <Icon name="heroicons:calendar" size="xs" />
                <span>{{ formatDate(collection.createdAt) }}</span>
              </div>
            </div>
          </div>
          
          <p v-if="collection.description" class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
            {{ collection.description }}
          </p>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span class="flex items-center gap-1">
                <Icon name="heroicons:rectangle-stack" size="xs" />
                {{ collection.itemCount || 0 }} éléments
              </span>
              <span class="flex items-center gap-1">
                <Icon name="heroicons:globe-alt" size="xs" />
                Public
              </span>
            </div>
          </div>
        </div>

        <!-- Collection Preview/Actions -->
        <div class="p-6">
          <NuxtLink 
            :to="`/collections/${collection.id}`"
            class="block w-full text-center py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Voir la collection
            <Icon name="heroicons:arrow-right" size="xs" class="ml-2" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-12">
      <Icon 
        :name="viewMode === 'users' ? 'heroicons:users' : 'heroicons:rectangle-stack'" 
        class="w-16 h-16 text-gray-400 mx-auto mb-4" 
      />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {{ getEmptyStateTitle() }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400 mb-4">
        {{ getEmptyStateDescription() }}
      </p>
      <div v-if="searchTerm" class="space-y-2">
        <Button @click="clearFilters" variant="secondary">
          Effacer les filtres
        </Button>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="getPaginationInfo()?.totalPages > 1" class="flex justify-center mt-8">
      <div class="flex items-center space-x-1">
        <!-- Previous button -->
        <Button
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
          variant="secondary"
          size="sm"
        >
          <Icon name="heroicons:chevron-left" size="xs" class="mr-1" />
          Précédent
        </Button>

        <!-- Page numbers -->
        <div class="flex items-center gap-1">
          <Button
            v-for="page in visiblePages"
            :key="page"
            :variant="page === currentPage ? 'primary' : 'ghost'"
            size="sm"
            @click="goToPage(page)"
          >
            {{ page }}
          </Button>
        </div>

        <!-- Next button -->
        <Button
          :disabled="currentPage === getPaginationInfo()?.totalPages"
          @click="goToPage(currentPage + 1)"
          variant="secondary"
          size="sm"
        >
          Suivant
          <Icon name="heroicons:chevron-right" size="xs" class="ml-1" />
        </Button>
      </div>
    </div>

    <!-- Results summary -->
    <div v-if="getPaginationInfo()" class="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
      {{ getResultsSummary() }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Collection } from '~/types'

// Page metadata
useHead({
  title: 'Collections Publiques - Anime-Kun',
  meta: [
    { name: 'description', content: 'Découvrez les collections d\'animes et mangas partagées par la communauté' }
  ]
})

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

// State
const currentPage = ref(1)
const searchTerm = ref('')
const sortBy = ref('createdAt')
const viewMode = ref<'collections' | 'users'>('collections')

// Initialize from query params
if (route.query.page) currentPage.value = parseInt(route.query.page as string) || 1
if (route.query.search) searchTerm.value = route.query.search as string
if (route.query.sort) sortBy.value = route.query.sort as string
if (route.query.view) viewMode.value = route.query.view as 'collections' | 'users'

// Debounced search to avoid too many API calls
const debouncedSearchTerm = refDebounced(searchTerm, 500)

// Reset to page 1 when filters change
watch([debouncedSearchTerm, sortBy, viewMode], () => {
  currentPage.value = 1
  // Reset sort when switching view modes
  if (viewMode.value === 'users' && !['username', '-username', 'totalItems', '-totalItems'].includes(sortBy.value)) {
    sortBy.value = 'username'
  } else if (viewMode.value === 'collections' && !['createdAt', '-createdAt', 'name', '-name', 'itemCount', '-itemCount'].includes(sortBy.value)) {
    sortBy.value = 'createdAt'
  }
})

// Helper to get pagination info based on current view mode
const getPaginationInfo = () => {
  if (viewMode.value === 'users') {
    return data.value?.meta
  } else {
    return data.value?.pagination
  }
}

// Visible pages for pagination
const visiblePages = computed(() => {
  const pagination = getPaginationInfo()
  if (!pagination?.totalPages) return []
  
  const totalPages = pagination.totalPages
  const current = currentPage.value
  const delta = 2
  
  let start = Math.max(1, current - delta)
  let end = Math.min(totalPages, current + delta)
  
  if (current - delta <= 1) {
    end = Math.min(totalPages, 5)
  }
  if (current + delta >= totalPages) {
    start = Math.max(1, totalPages - 4)
  }
  
  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Helper methods for empty state
const getEmptyStateTitle = () => {
  if (viewMode.value === 'users') {
    return searchTerm.value ? 'Aucun utilisateur trouvé' : 'Aucun utilisateur avec des collections publiques'
  } else {
    return searchTerm.value ? 'Aucune collection trouvée' : 'Aucune collection publique'
  }
}

const getEmptyStateDescription = () => {
  if (searchTerm.value) {
    return 'Essayez avec d\'autres mots-clés'
  }
  
  if (viewMode.value === 'users') {
    return 'Aucun utilisateur n\'a encore partagé de collections publiques'
  } else {
    return 'Les utilisateurs n\'ont pas encore partagé de collections publiques'
  }
}

const getResultsSummary = () => {
  const pagination = getPaginationInfo()
  if (!pagination) return ''
  
  const itemType = viewMode.value === 'users' ? 'utilisateurs' : 'collections'
  const start = ((currentPage.value - 1) * 12) + 1
  const end = Math.min(currentPage.value * 12, pagination.total)
  
  return `Affichage de ${start} à ${end} sur ${pagination.total} ${itemType}`
}

// Fetch data with reactive filters
const { data, pending, error, refresh } = await useFetch(() => {
  const endpoint = viewMode.value === 'users' 
    ? '/api/collections/browse'
    : '/api/collections'
  return endpoint
}, {
  baseURL: useRuntimeConfig().public.apiBase,
  params: computed(() => {
    const baseParams = {
      page: currentPage.value,
      limit: 12,
      search: debouncedSearchTerm.value || undefined
    }
    
    if (viewMode.value === 'users') {
      return {
        ...baseParams,
        sortBy: sortBy.value || undefined
      }
    } else {
      return {
        ...baseParams,
        isPublic: true,
        sortBy: sortBy.value || undefined
      }
    }
  }),
  key: computed(() => `collections-${viewMode.value}`),
  watch: [currentPage, debouncedSearchTerm, sortBy, viewMode]
})

// Methods
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const getCollectionColor = (collection: Collection) => {
  const colors = [
    'bg-purple-600',
    'bg-blue-600', 
    'bg-green-600',
    'bg-red-600',
    'bg-yellow-600',
    'bg-indigo-600',
    'bg-pink-600',
    'bg-orange-600'
  ]
  return colors[collection.id % colors.length]
}

const getCollectionIcon = (collection: Collection) => {
  const icons = [
    'heroicons:star',
    'heroicons:heart',
    'heroicons:bookmark',
    'heroicons:film',
    'heroicons:book-open',
    'heroicons:trophy',
    'heroicons:fire',
    'heroicons:sparkles'
  ]
  return icons[collection.id % icons.length]
}

const goToPage = async (page: number) => {
  currentPage.value = page
  await updateURL()
}

const updateURL = async () => {
  await nextTick()
  
  const query: Record<string, string> = {}
  if (currentPage.value > 1) query.page = currentPage.value.toString()
  if (searchTerm.value) query.search = searchTerm.value
  const defaultSort = viewMode.value === 'users' ? 'username' : 'createdAt'
  if (sortBy.value !== defaultSort) query.sort = sortBy.value
  if (viewMode.value !== 'collections') query.view = viewMode.value
  
  const currentQuery = route.query
  const hasChanged = JSON.stringify(query) !== JSON.stringify(currentQuery)
  
  if (hasChanged) {
    try {
      await router.push({ query })
    } catch (error) {
      console.debug('Navigation ignored:', error)
    }
  }
}

const clearFilters = () => {
  searchTerm.value = ''
  sortBy.value = viewMode.value === 'users' ? 'username' : 'createdAt'
}

// Update URL when filters change
watch([searchTerm, sortBy, viewMode], () => {
  clearTimeout(updateURLTimeout)
  updateURLTimeout = setTimeout(updateURL, 300)
})

let updateURLTimeout: NodeJS.Timeout
</script>

<style scoped>
.page-header {
  @apply text-center mb-8;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
