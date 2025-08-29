export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  
  try {
    console.log('Proxying animes request with query:', query)
    
    const response: any = await $fetch(`${config.public.apiBase}/api/animes`, {
      query
    })
    
    // Quick relevance sort (client-side) when searching, to favor exact/prefix title matches
    const search = (query.search as string) || (query.q as string) || ''
    if (search && response && Array.isArray(response.animes)) {
      const norm = (s: any) => (typeof s === 'string' ? s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim() : '')
      const qn = norm(search)

      const scored = response.animes.map((a: any) => {
        const titre = norm(a.titre)
        const titreOrig = norm(a.titreOrig)
        const nice = norm(a.niceUrl)
        let w = 0
        if (titre === qn) w += 100
        if (titre.startsWith(qn)) w += 50
        if (nice === qn) w += 40
        if (titre.includes(qn)) w += 10
        if (titreOrig && titreOrig === qn) w += 20
        if (titreOrig && titreOrig.startsWith(qn)) w += 10
        // small tie-breaker boosts
        const rating = Number(a.moyenneNotes || a.moyenne_notes || 0)
        const reviews = Number(a.nbReviews || a.nb_reviews || 0)
        const year = Number(a.annee || 0)
        return { a, w, rating, reviews, year }
      })

      scored.sort((x: any, y: any) =>
        y.w - x.w || y.rating - x.rating || y.reviews - x.reviews || y.year - x.year
      )

      response.animes = scored.map((s: any) => s.a)
    }
    
    console.log('Proxy successful, returning data')
    return response
  } catch (error: any) {
    console.error('Proxy failed:', error.message)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch animes'
    })
  }
})
