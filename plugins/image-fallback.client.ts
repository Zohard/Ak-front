export default defineNuxtPlugin(() => {
  if (!process.client) return

  const OLD_HOSTS = ['casimages.com', 'imageshack', 'hostingpics.net']

  const makePlaceholder = (text: string, width: number, height: number, bg = '#9ca3af') => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect width="100%" height="100%" fill="${bg}"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="${Math.max(12, Math.floor(Math.min(width, height) / 6))}">${text}</text>
      </svg>
    `
    return `data:image/svg+xml;base64,${btoa(svg)}`
  }

  document.addEventListener(
    'error',
    (event) => {
      const target = event.target as HTMLElement | null
      if (!target || target.tagName !== 'IMG') return
      const img = target as HTMLImageElement

      const originalSrc = img.src || ''

      // 1) Try HTTP fallback once for known old hosts with bad SSL when starting from HTTPS
      const isOldHost = OLD_HOSTS.some((h) => originalSrc.includes(h))
      if (
        isOldHost &&
        originalSrc.startsWith('https://') &&
        img.dataset.httpFallbackAttempted !== 'true'
      ) {
        img.dataset.httpFallbackAttempted = 'true'
        img.src = originalSrc.replace('https://', 'http://')
        return
      }

      // 2) Otherwise, replace with an inline placeholder once to avoid endless errors
      if (img.dataset.placeholderSet === 'true') return
      img.dataset.placeholderSet = 'true'

      // Determine context (anime/manga/avatar) from attributes or proximity
      const isAvatar =
        img.alt?.toLowerCase().includes('avatar') ||
        !!img.closest('[data-avatar]') ||
        (img.width && img.width <= 128 && img.height && img.height <= 128)

      const isAnime =
        img.alt?.toLowerCase().includes('anime') || !!img.closest('[data-media-type="anime"]')
      const isManga =
        img.alt?.toLowerCase().includes('manga') || !!img.closest('[data-media-type="manga"]')

      let text = 'Image'
      let bg = '#9ca3af'
      if (isAvatar) {
        text = 'Avatar'
        bg = '#6b7280'
      } else if (isAnime) {
        text = 'Anime'
        bg = '#3b82f6'
      } else if (isManga) {
        text = 'Manga'
        bg = '#10b981'
      }

      const width = img.naturalWidth || img.width || 120
      const height = img.naturalHeight || img.height || 120
      img.src = makePlaceholder(text, width, height, bg)
      img.style.opacity = '0.85'
    },
    true // capture
  )
})
