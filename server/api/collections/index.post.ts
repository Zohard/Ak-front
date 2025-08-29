export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  // Get user session/auth token
  const authToken = getCookie(event, 'auth-token') || getHeader(event, 'authorization')
  
  if (!authToken) {
    setResponseStatus(event, 401)
    return {
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required to create a collection'
      },
      timestamp: new Date().toISOString()
    }
  }
  
  try {
    const body = await readBody(event)
    
    // Call the NestJS backend to create collection
    const backendUrl = `${config.public.apiBase}/collections`
    
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
    const collection = {
      ...response.data || response,
      createdAt: response.createdAt || response.dateCreation,
      updatedAt: response.updatedAt || response.dateModification,
      itemCount: response.itemCount || response.nbItems || 0
    }
    
    return {
      success: true,
      data: collection,
      message: 'Collection created successfully',
      timestamp: new Date().toISOString()
    }
    
  } catch (error: any) {
    console.error('Create Collection API Error:', error)
    
    let statusCode = error.response?.status || 500
    let errorCode = error.response?.data?.code || 'CREATE_ERROR'
    let errorMessage = error.response?.data?.message || error.message || 'Failed to create collection'
    
    if (statusCode === 401) {
      errorCode = 'UNAUTHORIZED'
      errorMessage = 'Invalid or expired authentication token'
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