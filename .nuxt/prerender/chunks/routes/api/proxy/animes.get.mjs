import { defineEventHandler, getQuery, createError } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
import { u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import 'file:///home/zohardus/www/frontendv2/node_modules/destr/dist/index.mjs';
import 'file:///home/zohardus/www/frontendv2/node_modules/hookable/dist/index.mjs';
import 'file:///home/zohardus/www/frontendv2/node_modules/ofetch/dist/node.mjs';
import 'file:///home/zohardus/www/frontendv2/node_modules/node-mock-http/dist/index.mjs';
import 'file:///home/zohardus/www/frontendv2/node_modules/ufo/dist/index.mjs';
import 'file:///home/zohardus/www/frontendv2/node_modules/unstorage/dist/index.mjs';
import 'file:///home/zohardus/www/frontendv2/node_modules/unstorage/drivers/fs.mjs';
import 'file:///home/zohardus/www/frontendv2/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///home/zohardus/www/frontendv2/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///home/zohardus/www/frontendv2/node_modules/ohash/dist/index.mjs';
import 'file:///home/zohardus/www/frontendv2/node_modules/klona/dist/index.mjs';
import 'file:///home/zohardus/www/frontendv2/node_modules/defu/dist/defu.mjs';
import 'file:///home/zohardus/www/frontendv2/node_modules/scule/dist/index.mjs';
import 'file:///home/zohardus/www/frontendv2/node_modules/unctx/dist/index.mjs';
import 'file:///home/zohardus/www/frontendv2/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///home/zohardus/www/frontendv2/node_modules/pathe/dist/index.mjs';

const animes_get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  try {
    console.log("Proxying animes request with query:", query);
    const response = await $fetch(`${config.public.apiBase}/api/animes`, {
      query
    });
    const search = query.search || query.q || "";
    if (search && response && Array.isArray(response.animes)) {
      const norm = (s) => typeof s === "string" ? s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim() : "";
      const qn = norm(search);
      const scored = response.animes.map((a) => {
        const titre = norm(a.titre);
        const titreOrig = norm(a.titreOrig);
        const nice = norm(a.niceUrl);
        let w = 0;
        if (titre === qn) w += 100;
        if (titre.startsWith(qn)) w += 50;
        if (nice === qn) w += 40;
        if (titre.includes(qn)) w += 10;
        if (titreOrig && titreOrig === qn) w += 20;
        if (titreOrig && titreOrig.startsWith(qn)) w += 10;
        const rating = Number(a.moyenneNotes || a.moyenne_notes || 0);
        const reviews = Number(a.nbReviews || a.nb_reviews || 0);
        const year = Number(a.annee || 0);
        return { a, w, rating, reviews, year };
      });
      scored.sort(
        (x, y) => y.w - x.w || y.rating - x.rating || y.reviews - x.reviews || y.year - x.year
      );
      response.animes = scored.map((s) => s.a);
    }
    console.log("Proxy successful, returning data");
    return response;
  } catch (error) {
    console.error("Proxy failed:", error.message);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch animes"
    });
  }
});

export { animes_get as default };
//# sourceMappingURL=animes.get.mjs.map
