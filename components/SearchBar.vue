<template>
  <div class="relative w-full max-w-lg" ref="searchContainer">
    <div class="relative group">
      <!-- Simplified: remove Icon to avoid render loops during debug -->
      <input
        v-model="query"
        ref="searchInput"
        type="text"
        :placeholder="placeholder"
        class="w-full pl-12 pr-12 py-3 bg-surface border border-border rounded-xl text-text placeholder-text-muted
               focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
               hover:border-primary-400 transition-all duration-200
               shadow-sm hover:shadow-md focus:shadow-lg"
        @focus="handleFocus"
        
        @keydown.escape="clearSearch"
        @keydown.enter="performSearch"
        @keydown.arrow-down="navigateSuggestions(1)"
        @keydown.arrow-up="navigateSuggestions(-1)"
      />
      
      <!-- Action buttons -->
      <div class="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
        <span v-if="loading" class="text-xs text-primary-500">...</span>
        <button
          v-else-if="query"
          @click="clearSearch"
          class="p-1 rounded-full hover:bg-surface-hover text-text-muted hover:text-text transition-all duration-200"
        >
          ×
        </button>
        <div v-else class="hidden sm:flex items-center gap-1 px-2 py-1 bg-background border border-border rounded-md text-xs text-text-muted">
          <span>⌘</span>
          <span>K</span>
        </div>
      </div>
    </div>

    <!-- Autocomplete suggestions -->
    <!-- Suggestions panel disabled when enableAutocomplete is false -->
    <div 
      v-if="enableAutocomplete && showSuggestions && (suggestions.length || recentSearches.length) && (query || showRecent)"
      class="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-card z-50 max-h-96 overflow-hidden backdrop-blur-sm"
    >
        <!-- Search results -->
        <div v-if="suggestions.length && query" class="p-3">
          <div class="text-xs font-medium text-text-muted mb-3 px-3">Résultats de recherche</div>
          <div
            v-for="(suggestion, index) in suggestions"
            :key="`${suggestion.type}-${suggestion.id}`"
            :class="[
              'flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200',
              'hover:bg-surface-hover hover:shadow-sm',
              selectedSuggestionIndex === index ? 'bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-200 dark:ring-primary-800' : ''
            ]"
            @click="selectSuggestion(suggestion)"
          >
            <!-- Thumbnail -->
            <div 
              class="w-12 h-16 mr-4 flex-shrink-0 rounded-lg overflow-hidden"
              :data-media-type="suggestion.type"
            >
              <SmartImage
                v-if="suggestion.image"
                :src="getImageUrl(suggestion.image, suggestion.type) as any"
                :alt="suggestion.titre"
                aspect-ratio="3/4"
                container-class="w-12 h-16"
                image-class="w-full h-full object-cover"
                :placeholder-icon="suggestion.type === 'anime' ? 'heroicons:tv' : 'heroicons:book-open'"
              />
              <div v-else class="w-12 h-16 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500">
                {{ suggestion.type }}
              </div>
            </div>
            
            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="font-medium text-text truncate mb-1">
                {{ suggestion.titre }}
              </div>
              <div class="flex items-center gap-3 text-sm text-text-secondary">
                <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs capitalize">{{ suggestion.type }}</span>
                <span v-if="suggestion.annee">{{ suggestion.annee }}</span>
                <span v-if="suggestion.moyenne_notes">{{ (suggestion.moyenne_notes / 10).toFixed(1) }}</span>
              </div>
            </div>
            
            <!-- Arrow removed -->
          </div>
        </div>

        <!-- Recent searches -->
        <div v-if="recentSearches.length && !query" class="p-3">
          <div class="text-xs font-medium text-text-muted mb-3 px-3 flex items-center justify-between">
            Recherches récentes
            <button 
              @click="clearRecentSearches"
              class="text-primary-600 hover:text-primary-700 text-xs"
            >
              Effacer tout
            </button>
          </div>
          <div
            v-for="(recent, index) in recentSearches.slice(0, 5)"
            :key="recent"
            class="flex items-center p-2 rounded-lg cursor-pointer hover:bg-surface-hover transition-colors duration-200"
            @click="performRecentSearch(recent)"
          >
            <span class="text-text-muted mr-3">⏱</span>
            <span class="flex-1 text-text">{{ recent }}</span>
            <button
              @click.stop="removeRecentSearch(recent)"
              class="p-1 rounded hover:bg-surface-hover text-text-muted hover:text-text"
            >
              ×
            </button>
          </div>
        </div>

        <!-- Quick actions -->
        <div v-if="query" class="border-t border-border bg-background/50 backdrop-blur-sm p-3">
          <button
            class="w-full justify-center text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-3 py-2 rounded"
            @click="performSearch"
          >
            Voir tous les résultats pour "{{ query }}"
          </button>
        </div>
    </div>

  </div>
</template>

<script setup lang="ts">
interface Props {
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  showRecent?: boolean
}

interface SearchResult {
  id: number
  titre: string
  image?: string
  type: 'anime' | 'manga'
  annee?: number
  moyenne_notes?: number
  niceUrl?: string
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Rechercher des animes, mangas...',
  size: 'md',
  showRecent: true
})

// Feature flag: enable minimal, text-only autocomplete
const enableAutocomplete = true

// Refs
const searchContainer = ref<HTMLElement>()
const searchInput = ref<HTMLInputElement>()

// Reactive state
const query = ref('')
const suggestions = ref<SearchResult[]>([])
const showSuggestions = ref(false)
const loading = ref(false)
const selectedSuggestionIndex = ref(-1)
const showRecent = ref(false)
// Local storage for recent searches
const recentSearches = ref<string[]>([])

// Load recent searches on mount
onMounted(() => {
  try {
    const stored = localStorage.getItem('anime-kun-recent-searches')
    if (stored) {
      recentSearches.value = JSON.parse(stored)
    }
  } catch (error) {
    console.warn('Failed to load recent searches:', error)
  }
})

// Debounced, abortable search implementation (native fetch to avoid interceptor loops)
let searchTimeout: ReturnType<typeof setTimeout> | null = null
let activeController: AbortController | null = null
let requestSeq = 0

const fetchJson = async (url: string, params: Record<string, any>, signal: AbortSignal) => {
  const usp = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) usp.append(k, String(v))
  })
  const full = `${url}?${usp.toString()}`
  const res = await fetch(full, { signal })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

const performAutocomplete = async (searchQuery: string) => {
  // Require at least 3 characters
  if (!searchQuery || searchQuery.trim().length < 3) {
    if (activeController) activeController.abort()
    suggestions.value = []
    loading.value = false
    return
  }

  // Cancel any in-flight request
  if (activeController) activeController.abort()
  const controller = new AbortController()
  activeController = controller
  const mySeq = ++requestSeq

  loading.value = true
  try {
    const config = useRuntimeConfig()
    const base = config.public.apiBase?.replace(/\/$/, '') || ''

    const [animeResults, mangaResults] = await Promise.all([
      fetchJson(`${base}/api/animes/autocomplete`, { q: searchQuery, limit: 3 }, controller.signal),
      fetchJson(`${base}/api/mangas/autocomplete`, { q: searchQuery, limit: 3 }, controller.signal)
    ])

    // Ignore if a newer request finished already
    if (mySeq !== requestSeq) return

    const animeData = (animeResults as any).data || []
    const animeItems = Array.isArray(animeData) ? animeData.map((item: any) => ({
      id: item.id || item.id_anime,
      titre: item.titre,
      type: 'anime' as const,
      annee: item.annee,
      moyenne_notes: item.moyenne_notes || item.moyennenotes,
      image: item.image
    })) : []

    const mangaData = (mangaResults as any).data || []
    const mangaItems = Array.isArray(mangaData) ? mangaData.map((item: any) => ({
      id: item.id || item.id_manga,
      titre: item.titre,
      type: 'manga' as const,
      annee: item.annee,
      moyenne_notes: item.moyenne_notes || item.moyennenotes,
      image: item.image
    })) : []

    suggestions.value = [...animeItems, ...mangaItems].slice(0, 5)
  } catch (error: any) {
    if (error?.name === 'AbortError') return
    console.error('Search autocomplete error:', error)
    suggestions.value = []
  } finally {
    if (mySeq === requestSeq) {
      loading.value = false
    }
  }
}

watch(query, (newQuery) => {
  selectedSuggestionIndex.value = -1
  if (!enableAutocomplete) return
  if (searchTimeout) clearTimeout(searchTimeout)
  const q = newQuery
  searchTimeout = setTimeout(() => performAutocomplete(q), 250)
}, { flush: 'post' })

const handleFocus = () => {
  if (!enableAutocomplete) return
  showSuggestions.value = true
  if (!query.value && props.showRecent) {
    showRecent.value = true
  }
}

const navigateSuggestions = (direction: number) => {
  if (!suggestions.value.length) return
  
  const maxIndex = suggestions.value.length - 1
  selectedSuggestionIndex.value += direction
  
  if (selectedSuggestionIndex.value > maxIndex) {
    selectedSuggestionIndex.value = 0
  } else if (selectedSuggestionIndex.value < 0) {
    selectedSuggestionIndex.value = maxIndex
  }
}

// Recent searches management
const saveToRecentSearches = (searchTerm: string) => {
  if (!searchTerm.trim()) return
  
  const newRecentSearches = [
    searchTerm,
    ...recentSearches.value.filter(s => s !== searchTerm)
  ].slice(0, 10) // Keep only last 10 searches
  
  recentSearches.value = newRecentSearches
  
  try {
    localStorage.setItem('anime-kun-recent-searches', JSON.stringify(newRecentSearches))
  } catch (error) {
    console.warn('Failed to save recent searches:', error)
  }
}

const clearRecentSearches = () => {
  recentSearches.value = []
  localStorage.removeItem('anime-kun-recent-searches')
}

const removeRecentSearch = (searchTerm: string) => {
  recentSearches.value = recentSearches.value.filter(s => s !== searchTerm)
  try {
    localStorage.setItem('anime-kun-recent-searches', JSON.stringify(recentSearches.value))
  } catch (error) {
    console.warn('Failed to update recent searches:', error)
  }
}

const performRecentSearch = (searchTerm: string) => {
  query.value = searchTerm
  showSuggestions.value = false
  performSearch()
}

const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ýÿ]/g, 'y')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const selectSuggestion = (suggestion: SearchResult) => {
  query.value = suggestion.titre
  showSuggestions.value = false
  
  // Navigate to detail page
  if (suggestion.type === 'anime') {
    const niceUrl = suggestion.niceUrl || createSlug(suggestion.titre || suggestion.title)
    navigateTo(`/anime/${niceUrl}-${suggestion.id}`)
  } else if (suggestion.type === 'manga') {
    const niceUrl = suggestion.niceUrl || createSlug(suggestion.titre || suggestion.title)
    navigateTo(`/manga/${niceUrl}-${suggestion.id}`)
  }
}

const clearSearch = () => {
  query.value = ''
  suggestions.value = []
  showSuggestions.value = false
}

const performSearch = () => {
  if (query.value.trim()) {
    // Handle keyboard selection
    if (selectedSuggestionIndex.value >= 0 && suggestions.value.length) {
      selectSuggestion(suggestions.value[selectedSuggestionIndex.value])
      return
    }
    
    saveToRecentSearches(query.value.trim())
    showSuggestions.value = false
    showRecent.value = false
    navigateTo(`/search?q=${encodeURIComponent(query.value)}`)
  }
}

const hideSuggestions = () => {
  // Hide immediately without DOM transition to avoid race conditions
  showSuggestions.value = false
  showRecent.value = false
  selectedSuggestionIndex.value = -1
}

// Use the same image URL logic as other components
const { getImageUrl } = useImageUrl()

// Keyboard shortcut and event listeners
let keydownHandler: ((e: KeyboardEvent) => void) | null = null
let clickHandler: ((event: MouseEvent) => void) | null = null

onMounted(() => {
  // Keyboard shortcut (Cmd/Ctrl + K)
  keydownHandler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      searchInput.value?.focus()
    }
  }
  
  // Clear suggestions when clicking outside
  clickHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!searchContainer.value?.contains(target)) {
      showSuggestions.value = false
    }
  }
  
  document.addEventListener('keydown', keydownHandler)
  document.addEventListener('click', clickHandler)
})

onUnmounted(() => {
  if (keydownHandler) {
    document.removeEventListener('keydown', keydownHandler)
  }
  if (clickHandler) {
    document.removeEventListener('click', clickHandler)
  }
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  if (activeController) {
    activeController.abort()
    activeController = null
  }
})
</script>
