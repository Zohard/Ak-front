export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  
  // Get user session/auth token
  const authToken = getCookie(event, 'auth-token') || getHeader(event, 'authorization')
  
  if (!authToken) {
    setResponseStatus(event, 401)
    return {
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required to view your collections'
      },
      timestamp: new Date().toISOString()
    }
  }
  
  try {
    // Build query parameters
    const params = new URLSearchParams()

    if (query.page) params.append('page', query.page as string)
    if (query.limit) params.append('limit', query.limit as string)
    if (query.search) params.append('search', query.search as string)
    if (query.sortBy) params.append('sortBy', query.sortBy as string)
    if (query.sortOrder) params.append('sortOrder', query.sortOrder as string)
    if (query.isPublic !== undefined) params.append('isPublic', query.isPublic as string)

    // Prefer explicit userId param from client; otherwise try to infer from JWT
    if (query.userId) {
      params.append('userId', String(query.userId))
    } else if (authToken) {
      try {
        const token = (authToken.startsWith('Bearer ') ? authToken.slice(7) : authToken)
        const payload = JSON.parse(Buffer.from(token.split('.')[1] || '', 'base64').toString('utf8'))
        const sub = payload?.sub || payload?.userId || payload?.id
        if (sub) params.append('userId', String(sub))
      } catch {}
    }

    // Call the NestJS backend for current user's collections (dedicated my endpoint)
    const backendUrl = `${config.public.apiBase}/api/collections/my?${params.toString()}`

    const response = await $fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`
      }
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
    console.error('My Collections API Error:', error)
    
    let statusCode = error.response?.status || 500
    let errorCode = error.response?.data?.code || 'FETCH_ERROR'
    let errorMessage = error.response?.data?.message || error.message || 'Failed to fetch your collections'
    
    if (statusCode === 401) {
      errorCode = 'UNAUTHORIZED'
      errorMessage = 'Invalid or expired authentication token'
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
