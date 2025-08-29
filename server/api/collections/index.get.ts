export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  
  // Get user session/auth token (optional for public collections)
  const authToken = getCookie(event, 'auth-token') || getHeader(event, 'authorization')
  
  try {
    // Build query parameters
    const params = new URLSearchParams()
    
    if (query.page) params.append('page', query.page as string)
    if (query.limit) params.append('limit', query.limit as string)
    if (query.search) params.append('search', query.search as string)
    if (query.sortBy) params.append('sortBy', query.sortBy as string)
    if (query.sortOrder) params.append('sortOrder', query.sortOrder as string)
    if (query.userId) params.append('userId', query.userId as string)
    if (query.isPublic !== undefined) params.append('isPublic', query.isPublic as string)
    
    // Call the NestJS backend for collections
    const backendUrl = `${config.public.apiBase}/collections?${params.toString()}`
    
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
    const collections = (response.data || response.collections || response || []).map((collection: any) => ({
      ...collection,
      // Ensure consistent field naming
      createdAt: collection.createdAt || collection.dateCreation,
      updatedAt: collection.updatedAt || collection.dateModification,
      itemCount: collection.itemCount || collection.nbItems || 0
    }))
    
    return {
      success: true,
      data: collections,
      meta: {
        total: response.total || collections.length,
        page: parseInt(query.page as string) || 1,
        limit: parseInt(query.limit as string) || 20,
        hasMore: response.hasMore || false
      },
      timestamp: new Date().toISOString()
    }
    
  } catch (error: any) {
    console.error('Collections API Error:', error)
    
    let statusCode = error.response?.status || 500
    let errorCode = error.response?.data?.code || 'FETCH_ERROR'
    let errorMessage = error.response?.data?.message || error.message || 'Failed to fetch collections'
    
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