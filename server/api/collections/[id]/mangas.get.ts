export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const collectionId = getRouterParam(event, 'id')
  const query = getQuery(event)
  
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
    // Build query parameters
    const params = new URLSearchParams()
    
    if (query.page) params.append('page', query.page as string)
    if (query.limit) params.append('limit', query.limit as string)
    
    // Call the NestJS backend for collection mangas
    const backendUrl = `${config.public.apiBase}/collections/${collectionId}/mangas?${params.toString()}`
    
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
    const mangas = (response.data || response.mangas || response || []).map((item: any) => ({
      ...item,
      addedAt: item.addedAt || item.dateAjout
    }))
    
    return {
      success: true,
      data: mangas,
      meta: {
        total: response.total || mangas.length,
        page: parseInt(query.page as string) || 1,
        limit: parseInt(query.limit as string) || 20,
        hasMore: response.hasMore || false
      },
      timestamp: new Date().toISOString()
    }
    
  } catch (error: any) {
    console.error('Collection Mangas API Error:', error)
    
    let statusCode = error.response?.status || 500
    let errorCode = error.response?.data?.code || 'FETCH_ERROR'
    let errorMessage = error.response?.data?.message || error.message || 'Failed to fetch collection mangas'
    
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