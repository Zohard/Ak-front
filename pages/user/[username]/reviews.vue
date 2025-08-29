<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center space-x-4">
          <NuxtLink :to="`/user/${username}`" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            <Icon name="heroicons:arrow-left" class="w-5 h-5" />
          </NuxtLink>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <img 
                v-if="userProfile?.avatar && !showFallbackAvatar" 
                :src="getAvatarUrl(userProfile.avatar)"
                :alt="userProfile?.pseudo || username"
                class="w-full h-full object-cover rounded-full"
                @error="showFallbackAvatar = true"
              />
              <span v-else class="text-white font-medium">
                {{ (userProfile?.pseudo || username).charAt(0).toUpperCase() }}
              </span>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                Critiques de {{ userProfile?.pseudo || username }}
              </h1>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ totalReviews }} critique{{ totalReviews !== 1 ? 's' : '' }} publiée{{ totalReviews !== 1 ? 's' : '' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- Filters Section -->
      <div class="mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <!-- Search -->
            <div class="flex-1 max-w-md">
              <div class="relative">
                <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  v-model="filters.search"
                  type="text"
                  placeholder="Rechercher dans les critiques..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  @input="debouncedSearch"
                />
              </div>
            </div>

            <!-- Type Filter -->
            <div class="flex space-x-2">
              <button
                v-for="type in typeOptions"
                :key="type.value"
                @click="filters.type = type.value; loadReviews()"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-md border transition-colors',
                  filters.type === type.value
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                ]"
              >
                {{ type.label }}
              </button>
            </div>

            <!-- Sort -->
            <select
              v-model="filters.sort"
              @change="loadReviews()"
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="recent">Plus récentes</option>
              <option value="rating_desc">Mieux notées</option>
              <option value="rating_asc">Moins bien notées</option>
              <option value="views">Plus vues</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
        <span class="ml-3 text-gray-600 dark:text-gray-300">Chargement des critiques...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="rounded-md bg-red-50 dark:bg-red-900/20 p-4 mb-8">
        <div class="flex">
          <Icon name="heroicons:exclamation-triangle" class="h-5 w-5 text-red-400" />
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
              Erreur de chargement
            </h3>
            <div class="mt-2 text-sm text-red-700 dark:text-red-300">
              {{ error }}
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews Grid -->
      <div v-else-if="reviews.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReviewCard
          v-for="review in reviews"
          :key="review.id || review.idCritique"
          :review="normalizeReview(review)"
          @view="handleReviewView"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <Icon name="heroicons:document-text" class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
          {{ hasActiveFilters ? 'Aucune critique trouvée' : 'Aucune critique publiée' }}
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {{ hasActiveFilters ? 'Essayez de modifier vos filtres.' : `${userProfile?.pseudo || username} n'a pas encore publié de critiques.` }}
        </p>
        <div v-if="hasActiveFilters" class="mt-6">
          <button
            @click="clearFilters"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Effacer les filtres
          </button>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="!loading && reviews.length && hasMore" class="text-center mt-8">
        <button
          @click="loadMoreReviews"
          :disabled="loadingMore"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          <Icon v-if="loadingMore" name="heroicons:arrow-path" class="w-4 h-4 animate-spin mr-2" />
          {{ loadingMore ? 'Chargement...' : 'Charger plus de critiques' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ReviewData } from '~/composables/useReviewsAPI'
import ReviewCard from '~/components/reviews/ReviewCard.vue'

// Get username from route params
const route = useRoute()
const username = route.params.username as string

// Page metadata
useHead({
  title: `Critiques de ${username} - Anime-Kun V2`,
  meta: [
    { name: 'description', content: `Toutes les critiques publiées par ${username} sur Anime-Kun` }
  ]
})

// Composables
const config = useRuntimeConfig()
const { getAvatarUrl } = useImageUrl()

// State
const loading = ref(false)
const loadingMore = ref(false)
const error = ref('')
const reviews = ref<any[]>([])
const userProfile = ref<any>(null)
const totalReviews = ref(0)
const hasMore = ref(true)
const currentPage = ref(1)
const showFallbackAvatar = ref(false)

// Filters
const filters = ref({
  search: '',
  type: 'all' as 'all' | 'anime' | 'manga',
  sort: 'recent' as 'recent' | 'rating_desc' | 'rating_asc' | 'views'
})

// Filter options
const typeOptions = [
  { value: 'all', label: 'Toutes' },
  { value: 'anime', label: 'Animes' },
  { value: 'manga', label: 'Mangas' }
]

// Computed
const hasActiveFilters = computed(() => {
  return !!(filters.value.search || 
           filters.value.type !== 'all' || 
           filters.value.sort !== 'recent')
})

// Debounced search
let searchTimeout: NodeJS.Timeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    loadReviews()
  }, 500)
}

// Methods
const loadReviews = async (append = false) => {
  try {
    if (append) {
      loadingMore.value = true
    } else {
      loading.value = true
      currentPage.value = 1
    }
    
    error.value = ''

    const params = new URLSearchParams({
      page: currentPage.value.toString(),
      limit: '12',
      sort: filters.value.sort
    })

    if (filters.value.search) {
      params.append('search', filters.value.search)
    }
    
    if (filters.value.type !== 'all') {
      params.append('type', filters.value.type)
    }

    const response = await $fetch(`${config.public.apiBase}/api/users/public/${username}/reviews?${params}`)
    const newReviews = response.reviews || []
    
    if (append) {
      reviews.value.push(...newReviews)
    } else {
      reviews.value = newReviews
    }
    
    totalReviews.value = response.total || newReviews.length
    hasMore.value = newReviews.length === 12 && reviews.value.length < totalReviews.value

    // Load user profile if not already loaded
    if (!userProfile.value && newReviews.length > 0) {
      const profileResponse = await $fetch(`${config.public.apiBase}/api/users/public/${username}`)
      userProfile.value = profileResponse.user
    }

  } catch (err: any) {
    error.value = err.message || 'Erreur lors du chargement des critiques'
    console.error('Error loading user reviews:', err)
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

const loadMoreReviews = async () => {
  currentPage.value++
  await loadReviews(true)
}

const clearFilters = () => {
  filters.value = {
    search: '',
    type: 'all',
    sort: 'recent'
  }
  loadReviews()
}

const normalizeReview = (r: any): ReviewData => {
  return {
    id: r.id || r.idCritique,
    idCritique: r.idCritique || r.id,
    niceUrl: r.niceUrl,
    titre: r.titre,
    critique: r.critique || r.contenu,
    notation: r.notation || r.note,
    dateCritique: r.reviewDate || r.dateCritique || r.dateCreation,
    statut: typeof r.statut === 'number' ? r.statut : 1,
    idMembre: r.idMembre || r.userId || 0,
    idAnime: r.idAnime || r.animeId || 0,
    idManga: r.idManga || r.mangaId || 0,
    nbClics: r.nbClics || r.nbVues || 0,
    anime: r.anime,
    manga: r.manga,
    membre: r.membre || {
      id: userProfile.value?.id,
      pseudo: userProfile.value?.pseudo || username,
      avatar: userProfile.value?.avatar
    }
  }
}

const handleReviewView = (review: ReviewData) => {
  navigateTo(`/review/${review.id || review.idCritique}`)
}

// Load data on mount
onMounted(() => {
  loadReviews()
})
</script>