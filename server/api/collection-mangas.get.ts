export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { id_membre } = query

    if (!id_membre) {
      throw createError({
        statusCode: 400,
        statusMessage: 'id_membre is required'
      })
    }

    const config = useRuntimeConfig()
    const headers = getHeaders(event)
    
    // Get all manga items from all collection types for the user
    const allMangaItems: any[] = []
    const collectionTypes = [1, 2, 3, 4] // Plan to Read, Reading, Completed, Dropped
    
    for (const type of collectionTypes) {
      try {
        const mangasResponse = await $fetch(`${config.public.apiBase}/api/collections/user/${id_membre}/type/${type}/mangas`, {
          method: 'GET',
          params: {
            page: query.page || 1,
            limit: query.limit || 1000 // Get all items
          },
          headers: {
            'Authorization': headers.authorization,
            'Content-Type': 'application/json'
          }
        })
        
        if (mangasResponse.success && mangasResponse.data && Array.isArray(mangasResponse.data)) {
          // Transform items to frontend format
          const itemsWithStatus = mangasResponse.data.map((item: any) => ({
            id: item.id,
            collectionId: null, // Not relevant for the new structure
            collectionName: getCollectionNameFromType(type),
            collectionType: type,
            status: getStatusFromCollectionType(type),
            title: item.manga?.titre || 'Manga sans titre',
            imageUrl: item.manga?.image ? `${config.public.apiBase}/uploads/mangas/${item.manga.image}` : null,
            year: item.manga?.annee,
            progress: item.manga?.auteur ? `Par ${item.manga.auteur}` : null,
            description: item.manga?.synopsis,
            addedAt: item.addedAt,
            notes: item.notes,
            rating: item.rating,
            manga: item.manga
          }))
          
          allMangaItems.push(...itemsWithStatus)
        }
      } catch (err) {
        console.warn(`Failed to fetch mangas for collection type ${type}:`, err)
        continue
      }
    }

    return {
      items: allMangaItems,
      collections: [] // Not needed with new structure
    }

  } catch (error: any) {
    console.error('Collection mangas proxy error:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch manga collections'
    })
  }
})

// Map collection types to status
function getStatusFromCollectionType(type: number) {
  switch (type) {
    case 1: return 'termine' // Completed
    case 2: return 'planifie' // Plan to Read
    case 3: return 'en-cours' // Reading
    case 4: return 'abandonne' // Dropped
    default: return 'en-attente' // Default
  }
}

// Map collection types to name
function getCollectionNameFromType(type: number) {
  switch (type) {
    case 1: return 'Terminé'
    case 2: return 'Planifié'
    case 3: return 'En cours'
    case 4: return 'Abandonné'
    default: return 'Autre'
  }
}