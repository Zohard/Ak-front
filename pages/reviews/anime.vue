<template>
  <div class="anime-reviews-page">
    <!-- Hero Section -->
    <div class="hero-section bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4">
            <Icon name="heroicons:film" class="w-12 h-12 text-blue-200" />
Critiques d'Animes
          </h1>
          <p class="text-xl md:text-2xl mb-6 opacity-90">
            Découvrez les avis de la communauté sur vos animes préférés
          </p>
          <div class="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <div class="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span class="font-semibold">{{ totalReviews }}</span> critiques d'animes
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Top Reviews -->
      <div class="mb-8">
        <TopReviews :limit="6" default-type="anime" />
      </div>

      <!-- Filters Section -->
      <div class="mb-8">
        <ReviewFiltersComponent
          :filters="filters"
          :results-count="filteredReviewsCount"
          search-placeholder="Titre, contenu, anime..."
          media-type="anime"
          @update:filters="updateFilters"
          @clear="clearFilters"
        />
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
        <span class="ml-3 text-gray-600 dark:text-gray-300">Chargement des critiques d'animes...</span>
      </div>

      <!-- Error state -->
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
            <div class="mt-4">
              <button
                @click="() => loadReviews()"
                class="btn-primary"
              >
                Réessayer
              </button>
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
          @favorite="handleFavorite"
          @view="handleReviewView"
        />
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-12">
        <Icon name="heroicons:film" class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
          Aucune critique d'anime trouvée
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {{ hasActiveFilters ? 'Essayez de modifier vos filtres.' : 'Aucune critique d\'anime disponible pour le moment.' }}
        </p>
        <div v-if="hasActiveFilters" class="mt-6">
          <button
            @click="() => clearFilters()"
            class="btn-primary"
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
          class="btn-primary"
        >
          <Icon v-if="loadingMore" name="heroicons:arrow-path" class="w-4 h-4 animate-spin mr-2" />
          {{ loadingMore ? 'Chargement...' : 'Charger plus de critiques' }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { ReviewData, ReviewFilters } from '~/composables/useReviewsAPI'
import ReviewCard from '~/components/reviews/ReviewCard.vue'
import ReviewFiltersComponent from '~/components/reviews/ReviewFilters.vue'
import TopReviews from '~/components/reviews/TopReviews.vue'

// Page Meta
definePageMeta({
  title: 'Critiques d\'Animes',
  description: 'Découvrez les critiques et avis de la communauté sur vos animes préférés'
})

// SEO
useSeoMeta({
  title: 'Critiques d\'Animes - Anime-Kun',
  description: 'Découvrez les critiques et avis de la communauté sur vos animes préférés. Notes, commentaires et recommandations par des passionnés.',
  ogTitle: 'Critiques d\'Animes - Anime-Kun',
  ogDescription: 'Découvrez les critiques et avis de la communauté sur vos animes préférés.'
})

// State
const loading = ref(false)
const loadingMore = ref(false)
const error = ref('')
const reviews = ref<ReviewData[]>([])
const totalReviews = ref(0)
const hasMore = ref(true)
const currentPage = ref(1)

// Filters
const filters = ref<ReviewFilters>({
  search: '',
  type: 'anime', // Always anime for this page
  rating: null,
  sort: 'recent',
  author: '',
  tags: []
})

// API composables
const reviewsAPI = useReviewsAPI()
const route = useRoute()
const router = useRouter()

// Computed
const filteredReviewsCount = computed(() => reviews.value.length)

const hasActiveFilters = computed(() => {
  return !!(filters.value.search || 
           filters.value.rating || 
           filters.value.sort !== 'recent' || 
           filters.value.author ||
           filters.value.tags?.length)
})

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

    const params = {
      ...filters.value,
      page: currentPage.value,
      limit: 12
    }

    const response = await reviewsAPI.fetchReviews(params)
    const newReviews = (response as any).reviews || (response as any).data || []
    
    if (append) {
      reviews.value.push(...newReviews)
    } else {
      reviews.value = newReviews
    }
    
    totalReviews.value = (response as any).total || newReviews.length
    hasMore.value = newReviews.length === params.limit && reviews.value.length < totalReviews.value

  } catch (err: any) {
    error.value = err.message || 'Erreur lors du chargement des critiques'
    console.error('Error loading anime reviews:', err)
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

const loadMoreReviews = async () => {
  currentPage.value++
  await loadReviews(true)
}

const updateFilters = (newFilters: ReviewFilters) => {
  filters.value = { ...newFilters, type: 'anime' } // Ensure type stays anime
  loadReviews()
  
  // Update URL parameters
  const query: Record<string, string> = {}
  if (newFilters.search) query.search = newFilters.search
  if (newFilters.rating) query.rating = newFilters.rating.toString()
  if (newFilters.sort && newFilters.sort !== 'recent') query.sort = newFilters.sort
  if (newFilters.author) query.author = newFilters.author
  
  router.replace({ query })
}

const clearFilters = () => {
  filters.value = {
    search: '',
    type: 'anime',
    rating: null,
    sort: 'recent',
    author: '',
    tags: []
  }
  loadReviews()
  router.replace({ query: {} })
}

const handleFavorite = (reviewId: number, isFavorite: boolean) => {
  console.log('Toggle favorite:', reviewId, isFavorite)
  // TODO: Implement favorite functionality
}

const normalizeReview = (r: any): ReviewData => {
  // Ensure ReviewCard gets the expected structure
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
    membre: r.membre ? {
      id: r.membre.id || r.membre.idMember,
      pseudo: r.membre.pseudo || r.membre.memberName,
      avatar: r.membre.avatar
    } : undefined
  }
}

const handleReviewView = (review: ReviewData) => {
  navigateTo(`/review/${review.id || review.idCritique}`)
}

// Initialize from URL parameters
const initializeFromQuery = () => {
  const query = route.query
  
  if (query.search && typeof query.search === 'string') {
    filters.value.search = query.search
  }
  if (query.rating && typeof query.rating === 'string') {
    const rating = parseInt(query.rating)
    if (!isNaN(rating) && rating >= 1 && rating <= 10) {
      filters.value.rating = rating
    }
  }
  if (query.sort && typeof query.sort === 'string') {
    filters.value.sort = query.sort as any
  }
  if (query.author && typeof query.author === 'string') {
    filters.value.author = query.author
  }
}

// Load data on mount
onMounted(() => {
  initializeFromQuery()
  loadReviews()
})

// Watch route changes
watch(() => route.query, () => {
  initializeFromQuery()
  loadReviews()
})
</script>

<style scoped>
.anime-reviews-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
}

.dark .anime-reviews-page {
  background: linear-gradient(to bottom, #1a202c, #2d3748);
}
</style>