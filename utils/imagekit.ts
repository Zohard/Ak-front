/**
 * ImageKit integration utilities
 * Maintains compatibility with existing image structure
 */

const IMAGEKIT_BASE_URL = 'https://ik.imagekit.io/akimages'

export interface ImageKitOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'auto' | 'jpg' | 'png' | 'webp'
  crop?: 'maintain_ratio' | 'force' | 'at_least' | 'at_max'
  focus?: 'auto' | 'face' | 'center'
  blur?: number
  progressive?: boolean
}

/**
 * Generate ImageKit URL for anime/manga images
 * Maintains existing path structure: /images/animes/{filename}
 */
export function getImageKitUrl(
  imagePath: string, 
  type: 'anime' | 'manga' = 'anime',
  options: ImageKitOptions = {}
): string {
  if (!imagePath) return ''
  
  // Handle already complete URLs
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
  
  // Build ImageKit path maintaining structure: /images/animes/{filename}
  const imagekitPath = `/images/${type}s/${cleanPath}`
  
  // Build transformation parameters
  const transformations = buildTransformations(options)
  const transformString = transformations.length > 0 ? `tr:${transformations.join(',')}` : ''
  
  // Construct final URL
  const baseUrl = `${IMAGEKIT_BASE_URL}${imagekitPath}`
  return transformString ? `${baseUrl}?${transformString}` : baseUrl
}

/**
 * Generate responsive ImageKit URLs for different screen densities
 */
export function getImageKitSrcSet(
  imagePath: string,
  type: 'anime' | 'manga' = 'anime',
  baseWidth: number,
  baseHeight?: number,
  options: Omit<ImageKitOptions, 'width' | 'height'> = {}
): string {
  const densities = [1, 1.5, 2]
  
  return densities.map(density => {
    const width = Math.round(baseWidth * density)
    const height = baseHeight ? Math.round(baseHeight * density) : undefined
    
    const url = getImageKitUrl(imagePath, type, {
      ...options,
      width,
      height
    })
    
    return `${url} ${density}x`
  }).join(', ')
}

/**
 * Build ImageKit transformation parameters
 */
function buildTransformations(options: ImageKitOptions): string[] {
  const transforms: string[] = []
  
  if (options.width) transforms.push(`w-${options.width}`)
  if (options.height) transforms.push(`h-${options.height}`)
  if (options.quality) transforms.push(`q-${options.quality}`)
  if (options.format) transforms.push(`f-${options.format}`)
  if (options.crop) transforms.push(`c-${options.crop}`)
  if (options.focus) transforms.push(`fo-${options.focus}`)
  if (options.blur) transforms.push(`bl-${options.blur}`)
  if (options.progressive) transforms.push('pr-true')
  
  return transforms
}

/**
 * Get optimized ImageKit URL based on device capabilities
 */
export function getOptimizedImageKitUrl(
  imagePath: string,
  type: 'anime' | 'manga' = 'anime',
  targetWidth?: number,
  targetHeight?: number,
  connectionType?: string
): string {
  const options: ImageKitOptions = {
    format: 'auto', // Let ImageKit choose best format
    progressive: true,
    crop: 'maintain_ratio'
  }
  
  // Adjust quality based on connection
  if (connectionType === 'slow-2g' || connectionType === '2g') {
    options.quality = 60
  } else if (connectionType === '3g') {
    options.quality = 75
  } else {
    options.quality = 85
  }
  
  if (targetWidth) options.width = targetWidth
  if (targetHeight) options.height = targetHeight
  
  return getImageKitUrl(imagePath, type, options)
}

/**
 * Extract filename from various image path formats for ImageKit
 */
export function normalizeImagePath(imagePath: string): string {
  if (!imagePath) return ''
  
  // Handle existing API paths
  const apiMatch = imagePath.match(/\/api\/media\/serve\/\w+\/(.+)/)
  if (apiMatch) return apiMatch[1]
  
  // Handle direct paths
  const directMatch = imagePath.match(/\/images\/\w+\/(.+)/)
  if (directMatch) return directMatch[1]
  
  // Handle webzine images
  const webzineMatch = imagePath.match(/webzine\/img\/(.+)/)
  if (webzineMatch) return webzineMatch[1]
  
  // Return as-is if no pattern matches
  return imagePath.replace(/^\/+/, '') // Remove leading slashes
}