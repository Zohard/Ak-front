<template>
  <div class="main-content">
    <div class="page-header">
      <h1 class="section-title flex items-center gap-3">
        <Icon name="heroicons:film" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
        Animes
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Découvrez notre collection d'animes avec critiques et notes de la communauté
      </p>
    </div>

    <!-- Filters and Search -->
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
            placeholder="Nom de l'anime..."
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <!-- Genre filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Genre
          </label>
          <select 
            v-model="selectedGenre" 
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Tous les genres</option>
            <option value="Action">Action</option>
            <option value="Aventure">Aventure</option>
            <option value="Comédie">Comédie</option>
            <option value="Drame">Drame</option>
            <option value="Fantastique">Fantastique</option>
            <option value="Romance">Romance</option>
            <option value="Science-fiction">Science-fiction</option>
          </select>
        </div>

        <!-- Year filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Année
          </label>
          <select 
            v-model="selectedYear" 
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Toutes les années</option>
            <option v-for="year in yearOptions" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>

      </div>

      <!-- Active filters display -->
      <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <span class="text-sm text-gray-600 dark:text-gray-400">Filtres actifs:</span>
        
        <span v-if="searchTerm" class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
          Recherche: "{{ searchTerm }}"
          <button @click="searchTerm = ''" class="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5">
            <Icon name="heroicons:x-mark" class="w-3 h-3" />
          </button>
        </span>
        
        <span v-if="selectedGenre" class="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
          Genre: {{ selectedGenre }}
          <button @click="selectedGenre = ''" class="hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5">
            <Icon name="heroicons:x-mark" class="w-3 h-3" />
          </button>
        </span>
        
        <span v-if="selectedYear" class="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full">
          Année: {{ selectedYear }}
          <button @click="selectedYear = ''" class="hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5">
            <Icon name="heroicons:x-mark" class="w-3 h-3" />
          </button>
        </span>
        
        <button 
          @click="clearAllFilters"
          class="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
        >
          Tout effacer
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="pending" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
      <span class="ml-3 text-gray-600 dark:text-gray-300">Chargement des animes...</span>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-12">
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6 max-w-md mx-auto">
        <h3 class="text-lg font-medium text-red-800 dark:text-red-200 mb-2">Erreur de chargement</h3>
        <p class="text-red-600 dark:text-red-300 text-sm mb-4">{{ error }}</p>
        <button @click="refresh" class="btn-primary">Réessayer</button>
      </div>
    </div>

    <!-- Animes grid -->
    <div v-else-if="data?.animes?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="anime in data.animes"
        :key="anime.id"
        class="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        @click="viewAnime(anime)"
      >
        <!-- Image -->
        <div class="relative">
          <div class="aspect-[3/4] overflow-hidden">
            <img
              v-if="anime.image"
              :src="getImageUrl(anime.image, 'anime')"
              :alt="anime.titre"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              @error="(e) => handleImageError(e, undefined, 'anime')"
            />
            <div 
              v-else 
              class="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex flex-col items-center justify-center p-4"
            >
              <Icon name="heroicons:film" class="w-16 h-16 text-blue-500 dark:text-blue-400 mb-3" />
              <div class="text-center">
                <p class="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">{{ anime.titre }}</p>
                <p class="text-xs text-blue-600 dark:text-blue-400">Image bientôt disponible</p>
              </div>
            </div>
          </div>
          
          <!-- Rating overlay -->
          <div 
            v-if="anime.moyenneNotes && anime.moyenneNotes > 0" 
            class="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
          >
            <Icon name="heroicons:star" class="w-3 h-3 text-yellow-400" />
            <span>{{ (anime.moyenneNotes).toFixed(1) }}</span>
          </div>

          <!-- Episode count -->
          <div 
            v-if="anime.nbEp" 
            class="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold"
          >
            {{ anime.nbEp }} ép.
          </div>
        </div>

        <!-- Content -->
        <div class="p-4 space-y-3">
          <h3 class="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2 leading-tight">
            {{ anime.titre }}
          </h3>
          
          <div class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span v-if="anime.annee" class="flex items-center gap-1">
              <Icon name="heroicons:calendar" class="w-3 h-3" />
              {{ anime.annee }}
            </span>
            <span v-if="anime.realisateur" class="flex items-center gap-1">
              <Icon name="heroicons:tv" class="w-3 h-3" />
              {{ anime.realisateur }}
            </span>
          </div>

          <p 
            v-if="anime.synopsis" 
            class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed"
          >
            {{ anime.synopsis }}
          </p>

          <!-- Stats -->
          <div class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
            <span v-if="anime.nbReviews" class="flex items-center gap-1">
              <Icon name="heroicons:chat-bubble-left" class="w-3 h-3" />
              {{ anime.nbReviews }} avis
            </span>
            <span class="text-blue-600 dark:text-blue-400 font-medium">Voir plus</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-12">
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">Aucun anime trouvé</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Aucun anime disponible pour le moment.</p>
    </div>

    <!-- Advanced Pagination -->
    <div v-if="data?.pagination?.totalPages > 1" class="flex justify-center mt-8">
      <div class="flex items-center space-x-1">
        <!-- Previous button -->
        <button
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
          class="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-1"
        >
          <Icon name="heroicons:chevron-left" class="w-4 h-4" />
          Précédent
        </button>

        <!-- Page numbers -->
        <div class="flex items-center">
          <!-- First page -->
          <button
            v-if="visiblePages[0] > 1"
            @click="goToPage(1)"
            class="px-3 py-2 text-sm bg-white dark:bg-gray-800 border-t border-b border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            1
          </button>
          
          <!-- First ellipsis -->
          <span 
            v-if="visiblePages[0] > 2"
            class="px-2 py-2 text-sm bg-white dark:bg-gray-800 border-t border-b border-gray-300 dark:border-gray-600 text-gray-500"
          >
            ...
          </span>

          <!-- Page numbers -->
          <button
            v-for="page in visiblePages"
            :key="page"
            :class="[
              'px-3 py-2 text-sm border-t border-b border-gray-300 dark:border-gray-600',
              page === currentPage
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
            ]"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>

          <!-- Last ellipsis -->
          <span 
            v-if="visiblePages[visiblePages.length - 1] < data.pagination.totalPages - 1"
            class="px-2 py-2 text-sm bg-white dark:bg-gray-800 border-t border-b border-gray-300 dark:border-gray-600 text-gray-500"
          >
            ...
          </span>

          <!-- Last page -->
          <button
            v-if="visiblePages[visiblePages.length - 1] < data.pagination.totalPages"
            @click="goToPage(data.pagination.totalPages)"
            class="px-3 py-2 text-sm bg-white dark:bg-gray-800 border-t border-b border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            {{ data.pagination.totalPages }}
          </button>
        </div>

        <!-- Next button -->
        <button
          :disabled="currentPage === data.pagination.totalPages"
          @click="goToPage(currentPage + 1)"
          class="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-1"
        >
          Suivant
          <Icon name="heroicons:chevron-right" class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Results summary -->
    <div v-if="data?.pagination" class="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
      Affichage de {{ ((currentPage - 1) * 12) + 1 }} à {{ Math.min(currentPage * 12, data.pagination.total) }} sur {{ data.pagination.total }} animes
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Anime } from '~/types'

// Page metadata
useHead({
  title: 'Animes - Anime-Kun',
  meta: [
    { name: 'description', content: 'Découvrez notre collection d\'animes avec critiques et notes de la communauté' }
  ]
})

// State
const currentPage = ref(1)
const searchTerm = ref('')
const selectedGenre = ref('')
const selectedYear = ref('')
const route = useRoute()
const router = useRouter()
const { getImageUrl, handleImageError } = useImageUrl()

// Initialize from query params
if (route.query.page) currentPage.value = parseInt(route.query.page as string) || 1
if (route.query.search) searchTerm.value = route.query.search as string
if (route.query.genre) selectedGenre.value = route.query.genre as string
if (route.query.year) selectedYear.value = route.query.year as string

// Year options (last 30 years)
const currentYear = new Date().getFullYear()
const yearOptions = Array.from({ length: 30 }, (_, i) => currentYear - i)

// Debounced search to avoid too many API calls
const debouncedSearchTerm = refDebounced(searchTerm, 500)

// Reset to page 1 when filters change
watch([debouncedSearchTerm, selectedGenre, selectedYear], () => {
  currentPage.value = 1
})

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return !!(searchTerm.value || selectedGenre.value || selectedYear.value)
})

// Visible pages for pagination
const visiblePages = computed(() => {
  if (!data.value?.pagination?.totalPages) return []
  
  const totalPages = data.value.pagination.totalPages
  const current = currentPage.value
  const delta = 2 // Number of pages to show on each side of current page
  
  let start = Math.max(1, current - delta)
  let end = Math.min(totalPages, current + delta)
  
  // Adjust if we're near the beginning or end
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

// Fetch data with auto-retry and reactive filters
const { data, pending, error, refresh } = await useFetch('/api/animes', {
  baseURL: useRuntimeConfig().public.apiBase,
  params: computed(() => ({
    page: currentPage.value,
    limit: 12,
    search: debouncedSearchTerm.value || undefined,
    genre: selectedGenre.value || undefined,
    year: selectedYear.value ? parseInt(selectedYear.value) : undefined
  })),
  key: 'animes-list',
  watch: [currentPage, debouncedSearchTerm, selectedGenre, selectedYear]
})

// Methods
const viewAnime = (anime: Anime) => {
  const targetUrl = `/anime/${anime.niceUrl || anime.id}`
  navigateTo(targetUrl)
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
  if (selectedGenre.value) query.genre = selectedGenre.value
  if (selectedYear.value) query.year = selectedYear.value
  
  // Only push if query actually changed
  const currentQuery = route.query
  const hasChanged = JSON.stringify(query) !== JSON.stringify(currentQuery)
  
  if (hasChanged) {
    try {
      await router.push({ query })
    } catch (error) {
      // Ignore navigation errors (like duplicate navigation)
      console.debug('Navigation ignored:', error)
    }
  }
}

const clearAllFilters = () => {
  searchTerm.value = ''
  selectedGenre.value = ''
  selectedYear.value = ''
}

// Update URL when filters change (debounced to prevent too many updates)
watch([searchTerm, selectedGenre, selectedYear], () => {
  // Use a simple timeout-based debounce instead of refDebounced for watch callbacks
  clearTimeout(updateURLTimeout)
  updateURLTimeout = setTimeout(updateURL, 300)
})

let updateURLTimeout: NodeJS.Timeout
</script>

<style scoped>
.page-header {
  @apply text-center mb-8;
}
</style>