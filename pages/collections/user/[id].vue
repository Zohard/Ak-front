<template>
  <div class="main-content">
    <!-- Back Navigation -->
    <div class="mb-6">
      <NuxtLink 
        to="/collections" 
        class="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
      >
        <Icon name="heroicons:arrow-left" size="xs" class="mr-2" />
        Retour aux collections
      </NuxtLink>
    </div>

    <!-- User Header -->
    <div v-if="userInfo" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <div class="flex items-start gap-4">
        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
          <span class="text-white font-semibold text-2xl">{{ userInfo.username.charAt(0).toUpperCase() }}</span>
        </div>
        <div class="flex-1">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Collections de {{ userInfo.username }}
          </h1>
          <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span class="flex items-center gap-1">
              <Icon name="heroicons:calendar" size="xs" />
              Membre depuis {{ formatDate(userInfo.joinedAt) }}
            </span>
            <span class="flex items-center gap-1">
              <Icon name="heroicons:globe-alt" size="xs" />
              Collections publiques uniquement
            </span>
          </div>
          <div class="flex items-center gap-6 text-sm">
            <div class="flex items-center gap-2">
              <Icon name="heroicons:film" size="xs" class="text-purple-600" />
              <span class="font-medium">{{ userInfo.totalPublicAnimes }}</span>
              <span class="text-gray-500 dark:text-gray-400">animes</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="heroicons:book-open" size="xs" class="text-blue-600" />
              <span class="font-medium">{{ userInfo.totalPublicMangas }}</span>
              <span class="text-gray-500 dark:text-gray-400">mangas</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="heroicons:rectangle-stack" size="xs" class="text-green-600" />
              <span class="font-medium">{{ userInfo.totalPublicItems }}</span>
              <span class="text-gray-500 dark:text-gray-400">total</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <NuxtLink 
            :to="`/user/${userInfo.username}`"
            class="btn-secondary flex items-center gap-2"
          >
            <Icon name="heroicons:user" size="xs" />
            Voir le profil
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Collection Type Tabs -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
      <div class="border-b border-gray-200 dark:border-gray-700">
        <nav class="flex -mb-px" aria-label="Collection Types">
          <button
            v-for="collectionType in collectionTypes"
            :key="collectionType.type"
            :class="[
              'py-4 px-6 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center gap-2',
              activeType === collectionType.type
                ? 'border-purple-500 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            ]"
            @click="activeType = collectionType.type"
          >
            <div :class="[`w-3 h-3 rounded-full ${collectionType.color}`]"></div>
            {{ collectionType.name }}
            <span 
              v-if="userInfo && getUserCollectionCount(collectionType.type) > 0" 
              class="ml-1 text-xs opacity-70"
            >
              ({{ getUserCollectionCount(collectionType.type) }})
            </span>
          </button>
        </nav>
      </div>

      <!-- Collection Content Tabs -->
      <div class="p-6">
        <div class="flex items-center gap-4 mb-6">
          <div class="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              :class="[
                'px-3 py-1 rounded text-sm font-medium transition-colors',
                contentType === 'animes' 
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400'
              ]"
              @click="contentType = 'animes'"
            >
              <Icon name="heroicons:film" size="xs" class="mr-1" />
              Animes
            </button>
            <button
              :class="[
                'px-3 py-1 rounded text-sm font-medium transition-colors',
                contentType === 'mangas' 
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400'
              ]"
              @click="contentType = 'mangas'"
            >
              <Icon name="heroicons:book-open" size="xs" class="mr-1" />
              Mangas
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
          <span class="ml-3 text-gray-600 dark:text-gray-300">Chargement...</span>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6 max-w-md mx-auto">
            <Icon name="heroicons:exclamation-triangle" class="w-8 h-8 text-red-500 mx-auto mb-3" />
            <h3 class="text-lg font-medium text-red-800 dark:text-red-200 mb-2">Erreur de chargement</h3>
            <p class="text-red-600 dark:text-red-300 text-sm mb-4">{{ error }}</p>
            <button class="btn-secondary" @click="refresh">Réessayer</button>
          </div>
        </div>

        <!-- Collection Items Grid -->
        <div v-else-if="data?.data?.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <div
            v-for="item in data.data"
            :key="item.id"
            class="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 group"
          >
            <!-- Item Image -->
            <div class="relative aspect-[3/4] bg-gray-200 dark:bg-gray-600">
              <img
                v-if="item[contentType.slice(0, -1)]?.image"
                :src="getImageUrl(item[contentType.slice(0, -1)].image)"
                :alt="item[contentType.slice(0, -1)]?.titre"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
              
              <!-- Rating Badge -->
              <div v-if="item.rating" class="absolute top-2 right-2">
                <div class="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Icon name="heroicons:star-solid" size="xs" />
                  {{ item.rating }}
                </div>
              </div>
            </div>

            <!-- Item Info -->
            <div class="p-3">
              <h3 class="font-medium text-sm text-gray-900 dark:text-white line-clamp-2 mb-1">
                {{ item[contentType.slice(0, -1)]?.titre }}
              </h3>
              <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span v-if="item[contentType.slice(0, -1)]?.annee">{{ item[contentType.slice(0, -1)].annee }}</span>
                <span v-if="item[contentType.slice(0, -1)]?.nbEp">{{ item[contentType.slice(0, -1)].nbEp }} ép.</span>
              </div>
              <div v-if="item.notes" class="mt-2 text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                "{{ item.notes }}"
              </div>
              <div class="mt-2 text-xs text-gray-500 dark:text-gray-500">
                Ajouté {{ formatDate(item.addedAt) }}
              </div>
            </div>

            <!-- Link Overlay -->
            <NuxtLink 
              :to="`/${contentType.slice(0, -1)}/${item[contentType.slice(0, -1)]?.niceUrl || item[contentType.slice(0, -1)]?.id}`"
              class="absolute inset-0 z-10"
              :aria-label="`Voir ${item[contentType.slice(0, -1)]?.titre}`"
            />
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <Icon :name="contentType === 'animes' ? 'heroicons:film' : 'heroicons:book-open'" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Aucun {{ contentType === 'animes' ? 'anime' : 'manga' }} {{ getStatusLabel(activeType) }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            L'utilisateur n'a pas encore ajouté de {{ contentType === 'animes' ? 'animes' : 'mangas' }} dans cette collection.
          </p>
        </div>

        <!-- Load More Button -->
        <div v-if="data?.meta?.hasMore" class="text-center mt-8">
          <button 
            @click="loadMore"
            :disabled="loadingMore"
            class="btn-secondary inline-flex items-center gap-2"
          >
            <div v-if="loadingMore" class="animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent"></div>
            <Icon v-else name="heroicons:arrow-down" size="xs" />
            {{ loadingMore ? 'Chargement...' : 'Charger plus' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page metadata
useHead({
  title: 'Collections Utilisateur - Anime-Kun',
})

const route = useRoute()
const userId = parseInt(route.params.id as string)

// State
const activeType = ref(1) // Plan to Watch/Read
const contentType = ref<'animes' | 'mangas'>('animes')
const loadingMore = ref(false)
const currentPage = ref(1)

// Collection types configuration
const collectionTypes = [
  { type: 1, name: 'Terminé', color: 'bg-green-500' },
  { type: 2, name: 'Planifié', color: 'bg-yellow-500' },
  { type: 3, name: 'En cours', color: 'bg-blue-500' },
  { type: 4, name: 'Abandonné', color: 'bg-red-500' }
]

// User info state
const userInfo = ref<any>(null)

// Fetch user info
const fetchUserInfo = async () => {
  try {
    const config = useRuntimeConfig()
    const response = await $fetch(`${config.public.apiBase}/api/collections/browse`, {
      params: { limit: 1000 }
    })
    
    const user = response.data?.find((u: any) => u.id === userId)
    if (user) {
      userInfo.value = user
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error)
  }
}

// Fetch collection data
const { data, pending, error, refresh } = await useFetch(() => {
  const config = useRuntimeConfig()
  return `${config.public.apiBase}/api/collections/user/${userId}/type/${activeType.value}/${contentType.value}`
}, {
  params: computed(() => ({
    page: currentPage.value,
    limit: 20
  })),
  key: computed(() => `user-collection-${userId}-${activeType.value}-${contentType.value}-${currentPage.value}`),
  watch: [activeType, contentType],
  onResponse({ response }) {
    if (response.status === 200 && currentPage.value > 1) {
      // Append new items when loading more
      if (data.value?.data) {
        data.value.data.push(...response._data.data)
      }
    }
  }
})

// Reset page when switching types/content
watch([activeType, contentType], () => {
  currentPage.value = 1
})

// Load user info on mount
onMounted(() => {
  fetchUserInfo()
})

// Methods
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const getImageUrl = (imagePath: string) => {
  const config = useRuntimeConfig()
  const type = contentType.value === 'animes' ? 'animes' : 'mangas'
  return `${config.public.apiBase}/uploads/${type}/${imagePath}`
}

const getStatusLabel = (type: number) => {
  const labels = {
    1: 'terminés',
    2: 'planifiés',
    3: 'en cours',
    4: 'abandonnés'
  }
  return labels[type as keyof typeof labels] || ''
}

const getUserCollectionCount = (type: number) => {
  if (!userInfo.value) return 0
  
  const collection = userInfo.value.collections?.find((c: any) => c.type === type)
  return collection ? (contentType.value === 'animes' ? collection.animeCount : collection.mangaCount) : 0
}

const loadMore = async () => {
  if (loadingMore.value || !data.value?.meta?.hasMore) return
  
  loadingMore.value = true
  currentPage.value += 1
  
  try {
    await refresh()
  } finally {
    loadingMore.value = false
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.main-content {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8;
}
</style>