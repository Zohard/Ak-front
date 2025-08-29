import type { 
  Collection, 
  CollectionAnime, 
  CollectionManga, 
  CreateCollectionDto, 
  UpdateCollectionDto,
  CollectionQueryParams 
} from '~/types'

export function useCollectionsAPI() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const authStore = useAuthStore()
  const config = useRuntimeConfig()

  // Prevent multiple simultaneous operations
  let isProcessing = false

  const fetchCollections = async (params?: CollectionQueryParams) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch(`${config.public.apiBase}/api/collections`, {
        params,
        headers: authStore.getAuthHeaders() as Record<string, string>
      })
      return response
    } catch (err: any) {
      error.value = 'Erreur lors du chargement des collections'
      console.error('Collections API Error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchCollectionById = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch(`${config.public.apiBase}/api/collections/${id}`, {
        headers: authStore.getAuthHeaders() as Record<string, string>
      })
      return response
    } catch (err: any) {
      error.value = 'Erreur lors du chargement de la collection'
      console.error('Collection detail API Error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchMyCollections = async (params?: CollectionQueryParams) => {
    if (!authStore.isAuthenticated) {
      throw new Error('Authentication required')
    }
    
    return fetchCollections({
      ...params,
      userId: authStore.user?.id
    })
  }

  const createCollection = async (data: CreateCollectionDto) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch(`${config.public.apiBase}/api/collections`, {
        method: 'POST',
        body: data,
        headers: authStore.getAuthHeaders() as Record<string, string>
      })
      return response
    } catch (err: any) {
      error.value = 'Erreur lors de la création de la collection'
      console.error('Create collection API Error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCollection = async (id: number, data: UpdateCollectionDto) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch(`${config.public.apiBase}/api/collections/${id}`, {
        method: 'PATCH',
        body: data,
        headers: authStore.getAuthHeaders() as Record<string, string>
      })
      return response
    } catch (err: any) {
      error.value = 'Erreur lors de la mise à jour de la collection'
      console.error('Update collection API Error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCollection = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      await $fetch(`${config.public.apiBase}/api/collections/${id}`, {
        method: 'DELETE',
        headers: authStore.getAuthHeaders() as Record<string, string>
      })
    } catch (err: any) {
      error.value = 'Erreur lors de la suppression de la collection'
      console.error('Delete collection API Error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Collection items (animes) - using new user/type endpoint
  const fetchCollectionAnimes = async (userId: number, type?: number, params?: { page?: number, limit?: number }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch(`${config.public.apiBase}/api/collections/user/${userId}/type/${type || 1}/animes`, {
        params,
        headers: authStore.getAuthHeaders() as Record<string, string>
      })
      return response
    } catch (err: any) {
      error.value = 'Erreur lors du chargement des animes de la collection'
      console.error('Collection animes API Error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const addAnimeToCollection = async (collectionId: number, animeId: number, data?: { notes?: string, rating?: number }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch(`${config.public.apiBase}/api/collections/${collectionId}/animes`, {
        method: 'POST',
        body: { animeId, ...data },
        headers: authStore.getAuthHeaders() as Record<string, string>
      })
      return response
    } catch (err: any) {
      error.value = 'Erreur lors de l\'ajout de l\'anime à la collection'
      console.error('Add anime to collection API Error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const removeAnimeFromCollection = async (collectionId: number, animeId: number) => {
    loading.value = true
    error.value = null
    
    try {
      await $fetch(`${config.public.apiBase}/api/collections/${collectionId}/animes/${animeId}`, {
        method: 'DELETE',
        headers: authStore.getAuthHeaders() as Record<string, string>
      })
    } catch (err: any) {
      error.value = 'Erreur lors de la suppression de l\'anime de la collection'
      console.error('Remove anime from collection API Error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Collection items (mangas) - using new user/type endpoint
  const fetchCollectionMangas = async (userId: number, type?: number, params?: { page?: number, limit?: number }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch(`${config.public.apiBase}/api/collections/user/${userId}/type/${type || 1}/mangas`, {
        params,
        headers: authStore.getAuthHeaders() as Record<string, string>
      })
      return response
    } catch (err: any) {
      error.value = 'Erreur lors du chargement des mangas de la collection'
      console.error('Collection mangas API Error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const addMangaToCollection = async (collectionId: number, mangaId: number, data?: { notes?: string, rating?: number }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch(`${config.public.apiBase}/api/collections/${collectionId}/mangas`, {
        method: 'POST',
        body: { mangaId, ...data },
        headers: authStore.getAuthHeaders() as Record<string, string>
      })
      return response
    } catch (err: any) {
      error.value = 'Erreur lors de l\'ajout du manga à la collection'
      console.error('Add manga to collection API Error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const removeMangaFromCollection = async (collectionId: number, mangaId: number) => {
    loading.value = true
    error.value = null
    
    try {
      await $fetch(`${config.public.apiBase}/api/collections/${collectionId}/mangas/${mangaId}`, {
        method: 'DELETE',
        headers: authStore.getAuthHeaders() as Record<string, string>
      })
    } catch (err: any) {
      error.value = 'Erreur lors de la suppression du manga de la collection'
      console.error('Remove manga from collection API Error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Generic methods
  const fetchCollectionItems = async (collectionId: number, params?: { page?: number, limit?: number }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch(`${config.public.apiBase}/api/collections/${collectionId}/items`, {
        params,
        headers: authStore.getAuthHeaders() as Record<string, string>
      })
      return response
    } catch (err: any) {
      error.value = 'Erreur lors du chargement des éléments de la collection'
      console.error('Collection items API Error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const removeFromCollection = async (collectionId: number, itemId: number) => {
    loading.value = true
    error.value = null
    
    try {
      await $fetch(`${config.public.apiBase}/api/collections/${collectionId}/items/${itemId}`, {
        method: 'DELETE',
        headers: authStore.getAuthHeaders() as Record<string, string>
      })
    } catch (err: any) {
      error.value = 'Erreur lors de la suppression de l\'élément de la collection'
      console.error('Remove from collection API Error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    fetchCollections,
    fetchCollectionById,
    fetchMyCollections,
    createCollection,
    updateCollection,
    deleteCollection,
    fetchCollectionAnimes,
    addAnimeToCollection,
    removeAnimeFromCollection,
    fetchCollectionMangas,
    addMangaToCollection,
    removeMangaFromCollection,
    fetchCollectionItems,
    removeFromCollection
  }
}