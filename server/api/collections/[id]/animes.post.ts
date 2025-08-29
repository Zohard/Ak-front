export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const collectionId = getRouterParam(event, 'id')
  
  if (!collectionId) {
    setResponseStatus(event, 400)
    return {
      success: false,
      error: {
        code: 'MISSING_ID',
        message: 'Collection ID is required'
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
        message: 'Authentication required to add anime to collection'
      },
      timestamp: new Date().toISOString()
    }
  }
  
  try {
    const body = await readBody(event)
    
    // Call the NestJS backend to add anime to collection
    const backendUrl = `${config.public.apiBase}/collections/${collectionId}/animes`
    
    const response = await $fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`
      },
      body
    })
    
    // Transform backend response to frontend format
    const collectionAnime = {
      ...response.data || response,
      addedAt: response.addedAt || response.dateAjout
    }
    
    return {
      success: true,
      data: collectionAnime,
      message: 'Anime added to collection successfully',
      timestamp: new Date().toISOString()
    }
    
  } catch (error: any) {
    console.error('Add Anime to Collection API Error:', error)
    
    let statusCode = error.response?.status || 500
    let errorCode = error.response?.data?.code || 'ADD_ERROR'
    let errorMessage = error.response?.data?.message || error.message || 'Failed to add anime to collection'
    
    if (statusCode === 401) {
      errorCode = 'UNAUTHORIZED'
      errorMessage = 'Invalid or expired authentication token'
    } else if (statusCode === 403) {
      errorCode = 'FORBIDDEN'
      errorMessage = 'You do not have permission to modify this collection'
    } else if (statusCode === 404) {
      errorCode = 'NOT_FOUND'
      errorMessage = 'Collection or anime not found'
    } else if (statusCode === 409) {
      errorCode = 'ALREADY_EXISTS'
      errorMessage = 'Anime is already in this collection'
    } else if (statusCode === 400) {
      errorCode = 'VALIDATION_ERROR'
      errorMessage = error.response?.data?.message || 'Invalid data'
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