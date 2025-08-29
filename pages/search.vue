<template>
  <div class="main-content">
    <div class="page-header mb-6">
      <h1 class="section-title text-2xl font-bold">Recherche</h1>
      <p class="text-gray-600 dark:text-gray-300">Résultats pour "{{ q }}"</p>
    </div>

    <div class="space-y-10">
      <!-- Animes -->
      <section>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Animes</h2>
          <span class="text-sm text-gray-500" v-if="animeTotal !== null">{{ animeTotal }} résultats</span>
        </div>
        <div v-if="animeLoading" class="flex items-center gap-2 text-gray-500">
          <span class="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></span>
          Chargement des animes...
        </div>
        <div v-else-if="animes.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="anime in animes"
            :key="anime.id"
            class="group relative bg-surface rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            @click="goToAnime(anime)"
          >
            <div class="aspect-[20/21] overflow-hidden">
              <img
                v-if="anime.image"
                :src="getImageUrl(anime.image, 'anime') as any"
                :alt="anime.titre"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                @error="(e) => ((e.target as HTMLImageElement).style.display='none')"
              />
              <div v-else class="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div class="p-3">
              <div class="font-semibold text-text line-clamp-2">{{ anime.titre }}</div>
              <div class="text-sm text-text-secondary mt-1">
                <span v-if="anime.annee">{{ anime.annee }}</span>
                <span v-if="anime.nbEp"> • {{ anime.nbEp }} ép.</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-sm text-gray-500">Aucun anime trouvé.</div>
      </section>

      <!-- Mangas -->
      <section>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Mangas</h2>
          <span class="text-sm text-gray-500" v-if="mangaTotal !== null">{{ mangaTotal }} résultats</span>
        </div>
        <div v-if="mangaLoading" class="flex items-center gap-2 text-gray-500">
          <span class="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></span>
          Chargement des mangas...
        </div>
        <div v-else-if="mangas.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <MangaCard
            v-for="manga in mangas"
            :key="manga.id"
            :manga="manga"
            @view="goToManga"
          />
        </div>
        <div v-else class="text-sm text-gray-500">Aucun manga trouvé.</div>
      </section>

      <!-- Business -->
      <section>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Business</h2>
          <span class="text-sm text-gray-500" v-if="businessTotal !== null">{{ businessTotal }} résultats</span>
        </div>
        <div v-if="businessLoading" class="flex items-center gap-2 text-gray-500">
          <span class="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></span>
          Chargement…
        </div>
        <div v-else-if="businesses.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="b in businesses"
            :key="b.idBusiness"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex gap-3 items-center cursor-pointer hover:shadow-md transition"
            @click="goToBusiness(b)"
          >
            <div class="w-16 h-20 rounded overflow-hidden flex-shrink-0" data-avatar>
              <img
                v-if="b.image"
                :src="getBusinessImageUrl(b.image)"
                :alt="b.denomination || 'Avatar'"
                class="w-full h-full object-cover"
                @error="(e) => ((e.target as HTMLImageElement).style.display='none')"
              />
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-medium text-text truncate">{{ b.denomination || 'Sans nom' }}</div>
              <div class="text-xs text-text-secondary capitalize">{{ b.type || 'business' }}</div>
            </div>
          </div>
        </div>
        <div v-else class="text-sm text-gray-500">Aucun résultat business.</div>
      </section>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import MangaCard from '~/components/MangaCard.vue'
import type { Anime, Business } from '~/types'

useHead({ title: 'Recherche - Anime-Kun' })

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const { getImageUrl } = useImageUrl()

const q = computed(() => String(route.query.q || '').trim())

// Anime
const animes = ref<Anime[]>([])
const animeTotal = ref<number | null>(null)
const animeLoading = ref(false)

// Manga
const mangas = ref<any[]>([])
const mangaTotal = ref<number | null>(null)
const mangaLoading = ref(false)

// Business
const businesses = ref<Business[]>([])
const businessTotal = ref<number | null>(null)
const businessLoading = ref(false)

const animeAPI = useAnimeAPI()
const mangaAPI = useMangaAPI()

const getBusinessImageUrl = (imagePath: string) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  const base = (config.public.apiBase || '').replace(/\/$/, '')
  return `${base}/media/business/${imagePath}`
}

let fetchSeq = 0
let isMountedFlag = true

onBeforeUnmount(() => {
  isMountedFlag = false
})

const fetchAll = async () => {
  const mySeq = ++fetchSeq
  const query = q.value
  if (!query) {
    if (!isMountedFlag || mySeq !== fetchSeq) return
    animes.value = []
    mangas.value = []
    businesses.value = []
    animeTotal.value = mangaTotal.value = businessTotal.value = 0
    return
  }

  if (!isMountedFlag || mySeq !== fetchSeq) return
  animeLoading.value = mangaLoading.value = businessLoading.value = true

  const base = (config.public.apiBase || '').replace(/\/$/, '')

  const animeP = animeAPI
    .fetchAnimes({ search: query, limit: 16, sortBy: 'titre', sortOrder: 'asc' })
    .then((res: any) => {
      if (!isMountedFlag || mySeq !== fetchSeq) return
      const parsed = Array.isArray(res?.animes)
        ? res.animes
        : Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
            ? res
            : []
      animes.value = parsed
      const meta = res.pagination || res.meta
      animeTotal.value = meta?.total ?? (animes.value?.length ?? 0)
      // Debug in dev to confirm
      if (process.dev) {
        // eslint-disable-next-line no-console
        console.log('[Search] Anime results:', { count: animes.value.length, total: animeTotal.value })
      }
      animeLoading.value = false
    })
    .catch(() => {
      if (!isMountedFlag || mySeq !== fetchSeq) return
      animes.value = []
      animeTotal.value = 0
      animeLoading.value = false
    })

  const mangaP = mangaAPI
    .fetchMangas({ search: query, limit: 16, sortBy: 'titre', sortOrder: 'asc' } as any)
    .then((res: any) => {
      if (!isMountedFlag || mySeq !== fetchSeq) return
      mangas.value = res.mangas || res.data || []
      const meta = res.pagination || res.meta
      mangaTotal.value = meta?.total ?? (mangas.value?.length ?? 0)
      mangaLoading.value = false
    })
    .catch(() => {
      if (!isMountedFlag || mySeq !== fetchSeq) return
      mangas.value = []
      mangaTotal.value = 0
      mangaLoading.value = false
    })

  const businessP = $fetch(`${base}/api/business`, {
    // Some backends do not allow sort params here; pass only supported ones
    params: { search: query, limit: 16 }
  })
    .then((res: any) => {
      if (!isMountedFlag || mySeq !== fetchSeq) return
      businesses.value = res.data || res.businesses || []
      const meta = res.pagination || res.meta
      businessTotal.value = meta?.total ?? (businesses.value?.length ?? 0)
      businessLoading.value = false
    })
    .catch(() => {
      if (!isMountedFlag || mySeq !== fetchSeq) return
      businesses.value = []
      businessTotal.value = 0
      businessLoading.value = false
    })

  await Promise.allSettled([animeP, mangaP, businessP])

  // Final guard — individual sections already flipped their loading flags
  if (!isMountedFlag || mySeq !== fetchSeq) return
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

const goToAnime = (anime: any) => {
  const niceUrl = anime.niceUrl || createSlug(anime.titre)
  navigateTo(`/anime/${niceUrl}-${anime.id}`)
}

const goToManga = (manga: any) => {
  const niceUrl = manga.niceUrl || createSlug(manga.titre)
  navigateTo(`/manga/${niceUrl}-${manga.id}`)
}

const goToBusiness = (b: any) => {
  const niceUrl = b.niceUrl || createSlug(b.denomination || 'business')
  navigateTo(`/business/${niceUrl}-${b.idBusiness}`)
}

const debouncedFetch = useDebounceFn(() => {
  fetchAll()
}, 200)

watch(q, () => {
  debouncedFetch()
})

onMounted(() => {
  fetchAll()
})
</script>

<style scoped>
.page-header {
  @apply text-left;
}
</style>
