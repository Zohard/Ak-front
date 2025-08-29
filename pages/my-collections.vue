<template>
  <div class="main-content">
    <!-- Header -->
    <div class="page-header">
      <h1 class="section-title flex items-center gap-3">
        <Icon name="heroicons:rectangle-stack" class="w-8 h-8 text-purple-600 dark:text-purple-400" />
        Mes Collections
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Organisez vos animes et mangas préférés
      </p>
    </div>

    <!-- Layout with sidebar and content -->
    <div class="flex gap-6">
      <!-- Left Sidebar -->
      <div class="w-64 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Type de collection</h3>
        <nav class="space-y-2">
          <button
            :class="[
              'w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-3',
              activeCollectionType === 'animes' 
                ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
            @click="setActiveCollectionType('animes')"
          >
            <Icon name="heroicons:film" class="w-5 h-5" />
            Collections Animes
          </button>
          <button
            :class="[
              'w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-3',
              activeCollectionType === 'mangas' 
                ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
            @click="setActiveCollectionType('mangas')"
          >
            <Icon name="heroicons:book-open" class="w-5 h-5" />
            Collections Mangas
          </button>
        </nav>
        
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button class="btn-primary w-full justify-center" @click="openCreateModal">
            <Icon name="heroicons:plus" class="w-4 h-4 mr-2" />
            Nouvelle collection
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1">

        <!-- Status Tabs -->
        <div class="mb-6">
          <div class="border-b border-gray-200 dark:border-gray-700">
            <nav class="-mb-px flex flex-wrap gap-2" aria-label="Status Tabs">
              <button
                v-for="(config, status) in statusConfig"
                :key="status"
                :class="[
                  'py-2 px-4 border-b-2 font-medium text-sm transition-colors duration-200 rounded-t-lg flex items-center gap-2',
                  activeStatusTab === status
                    ? `border-purple-500 ${config.bgColor} ${config.textColor}`
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                ]"
                @click="setActiveStatusTab(status)"
              >
                <div :class="`w-3 h-3 rounded-full ${config.color}`"></div>
                {{ config.label }}
                <span class="ml-1 text-xs opacity-70">({{ getStatusCount(status) }})</span>
              </button>
            </nav>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="pending" class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
          <span class="ml-3 text-gray-600 dark:text-gray-300">Chargement de vos collections...</span>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-center py-12">
          <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6 max-w-md mx-auto">
            <Icon name="heroicons:exclamation-triangle" class="w-8 h-8 text-red-500 mx-auto mb-3" />
            <h3 class="text-lg font-medium text-red-800 dark:text-red-200 mb-2">Erreur de chargement</h3>
            <p class="text-red-600 dark:text-red-300 text-sm mb-4">{{ error }}</p>
            <button class="btn-secondary" @click="refresh">Réessayer</button>
          </div>
        </div>

        <!-- Collection Items -->
        <div v-else-if="filteredItems?.length" class="space-y-4">
          <div
            v-for="item in filteredItems"
            :key="item.id"
            :class="[
              'rounded-lg border p-4 hover:shadow-md transition-all duration-200',
              'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
              getItemStatusBorder(item.status)
            ]"
          >
            <div class="flex items-center gap-4">
              <div class="relative">
                <img 
                  v-if="item.imageUrl" 
                  :src="item.imageUrl" 
                  :alt="item.title || item.name"
                  class="w-16 h-20 object-cover rounded-md"
                />
                <!-- Status indicator -->
                <div 
                  :class="[
                    'absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800',
                    getStatusColor(item.status)
                  ]"
                ></div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <h4 class="font-medium text-gray-900 dark:text-white truncate">{{ item.title || item.name }}</h4>
                  <span 
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      getStatusStyle(item.status).bgColor,
                      getStatusStyle(item.status).textColor
                    ]"
                  >
                    {{ getStatusStyle(item.status).label }}
                  </span>
                </div>
                <p v-if="item.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{{ item.description }}</p>
                <div class="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span v-if="item.year" class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{{ item.year }}</span>
                  <span v-if="item.progress" class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{{ item.progress }}</span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button class="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300" @click="removeFromCollection(item.id)">
                  <Icon name="heroicons:trash" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-12">
          <Icon name="heroicons:rectangle-stack" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {{ allItems.length === 0 
              ? `Aucun ${activeCollectionType === 'animes' ? 'anime' : 'manga'} trouvé` 
              : `Aucun ${activeCollectionType === 'animes' ? 'anime' : 'manga'} ${getStatusLabel(activeStatusTab)}`
            }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400 mb-4">
            {{ allItems.length === 0 
              ? `Commencez à ajouter des ${activeCollectionType === 'animes' ? 'animes' : 'mangas'} à votre collection` 
              : `Changez l'état de vos ${activeCollectionType === 'animes' ? 'animes' : 'mangas'} pour les voir apparaître ici`
            }}
          </p>
        </div>
      </div>
    </div>


    <!-- Create/Edit Modal -->
    <Modal
      :show="showModal"
      @update:show="showModal = $event"
      :title="isEditing ? 'Modifier la collection' : 'Nouvelle collection'"
      size="lg"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
          <input v-model="form.name" type="text" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" placeholder="Ex: Favoris 2025" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea v-model="form.description" rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" placeholder="Quelques mots sur cette collection"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type de collection</label>
          <select v-model="form.type" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
            <option value="animes">Collection d'Animes</option>
            <option value="mangas">Collection de Mangas</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <input id="isPublic" type="checkbox" v-model="form.isPublic" class="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
          <label for="isPublic" class="text-sm text-gray-700 dark:text-gray-300">Collection publique</label>
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button class="btn-secondary" @click="closeModal">Annuler</button>
          <button class="btn-primary" :disabled="saving" @click="submitForm">{{ isEditing ? 'Enregistrer' : 'Créer' }}</button>
        </div>
      </div>
    </Modal>
  </div>
  
</template>

<script setup lang="ts">
import type { Collection, CreateCollectionDto, UpdateCollectionDto, CollectionItem } from '~/types'
import { defineComponent, h } from 'vue'

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Mes Collections - Anime-Kun',
  meta: [
    { name: 'description', content: 'Gérez vos collections d\'animes et mangas' }
  ]
})

const authStore = useAuthStore()

// Client-side auth guard to avoid router middleware loops during HMR
if (process.client) {
  const hasToken = (authStore.accessToken as unknown as { value: string | null })?.value || localStorage.getItem('access_token')
  if (!hasToken) {
    window.location.replace(`/login?redirect=${encodeURIComponent('/my-collections')}`)
  }
}

// State
const activeCollectionType = ref<'animes' | 'mangas'>('animes')
const activeStatusTab = ref<string>('all')

// Status configurations with colors and labels
const statusConfig = {
  all: { label: 'Tous', color: 'bg-gray-500', textColor: 'text-gray-700', bgColor: 'bg-gray-100' },
  'en-cours': { label: 'En cours', color: 'bg-blue-500', textColor: 'text-blue-700', bgColor: 'bg-blue-100' },
  'termine': { label: 'Terminé', color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-100' },
  'planifie': { label: 'Planifié', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  'abandonne': { label: 'Abandonné', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-100' },
  'en-attente': { label: 'En attente', color: 'bg-purple-500', textColor: 'text-purple-700', bgColor: 'bg-purple-100' }
} as const

// Fetch collections based on type and user ID
const { data: animeCollectionsData, pending: animesPending, error: animesError, refresh: refreshAnimes } = await useFetch('/api/collection-animes', {
  headers: computed(() => authStore.getAuthHeaders() as Record<string, string>),
  params: computed(() => ({
    id_membre: authStore.user?.id
  })),
  key: 'anime-collections',
  watch: [activeCollectionType],
  server: false,
  default: () => ({ collections: [] })
})

const { data: mangaCollectionsData, pending: mangasPending, error: mangasError, refresh: refreshMangas } = await useFetch('/api/collection-mangas', {
  headers: computed(() => authStore.getAuthHeaders() as Record<string, string>),
  params: computed(() => ({
    id_membre: authStore.user?.id
  })),
  key: 'manga-collections', 
  watch: [activeCollectionType],
  server: false,
  default: () => ({ collections: [] })
})

// Computed for current data based on active type
const data = computed(() => {
  if (activeCollectionType.value === 'animes') {
    return animeCollectionsData.value
  } else {
    return mangaCollectionsData.value
  }
})

const pending = computed(() => {
  if (activeCollectionType.value === 'animes') {
    return animesPending.value
  } else {
    return mangasPending.value
  }
})

const error = computed(() => {
  if (activeCollectionType.value === 'animes') {
    return animesError.value
  } else {
    return mangasError.value
  }
})

const refresh = async () => {
  if (activeCollectionType.value === 'animes') {
    await refreshAnimes()
  } else {
    await refreshMangas()
  }
}

// Helpers
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

// Local lightweight Icon to avoid any async component recursion on this page
const Icon = defineComponent({
  name: 'LocalIconStub',
  props: { name: String, size: String },
  setup() { return () => h('span') }
})

const getCollectionColor = (collection: Collection) => {
  const colors = [
    'bg-purple-600','bg-blue-600','bg-green-600','bg-red-600','bg-yellow-600','bg-indigo-600','bg-pink-600','bg-orange-600'
  ]
  return colors[collection.id % colors.length]
}

const getCollectionIcon = (collection: Collection) => {
  const icons = [
    'heroicons:star','heroicons:heart','heroicons:bookmark','heroicons:film','heroicons:book-open','heroicons:trophy','heroicons:fire','heroicons:sparkles'
  ]
  return icons[collection.id % icons.length]
}

// Computed properties
const allItems = computed(() => {
  if (!data.value?.items && !data.value?.collections) return []
  
  // If data has items directly
  if (data.value.items) {
    return data.value.items
  }
  
  // If data has collections with items
  const items: CollectionItem[] = []
  data.value.collections?.forEach((collection: Collection) => {
    if (collection.items) {
      items.push(...collection.items)
    }
  })
  return items
})

const filteredItems = computed(() => {
  if (activeStatusTab.value === 'all') {
    return allItems.value
  }
  return allItems.value.filter(item => item.status === activeStatusTab.value)
})

const statusCounts = computed(() => {
  const counts: Record<string, number> = { all: allItems.value.length }
  
  Object.keys(statusConfig).forEach(status => {
    if (status !== 'all') {
      counts[status] = allItems.value.filter(item => item.status === status).length
    }
  })
  
  return counts
})

// Methods
const setActiveCollectionType = async (type: 'animes' | 'mangas') => {
  activeCollectionType.value = type
  activeStatusTab.value = 'all'
}

const setActiveStatusTab = (status: string) => {
  activeStatusTab.value = status
}

const getStatusCount = (status: string) => {
  return statusCounts.value[status] || 0
}

const getStatusLabel = (status: string) => {
  return statusConfig[status as keyof typeof statusConfig]?.label.toLowerCase() || status
}

const getStatusColor = (status?: string) => {
  if (!status || !statusConfig[status as keyof typeof statusConfig]) {
    return statusConfig.all.color
  }
  return statusConfig[status as keyof typeof statusConfig].color
}

const getStatusStyle = (status?: string) => {
  if (!status || !statusConfig[status as keyof typeof statusConfig]) {
    return statusConfig.all
  }
  return statusConfig[status as keyof typeof statusConfig]
}

const getItemStatusBorder = (status?: string) => {
  const borderMap = {
    'all': 'border-l-4 border-l-gray-400',
    'en-cours': 'border-l-4 border-l-blue-400',
    'termine': 'border-l-4 border-l-green-400',
    'planifie': 'border-l-4 border-l-yellow-400',
    'abandonne': 'border-l-4 border-l-red-400',
    'en-attente': 'border-l-4 border-l-purple-400'
  }
  
  if (!status || !borderMap[status as keyof typeof borderMap]) {
    return borderMap.all
  }
  
  return borderMap[status as keyof typeof borderMap]
}

const removeFromCollection = async (itemId: number) => {
  try {
    if (activeCollectionType.value === 'animes') {
      await collectionsAPI.removeAnimeFromCollection(0, itemId) // Collection ID not needed for direct item removal
      await refreshAnimes()
    } else {
      await collectionsAPI.removeMangaFromCollection(0, itemId) // Collection ID not needed for direct item removal  
      await refreshMangas()
    }
  } catch (e) {
    console.error('Remove from collection error:', e)
  }
}


// Create/Edit logic
const collectionsAPI = useCollectionsAPI()
const showModal = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const editingId = ref<number | null>(null)
const form = reactive<CreateCollectionDto & { id?: number; type?: string }>({ name: '', description: '', isPublic: true, type: 'animes' })

const openCreateModal = () => {
  isEditing.value = false
  editingId.value = null
  form.name = ''
  form.description = ''
  form.isPublic = true
  form.type = activeCollectionType.value
  showModal.value = true
}

const startEdit = (collection: Collection) => {
  isEditing.value = true
  editingId.value = collection.id
  form.name = collection.name
  form.description = collection.description || ''
  form.isPublic = !!collection.isPublic
  form.type = collection.type || 'animes'
  showModal.value = true
}

const closeModal = () => { showModal.value = false }

const submitForm = async () => {
  if (!form.name?.trim()) return
  saving.value = true
  try {
    if (isEditing.value && editingId.value) {
      const payload: UpdateCollectionDto = { name: form.name, description: form.description, isPublic: form.isPublic, type: form.type }
      await collectionsAPI.updateCollection(editingId.value, payload)
    } else {
      const payload: CreateCollectionDto = { name: form.name, description: form.description, isPublic: form.isPublic, type: form.type }
      await collectionsAPI.createCollection(payload)
    }
    showModal.value = false
    await refresh()
  } catch (e) {
    console.error('Save collection error:', e)
  } finally {
    saving.value = false
  }
}

const confirmDelete = async (collection: Collection) => {
  if (!confirm(`Supprimer la collection "${collection.name}" ?`)) return
  try {
    await collectionsAPI.deleteCollection(collection.id)
    await refresh()
  } catch (e) {
    console.error('Delete collection error:', e)
  }
}
</script>

<style scoped>
.page-header { @apply text-left mb-8; }
.section-title { @apply text-3xl font-bold text-gray-900 dark:text-white; }
.main-content { @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>
