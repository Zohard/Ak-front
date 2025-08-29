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
    
    // Get all anime items from all collection types for the user
    const allAnimeItems: any[] = []
    const collectionTypes = [1, 2, 3, 4] // Plan to Watch, Watching, Completed, Dropped
    
    for (const type of collectionTypes) {
      try {
        const animesResponse = await $fetch(`${config.public.apiBase}/api/collections/user/${id_membre}/type/${type}/animes`, {
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
        
        if (animesResponse.success && animesResponse.data && Array.isArray(animesResponse.data)) {
          // Transform items to frontend format
          const itemsWithStatus = animesResponse.data.map((item: any) => ({
            id: item.id,
            collectionId: null, // Not relevant for the new structure
            collectionName: getCollectionNameFromType(type),
            collectionType: type,
            status: getStatusFromCollectionType(type),
            title: item.anime?.titre || 'Anime sans titre',
            imageUrl: item.anime?.image ? `${config.public.apiBase}/uploads/animes/${item.anime.image}` : null,
            year: item.anime?.annee,
            progress: item.anime?.nbEp ? `${item.anime.nbEp} épisodes` : null,
            description: item.anime?.synopsis,
            addedAt: item.addedAt,
            notes: item.notes,
            rating: item.rating,
            anime: item.anime
          }))
          
          allAnimeItems.push(...itemsWithStatus)
        }
      } catch (err) {
        console.warn(`Failed to fetch animes for collection type ${type}:`, err)
        continue
      }
    }

    return {
      items: allAnimeItems,
      collections: [] // Not needed with new structure
    }

  } catch (error: any) {
    console.error('Collection animes proxy error:', {
      message: error.message,
      statusCode: error.statusCode,
      statusMessage: error.statusMessage,
      data: error.data,
      stack: error.stack
    })
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Failed to fetch anime collections'
    })
  }
})

// Map collection types to status
function getStatusFromCollectionType(type: number) {
  switch (type) {
    case 1: return 'termine' // Completed
    case 2: return 'planifie' // Plan to Watch
    case 3: return 'en-cours' // Watching
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