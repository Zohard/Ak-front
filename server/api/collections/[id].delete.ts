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
        message: 'Authentication required to delete a collection'
      },
      timestamp: new Date().toISOString()
    }
  }
  
  try {
    // Call the NestJS backend to delete collection
    const backendUrl = `${config.public.apiBase}/collections/${collectionId}`
    
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
      message: 'Collection deleted successfully',
      timestamp: new Date().toISOString()
    }
    
  } catch (error: any) {
    console.error('Delete Collection API Error:', error)
    
    let statusCode = error.response?.status || 500
    let errorCode = error.response?.data?.code || 'DELETE_ERROR'
    let errorMessage = error.response?.data?.message || error.message || 'Failed to delete collection'
    
    if (statusCode === 401) {
      errorCode = 'UNAUTHORIZED'
      errorMessage = 'Invalid or expired authentication token'
    } else if (statusCode === 403) {
      errorCode = 'FORBIDDEN'
      errorMessage = 'You do not have permission to delete this collection'
    } else if (statusCode === 404) {
      errorCode = 'NOT_FOUND'
      errorMessage = 'Collection not found'
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