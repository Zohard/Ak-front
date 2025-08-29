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
        message: 'Authentication required to update a collection'
      },
      timestamp: new Date().toISOString()
    }
  }
  
  try {
    const body = await readBody(event)
    
    // Call the NestJS backend to update collection
    const backendUrl = `${config.public.apiBase}/collections/${collectionId}`
    
    const response = await $fetch(backendUrl, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`
      },
      body
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
      message: 'Collection updated successfully',
      timestamp: new Date().toISOString()
    }
    
  } catch (error: any) {
    console.error('Update Collection API Error:', error)
    
    let statusCode = error.response?.status || 500
    let errorCode = error.response?.data?.code || 'UPDATE_ERROR'
    let errorMessage = error.response?.data?.message || error.message || 'Failed to update collection'
    
    if (statusCode === 401) {
      errorCode = 'UNAUTHORIZED'
      errorMessage = 'Invalid or expired authentication token'
    } else if (statusCode === 403) {
      errorCode = 'FORBIDDEN'
      errorMessage = 'You do not have permission to update this collection'
    } else if (statusCode === 404) {
      errorCode = 'NOT_FOUND'
      errorMessage = 'Collection not found'
    } else if (statusCode === 400) {
      errorCode = 'VALIDATION_ERROR'
      errorMessage = error.response?.data?.message || 'Invalid collection data'
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