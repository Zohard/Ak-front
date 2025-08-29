<template>
  <div class="main-content">
    <!-- Loading state -->
    <div v-if="pending" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
      <span class="ml-3 text-gray-600 dark:text-gray-300">Chargement de la collection...</span>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-12">
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6 max-w-md mx-auto">
        <Icon name="heroicons:exclamation-triangle" class="w-8 h-8 text-red-500 mx-auto mb-3" />
        <h3 class="text-lg font-medium text-red-800 dark:text-red-200 mb-2">Collection non trouvée</h3>
        <p class="text-red-600 dark:text-red-300 text-sm mb-4">
          Cette collection n'existe pas ou n'est pas accessible
        </p>
        <NuxtLink to="/my-collections" class="btn-secondary">
          Retour aux collections
        </NuxtLink>
      </div>
    </div>

    <!-- Collection content -->
    <div v-else-if="collection">
      <!-- Collection Header -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
        <div class="flex items-start justify-between">
          <div class="flex items-start gap-4">
            <div :class="[
              'w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0',
              getCollectionColor(collection)
            ]">
              <Icon :name="getCollectionIcon(collection)" size="lg" class="text-white" />
            </div>
            
            <div class="flex-1">
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {{ collection.name }}
              </h1>
              
              <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                <span class="flex items-center gap-1">
                  <Icon name="heroicons:user" size="xs" />
                  {{ collection.user?.pseudo || 'Utilisateur' }}
                </span>
                <span class="flex items-center gap-1">
                  <Icon name="heroicons:calendar" size="xs" />
                  {{ formatDate(collection.createdAt) }}
                </span>
                <span v-if="collection.isPublic" class="flex items-center gap-1">
                  <Icon name="heroicons:globe-alt" size="xs" />
                  Public
                </span>
                <span class="flex items-center gap-1">
                  <Icon name="heroicons:rectangle-stack" size="xs" />
                  {{ totalItems }} éléments
                </span>
              </div>
              
              <p v-if="collection.description" class="text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ collection.description }}
              </p>
            </div>
          </div>
          
          <!-- Actions (only for collection owner) -->
          <div v-if="isOwner" class="flex items-center gap-2">
            <Button
              @click="editCollection"
              variant="secondary"
              size="sm"
            >
              <Icon name="heroicons:pencil-square" size="xs" class="mr-2" />
              Modifier
            </Button>
          </div>
        </div>
      </div>

      <!-- Content Type Tabs -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-1 mb-8">
        <div class="flex space-x-1">
          <button
            @click="activeTab = 'animes'"
            :class="[
              'flex-1 px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200',
              activeTab === 'animes' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            <div class="flex items-center justify-center gap-2">
              <Icon name="heroicons:film" size="sm" />
              Animes ({{ animes.length }})
            </div>
          </button>
          
          <button
            @click="activeTab = 'mangas'"
            :class="[
              'flex-1 px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200',
              activeTab === 'mangas' 
                ? 'bg-green-600 text-white shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            <div class="flex items-center justify-center gap-2">
              <Icon name="heroicons:book-open" size="sm" />
              Mangas ({{ mangas.length }})
            </div>
          </button>
        </div>
      </div>

      <!-- Animes Tab -->
      <div v-if="activeTab === 'animes'">
        <div v-if="animesLoading" class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
          <span class="ml-3 text-gray-600 dark:text-gray-300">Chargement des animes...</span>
        </div>
        
        <div v-else-if="animes.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="item in animes"
            :key="item.id"
            class="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            @click="viewAnime(item.anime)"
          >
            <!-- Image -->
            <div class="relative">
              <div class="aspect-[3/4] overflow-hidden">
                <img
                  v-if="item.anime?.image"
                  :src="getImageUrl(item.anime.image, 'anime')"
                  :alt="item.anime.titre"
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
                    <p class="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">{{ item.anime?.titre }}</p>
                    <p class="text-xs text-blue-600 dark:text-blue-400">Image bientôt disponible</p>
                  </div>
                </div>
              </div>
              
              <!-- Rating overlay -->
              <div 
                v-if="item.anime?.moyenneNotes && item.anime.moyenneNotes > 0" 
                class="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
              >
                <Icon name="heroicons:star" class="w-3 h-3 text-yellow-400" />
                <span>{{ (item.anime.moyenneNotes).toFixed(1) }}</span>
              </div>

              <!-- Remove button (only for owner) -->
              <div 
                v-if="isOwner"
                class="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Button
                  @click.stop="removeAnime(item)"
                  variant="danger"
                  size="sm"
                  class="bg-red-600/90 hover:bg-red-700/90 backdrop-blur-sm"
                >
                  <Icon name="heroicons:trash" size="xs" />
                </Button>
              </div>
            </div>

            <!-- Content -->
            <div class="p-4 space-y-3">
              <h3 class="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2 leading-tight">
                {{ item.anime?.titre }}
              </h3>
              
              <div class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <span v-if="item.anime?.annee" class="flex items-center gap-1">
                  <Icon name="heroicons:calendar" class="w-3 h-3" />
                  {{ item.anime.annee }}
                </span>
                <span v-if="item.anime?.nbEp" class="flex items-center gap-1">
                  <Icon name="heroicons:film" class="w-3 h-3" />
                  {{ item.anime.nbEp }} ép.
                </span>
              </div>

              <!-- Personal notes/rating -->
              <div v-if="item.notes || item.rating" class="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div v-if="item.rating" class="flex items-center gap-1 mb-1">
                  <Icon name="heroicons:star" class="w-3 h-3 text-yellow-500" />
                  <span class="text-sm font-medium">{{ item.rating }}/10</span>
                </div>
                <p v-if="item.notes" class="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {{ item.notes }}
                </p>
              </div>

              <!-- Added date -->
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Ajouté le {{ formatDate(item.addedAt) }}
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-12">
          <Icon name="heroicons:film" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun anime</h3>
          <p class="text-gray-500 dark:text-gray-400">
            Cette collection ne contient pas encore d'animes
          </p>
        </div>
      </div>

      <!-- Mangas Tab -->
      <div v-if="activeTab === 'mangas'">
        <div v-if="mangasLoading" class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-6 w-6 border-2 border-green-500 border-t-transparent"></div>
          <span class="ml-3 text-gray-600 dark:text-gray-300">Chargement des mangas...</span>
        </div>
        
        <div v-else-if="mangas.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="item in mangas"
            :key="item.id"
            class="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            @click="viewManga(item.manga)"
          >
            <!-- Similar structure to anime cards but for mangas -->
            <div class="relative">
              <div class="aspect-[3/4] overflow-hidden">
                <img
                  v-if="item.manga?.image"
                  :src="getImageUrl(item.manga.image, 'manga')"
                  :alt="item.manga.titre"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  @error="(e) => handleImageError(e, undefined, 'manga')"
                />
                <div 
                  v-else 
                  class="w-full h-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 flex flex-col items-center justify-center p-4"
                >
                  <Icon name="heroicons:book-open" class="w-16 h-16 text-green-500 dark:text-green-400 mb-3" />
                  <div class="text-center">
                    <p class="text-sm font-medium text-green-700 dark:text-green-300 mb-1">{{ item.manga?.titre }}</p>
                    <p class="text-xs text-green-600 dark:text-green-400">Image bientôt disponible</p>
                  </div>
                </div>
              </div>
              
              <!-- Remove button (only for owner) -->
              <div 
                v-if="isOwner"
                class="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Button
                  @click.stop="removeManga(item)"
                  variant="danger"
                  size="sm"
                  class="bg-red-600/90 hover:bg-red-700/90 backdrop-blur-sm"
                >
                  <Icon name="heroicons:trash" size="xs" />
                </Button>
              </div>
            </div>

            <div class="p-4 space-y-3">
              <h3 class="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2 leading-tight">
                {{ item.manga?.titre }}
              </h3>
              
              <div class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <span v-if="item.manga?.annee" class="flex items-center gap-1">
                  <Icon name="heroicons:calendar" class="w-3 h-3" />
                  {{ item.manga.annee }}
                </span>
                <span v-if="item.manga?.auteur" class="flex items-center gap-1">
                  <Icon name="heroicons:user" class="w-3 h-3" />
                  {{ item.manga.auteur }}
                </span>
              </div>

              <div v-if="item.notes || item.rating" class="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div v-if="item.rating" class="flex items-center gap-1 mb-1">
                  <Icon name="heroicons:star" class="w-3 h-3 text-yellow-500" />
                  <span class="text-sm font-medium">{{ item.rating }}/10</span>
                </div>
                <p v-if="item.notes" class="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {{ item.notes }}
                </p>
              </div>

              <div class="text-xs text-gray-500 dark:text-gray-400">
                Ajouté le {{ formatDate(item.addedAt) }}
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-12">
          <Icon name="heroicons:book-open" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun manga</h3>
          <p class="text-gray-500 dark:text-gray-400">
            Cette collection ne contient pas encore de mangas
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Collection, CollectionAnime, CollectionManga, Anime, Manga } from '~/types'

// Get collection ID from route
const route = useRoute()
const collectionId = parseInt(route.params.id as string)

// Page metadata - Fixed to prevent unmount errors
const pageTitle = computed(() => {
  try {
    return collection.value ? `${collection.value.name} - Collections` : 'Collection - Anime-Kun'
  } catch {
    return 'Collection - Anime-Kun'
  }
})

const pageDescription = computed(() => {
  try {
    return collection.value?.description || 'Collection d\'animes et mangas'
  } catch {
    return 'Collection d\'animes et mangas'
  }
})

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription }
  ]
})

const authStore = useAuthStore()
const collectionsAPI = useCollectionsAPI()
const { getImageUrl, handleImageError } = useImageUrl()

// State
const activeTab = ref<'animes' | 'mangas'>('animes')
const animes = ref<CollectionAnime[]>([])
const mangas = ref<CollectionManga[]>([])
const animesLoading = ref(false)
const mangasLoading = ref(false)

// Fetch collection data
const { data: collectionData, pending, error } = await useFetch(`/api/collections/${collectionId}`, {
  baseURL: useRuntimeConfig().public.apiBase,
  headers: computed(() => {
    // Include auth headers if available, but don't require authentication for public collections
    return authStore.isAuthenticated ? authStore.getAuthHeaders() as Record<string, string> : {}
  }),
  key: `collection-${collectionId}`
})

const collection = computed(() => {
  try {
    return collectionData.value?.collection || null
  } catch {
    return null
  }
})

// Check if current user is the owner
const isOwner = computed(() => {
  try {
    return authStore.isAuthenticated && 
           collection.value && 
           authStore.user?.id === collection.value.userId
  } catch {
    return false
  }
})

// Total items count
const totalItems = computed(() => {
  try {
    return animes.value.length + mangas.value.length
  } catch {
    return 0
  }
})

// Methods
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
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

const loadAnimes = async () => {
  if (!collection.value) return
  
  animesLoading.value = true
  try {
    const response = await collectionsAPI.fetchCollectionAnimes(collection.value.id)
    animes.value = response.data || response.animes || []
  } catch (err) {
    console.error('Error loading collection animes:', err)
    animes.value = []
  } finally {
    animesLoading.value = false
  }
}

const loadMangas = async () => {
  if (!collection.value) return
  
  mangasLoading.value = true
  try {
    const response = await collectionsAPI.fetchCollectionMangas(collection.value.id)
    mangas.value = response.data || response.mangas || []
  } catch (err) {
    console.error('Error loading collection mangas:', err)
    mangas.value = []
  } finally {
    mangasLoading.value = false
  }
}

const viewAnime = (anime: Anime | undefined) => {
  if (!anime) return
  const targetUrl = `/anime/${anime.niceUrl || anime.id}`
  navigateTo(targetUrl)
}

const viewManga = (manga: Manga | undefined) => {
  if (!manga) return
  const targetUrl = `/manga/${manga.niceUrl || manga.id}`
  navigateTo(targetUrl)
}

const removeAnime = async (item: CollectionAnime) => {
  if (!collection.value || !confirm('Retirer cet anime de la collection ?')) return
  
  try {
    await collectionsAPI.removeAnimeFromCollection(collection.value.id, item.animeId)
    await loadAnimes()
  } catch (err) {
    console.error('Error removing anime:', err)
  }
}

const removeManga = async (item: CollectionManga) => {
  if (!collection.value || !confirm('Retirer ce manga de la collection ?')) return
  
  try {
    await collectionsAPI.removeMangaFromCollection(collection.value.id, item.mangaId)
    await loadMangas()
  } catch (err) {
    console.error('Error removing manga:', err)
  }
}

const editCollection = () => {
  navigateTo('/my-collections')
}

// Load content when collection is available
watch(collection, async (newCollection) => {
  if (newCollection) {
    await Promise.all([
      loadAnimes(),
      loadMangas()
    ])
  }
}, { immediate: true })

// Load content when switching tabs
watch(activeTab, async (newTab) => {
  if (newTab === 'animes' && animes.value.length === 0) {
    await loadAnimes()
  } else if (newTab === 'mangas' && mangas.value.length === 0) {
    await loadMangas()
  }
})

// Cleanup on unmount to prevent memory leaks
onBeforeUnmount(() => {
  // Clear reactive data
  animes.value = []
  mangas.value = []
  animesLoading.value = false
  mangasLoading.value = false
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