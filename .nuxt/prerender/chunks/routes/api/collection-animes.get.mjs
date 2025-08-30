import { defineEventHandler, getQuery, createError, getHeaders } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
import { u as useRuntimeConfig } from '../../nitro/nitro.mjs';
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

const collectionAnimes_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { id_membre } = query;
    if (!id_membre) {
      throw createError({
        statusCode: 400,
        statusMessage: "id_membre is required"
      });
    }
    const config = useRuntimeConfig();
    const headers = getHeaders(event);
    const allAnimeItems = [];
    const collectionTypes = [1, 2, 3, 4];
    for (const type of collectionTypes) {
      try {
        const animesResponse = await $fetch(`${config.public.apiBase}/api/collections/user/${id_membre}/type/${type}/animes`, {
          method: "GET",
          params: {
            page: query.page || 1,
            limit: query.limit || 1e3
            // Get all items
          },
          headers: {
            "Authorization": headers.authorization,
            "Content-Type": "application/json"
          }
        });
        if (animesResponse.success && animesResponse.data && Array.isArray(animesResponse.data)) {
          const itemsWithStatus = animesResponse.data.map((item) => {
            var _a, _b, _c, _d, _e;
            return {
              id: item.id,
              collectionId: null,
              // Not relevant for the new structure
              collectionName: getCollectionNameFromType(type),
              collectionType: type,
              status: getStatusFromCollectionType(type),
              title: ((_a = item.anime) == null ? void 0 : _a.titre) || "Anime sans titre",
              imageUrl: ((_b = item.anime) == null ? void 0 : _b.image) ? `${config.public.apiBase}/uploads/animes/${item.anime.image}` : null,
              year: (_c = item.anime) == null ? void 0 : _c.annee,
              progress: ((_d = item.anime) == null ? void 0 : _d.nbEp) ? `${item.anime.nbEp} \xE9pisodes` : null,
              description: (_e = item.anime) == null ? void 0 : _e.synopsis,
              addedAt: item.addedAt,
              notes: item.notes,
              rating: item.rating,
              anime: item.anime
            };
          });
          allAnimeItems.push(...itemsWithStatus);
        }
      } catch (err) {
        console.warn(`Failed to fetch animes for collection type ${type}:`, err);
        continue;
      }
    }
    return {
      items: allAnimeItems,
      collections: []
      // Not needed with new structure
    };
  } catch (error) {
    console.error("Collection animes proxy error:", {
      message: error.message,
      statusCode: error.statusCode,
      statusMessage: error.statusMessage,
      data: error.data,
      stack: error.stack
    });
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || "Failed to fetch anime collections"
    });
  }
});
function getStatusFromCollectionType(type) {
  switch (type) {
    case 1:
      return "termine";
    // Completed
    case 2:
      return "planifie";
    // Plan to Watch
    case 3:
      return "en-cours";
    // Watching
    case 4:
      return "abandonne";
    // Dropped
    default:
      return "en-attente";
  }
}
function getCollectionNameFromType(type) {
  switch (type) {
    case 1:
      return "Termin\xE9";
    case 2:
      return "Planifi\xE9";
    case 3:
      return "En cours";
    case 4:
      return "Abandonn\xE9";
    default:
      return "Autre";
  }
}

export { collectionAnimes_get as default };
//# sourceMappingURL=collection-animes.get.mjs.map
