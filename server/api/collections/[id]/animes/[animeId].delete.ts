export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const collectionId = getRouterParam(event, 'id')
  const animeId = getRouterParam(event, 'animeId')
  
  if (!collectionId || !animeId) {
    setResponseStatus(event, 400)
    return {
      success: false,
      error: {
        code: 'MISSING_PARAMS',
        message: 'Collection ID and Anime ID are required'
      },
      timestamp: new Date().toISOString()
    }
  }
  
  // Get user session/auth token
  const authToken = getCookie(event, 'auth-token') || getHeader(event, 'authorization')
  
  if (!authToken) {
    setResponseStatus(event, 401)
    return {
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required to remove anime from collection'
      },
      timestamp: new Date().toISOString()
    }
  }
  
  try {
    // Call the NestJS backend to remove anime from collection
    const backendUrl = `${config.public.apiBase}/collections/${collectionId}/animes/${animeId}`
    
    await $fetch(backendUrl, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`
      }
    })
    
    return {
      success: true,
      message: 'Anime removed from collection successfully',
      timestamp: new Date().toISOString()
    }
    
  } catch (error: any) {
    console.error('Remove Anime from Collection API Error:', error)
    
    let statusCode = error.response?.status || 500
    let errorCode = error.response?.data?.code || 'REMOVE_ERROR'
    let errorMessage = error.response?.data?.message || error.message || 'Failed to remove anime from collection'
    
    if (statusCode === 401) {
      errorCode = 'UNAUTHORIZED'
      errorMessage = 'Invalid or expired authentication token'
    } else if (statusCode === 403) {
      errorCode = 'FORBIDDEN'
      errorMessage = 'You do not have permission to modify this collection'
    } else if (statusCode === 404) {
      errorCode = 'NOT_FOUND'
      errorMessage = 'Collection, anime, or collection item not found'
    }
    
    setResponseStatus(event, statusCode)
    return {
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
        details: error.response?.data
      },
      timestamp: new Date().toISOString()
    }
  }
})