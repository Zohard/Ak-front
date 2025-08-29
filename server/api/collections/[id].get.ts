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
  
  // Get user session/auth token (optional for public collections)
  const authToken = getCookie(event, 'auth-token') || getHeader(event, 'authorization')
  
  try {
    // Call the NestJS backend for collection details
    const backendUrl = `${config.public.apiBase}/collections/${collectionId}`
    
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    
    if (authToken) {
      headers['Authorization'] = authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`
    }
    
    const response = await $fetch(backendUrl, {
      method: 'GET',
      headers
    })
    
    // Transform backend response to frontend format
    const collection = {
      ...response.data || response,
      createdAt: response.createdAt || response.dateCreation,
      updatedAt: response.updatedAt || response.dateModification,
      itemCount: response.itemCount || response.nbItems || 0
    }
    
    return {
      success: true,
      data: collection,
      timestamp: new Date().toISOString()
    }
    
  } catch (error: any) {
    console.error('Collection Detail API Error:', error)
    
    let statusCode = error.response?.status || 500
    let errorCode = error.response?.data?.code || 'FETCH_ERROR'
    let errorMessage = error.response?.data?.message || error.message || 'Failed to fetch collection'
    
    if (statusCode === 404) {
      errorCode = 'NOT_FOUND'
      errorMessage = 'Collection not found'
    } else if (statusCode === 403) {
      errorCode = 'FORBIDDEN'
      errorMessage = 'Access denied to this collection'
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