<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
      <span class="ml-3 text-gray-600 dark:text-gray-300">Chargement du profil...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container mx-auto px-4 py-8">
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
        <Icon name="heroicons:exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 class="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">Utilisateur introuvable</h2>
        <p class="text-red-600 dark:text-red-300">{{ error }}</p>
        <NuxtLink to="/" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Retour à l'accueil
        </NuxtLink>
      </div>
    </div>

    <!-- Profile Content -->
    <div v-else class="container mx-auto px-4 py-8">
      <!-- Profile Header -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
        <!-- Cover Image -->
        <div class="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          <div v-if="isOwner" class="absolute top-4 right-4">
            <NuxtLink 
              to="/profile" 
              class="inline-flex items-center px-3 py-1 border border-white/20 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              <Icon name="heroicons:pencil-square" class="w-4 h-4 mr-1" />
              Modifier
            </NuxtLink>
          </div>
        </div>
        
        <!-- Profile Info -->
        <div class="px-6 py-6 relative">
          <!-- Avatar -->
          <div class="absolute -top-16 left-6">
            <div class="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-blue-500 flex items-center justify-center">
              <img 
                v-if="userProfile?.avatar && !showFallbackAvatar" 
                :src="getAvatarUrl(userProfile.avatar)"
                :alt="userProfile?.pseudo || userProfile?.username"
                class="w-full h-full object-cover"
                @error="showFallbackAvatar = true"
              />
              <span 
                v-else
                class="text-white text-2xl font-bold"
              >
                {{ getUserInitial() }}
              </span>
            </div>
          </div>
          
          <!-- Basic Info -->
          <div class="ml-32">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ userProfile?.pseudo || userProfile?.username }}
                </h1>
                <div class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div class="flex items-center">
                    <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
                    Membre depuis {{ formatJoinDate(userProfile?.dateInscription) }}
                  </div>
                  <div v-if="userProfile?.lastLogin" class="flex items-center">
                    <Icon name="heroicons:clock" class="w-4 h-4 mr-1" />
                    Dernière connexion {{ formatLastSeen(userProfile.lastLogin) }}
                  </div>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div v-if="!isOwner && authStore.isAuthenticated" class="flex space-x-2">
                <button
                  @click="sendMessage"
                  class="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <Icon name="heroicons:envelope" class="w-4 h-4 mr-1" />
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Reviews Stats -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Critiques</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ publicStats?.totalReviews || 0 }}</p>
            </div>
            <Icon name="heroicons:star" class="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <!-- Forum Posts -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Messages forum</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ userProfile?.nbPost || 0 }}</p>
            </div>
            <Icon name="heroicons:chat-bubble-left" class="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <!-- Reputation -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Réputation</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ userProfile?.reputation || 0 }}</p>
            </div>
            <Icon name="heroicons:trophy" class="w-8 h-8 text-amber-500" />
          </div>
        </div>

        <!-- Member Level -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Niveau</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ getMemberLevel() }}</p>
            </div>
            <Icon name="heroicons:user-circle" class="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      <!-- Content Tabs -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <!-- Tab Headers -->
        <div class="border-b border-gray-200 dark:border-gray-700">
          <nav class="flex space-x-8 px-6" aria-label="Tabs">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <!-- Recent Reviews Tab -->
          <div v-show="activeTab === 'reviews'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Critiques récentes</h3>
              <NuxtLink 
                :to="`/user/${username}/reviews`"
                class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                Voir toutes →
              </NuxtLink>
            </div>
            
            <div v-if="recentReviews.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ReviewCard
                v-for="review in recentReviews"
                :key="review.id || review.idCritique"
                :review="normalizeReview(review)"
                @view="handleReviewView"
              />
            </div>
            <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
              Aucune critique publiée
            </div>
          </div>

          <!-- Collections Tab -->
          <div v-show="activeTab === 'collections'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Collections publiques</h3>
              <NuxtLink 
                :to="`/collections/user/${userProfile?.id}`"
                class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-2"
              >
                <Icon name="heroicons:rectangle-stack" size="xs" />
                Voir toutes les collections →
              </NuxtLink>
            </div>
            
            <!-- Collections Summary -->
            <div v-if="userCollections.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                v-for="collection in userCollections"
                :key="collection.type"
                class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
              >
                <div class="flex items-center justify-between mb-3">
                  <div :class="['w-4 h-4 rounded-full', getCollectionColor(collection.type)]"></div>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ collection.totalCount }} éléments</span>
                </div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">{{ collection.name }}</h4>
                <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div class="flex items-center gap-1">
                    <Icon name="heroicons:film" size="xs" />
                    <span>{{ collection.animeCount }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon name="heroicons:book-open" size="xs" />
                    <span>{{ collection.mangaCount }}</span>
                  </div>
                </div>
                <NuxtLink 
                  :to="`/collections/user/${userProfile?.id}?type=${collection.type}`"
                  class="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  Voir le détail
                  <Icon name="heroicons:arrow-right" size="xs" />
                </NuxtLink>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
              <Icon name="heroicons:rectangle-stack" class="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucune collection publique</p>
            </div>
          </div>

          <!-- Activity Tab -->
          <div v-show="activeTab === 'activity'" class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Activité récente</h3>
            <div v-if="recentActivity.length" class="space-y-4">
              <div
                v-for="activity in recentActivity"
                :key="activity.id"
                class="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div class="flex-shrink-0">
                  <Icon :name="getActivityIcon(activity.type)" class="w-6 h-6 text-gray-500" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-900 dark:text-white">
                    {{ formatActivity(activity) }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {{ formatDate(activity.date) }}
                  </p>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
              Aucune activité récente publique
            </div>
          </div>

          <!-- Statistics Tab -->
          <div v-show="activeTab === 'stats'" class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Statistiques publiques</h3>
            
            <!-- Review Stats -->
            <div v-if="publicStats?.reviewStats" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 dark:text-white mb-3">Distribution des notes de critiques</h4>
              <div class="space-y-2">
                <div
                  v-for="rating in publicStats.reviewStats"
                  :key="rating.rating"
                  class="flex items-center justify-between"
                >
                  <span class="text-sm text-gray-600 dark:text-gray-400">{{ rating.rating }}/10</span>
                  <div class="flex items-center space-x-2">
                    <div class="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        class="bg-yellow-500 h-2 rounded-full"
                        :style="{ width: `${(rating.count / Math.max(...publicStats.reviewStats.map(r => r.count))) * 100}%` }"
                      ></div>
                    </div>
                    <span class="text-sm text-gray-900 dark:text-white font-medium">{{ rating.count }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Activity Timeline -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 dark:text-white mb-3">Activité mensuelle</h4>
              <div class="text-center py-4 text-gray-500 dark:text-gray-400">
                Graphique d'activité bientôt disponible
              </div>
            </div>
          </div>
        </div>
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
  title: `Profil de ${username} - Anime-Kun V2`,
  meta: [
    { name: 'description', content: `Consultez le profil public de ${username} sur Anime-Kun` }
  ]
})

// Composables
const authStore = useAuthStore()
const config = useRuntimeConfig()
const { getAvatarUrl } = useImageUrl()

// State
const loading = ref(true)
const error = ref('')
const activeTab = ref('reviews')
const userProfile = ref<any>(null)
const publicStats = ref<any>(null)
const recentReviews = ref<any[]>([])
const recentActivity = ref<any[]>([])
const userCollections = ref<any[]>([])
const showFallbackAvatar = ref(false)

// Computed
const isOwner = computed(() => {
  return authStore.isAuthenticated && authStore.user?.pseudo === username
})

// Tabs configuration
const tabs = [
  { id: 'reviews', label: 'Critiques' },
  { id: 'collections', label: 'Collections' },
  { id: 'activity', label: 'Activité' },
  { id: 'stats', label: 'Statistiques' }
]

// Methods
const formatJoinDate = (timestamp: number | string) => {
  if (!timestamp) return 'Inconnu'
  const date = new Date(typeof timestamp === 'string' ? parseInt(timestamp) * 1000 : timestamp * 1000)
  return date.toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long'
  })
}

const formatLastSeen = (timestamp: number | string) => {
  if (!timestamp) return 'Inconnue'
  const date = new Date(typeof timestamp === 'string' ? parseInt(timestamp) * 1000 : timestamp * 1000)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) {
    return 'hier'
  } else if (diffDays < 7) {
    return `il y a ${diffDays} jours`
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`
  } else {
    return date.toLocaleDateString('fr-FR')
  }
}

const getCollectionColor = (type: number) => {
  const colors = {
    1: 'bg-green-500',  // Completed
    2: 'bg-yellow-500', // Plan to Watch/Read
    3: 'bg-blue-500',   // Watching/Reading
    4: 'bg-red-500'     // Dropped
  }
  return colors[type as keyof typeof colors] || 'bg-gray-500'
}

const formatDate = (timestamp: number | string) => {
  if (!timestamp) return ''
  const date = new Date(typeof timestamp === 'string' ? parseInt(timestamp) * 1000 : timestamp * 1000)
  return date.toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const getUserInitial = () => {
  const name = userProfile.value?.pseudo || userProfile.value?.username || username
  return name.charAt(0).toUpperCase()
}

const getMemberLevel = () => {
  const posts = userProfile.value?.nbPost || 0
  if (posts >= 1000) return 'Expert'
  if (posts >= 500) return 'Avancé'
  if (posts >= 100) return 'Actif'
  if (posts >= 10) return 'Membre'
  return 'Débutant'
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'review': return 'heroicons:star'
    case 'forum_post': return 'heroicons:chat-bubble-left'
    case 'anime_rated': return 'heroicons:film'
    case 'manga_rated': return 'heroicons:book-open'
    default: return 'heroicons:clock'
  }
}

const formatActivity = (activity: any) => {
  switch (activity.type) {
    case 'review':
      return `A écrit une critique pour "${activity.title}"`
    case 'forum_post':
      return `A posté un message dans "${activity.title}"`
    case 'anime_rated':
      return `A noté l'anime "${activity.title}"`
    case 'manga_rated':
      return `A noté le manga "${activity.title}"`
    default:
      return activity.description || 'Activité'
  }
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
      pseudo: userProfile.value?.pseudo,
      avatar: userProfile.value?.avatar
    }
  }
}

const handleReviewView = (review: ReviewData) => {
  navigateTo(`/review/${review.id || review.idCritique}`)
}

const sendMessage = () => {
  // TODO: Implement private messaging or redirect to contact form
  console.log('Send message to', username)
}

// Load public profile data
const loadPublicProfile = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // Get public user profile
    const profileResponse = await $fetch(`${config.public.apiBase}/api/users/public/${username}`)
    userProfile.value = profileResponse.user
    
    // Get public statistics
    const statsResponse = await $fetch(`${config.public.apiBase}/api/users/public/${username}/stats`)
    publicStats.value = statsResponse
    
    // Get recent reviews
    const reviewsResponse = await $fetch(`${config.public.apiBase}/api/users/public/${username}/reviews?limit=4`)
    recentReviews.value = reviewsResponse.reviews || []
    
    // Get recent activity (public only)
    const activityResponse = await $fetch(`${config.public.apiBase}/api/users/public/${username}/activity?limit=5`)
    recentActivity.value = activityResponse.activities || []
    
    // Get user collections if we have the user ID
    if (userProfile.value?.id) {
      try {
        const collectionsResponse = await $fetch(`${config.public.apiBase}/api/collections?userId=${userProfile.value.id}`)
        userCollections.value = (collectionsResponse.data || []).filter((collection: any) => collection.totalCount > 0)
      } catch (collectionsErr) {
        console.warn('Failed to load user collections:', collectionsErr)
        userCollections.value = []
      }
    }
    
  } catch (err: any) {
    if (err.status === 404) {
      error.value = `L'utilisateur "${username}" n'existe pas.`
    } else {
      error.value = err.message || 'Erreur lors du chargement du profil'
    }
    console.error('Error loading public profile:', err)
  } finally {
    loading.value = false
  }
}

// Load data on mount
onMounted(() => {
  loadPublicProfile()
})

// Watch for route changes
watch(() => route.params.username, (newUsername) => {
  if (newUsername !== username) {
    window.location.reload() // Simple reload for now
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>