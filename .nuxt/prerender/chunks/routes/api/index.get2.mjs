import { defineEventHandler, getQuery, setResponseStatus } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
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

const index_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const query = getQuery(event);
  try {
    const params = new URLSearchParams();
    if (query.page) params.append("page", query.page);
    if (query.limit) params.append("limit", query.limit);
    if (query.search) params.append("search", query.search);
    if (query.type) params.append("type", query.type);
    if (query.sortBy) params.append("sortBy", query.sortBy);
    if (query.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query.rating) params.append("minNotation", query.rating);
    if (query.author) params.append("author", query.author);
    if (query.idAnime) params.append("idAnime", query.idAnime);
    if (query.idManga) params.append("idManga", query.idManga);
    if (query.statut) params.append("statut", query.statut);
    if (query.estPublique !== void 0) params.append("estPublique", query.estPublique);
    const backendUrl = `${config.public.apiBase}/critiques?${params.toString()}`;
    const response = await $fetch(backendUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
    return {
      success: true,
      data: response.data || response.critiques || response || [],
      meta: {
        total: response.total || 0,
        page: parseInt(query.page) || 1,
        limit: parseInt(query.limit) || 20,
        hasMore: response.hasMore || false
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Reviews API Error:", error);
    setResponseStatus(event, ((_a = error.response) == null ? void 0 : _a.status) || 500);
    return {
      success: false,
      error: {
        code: ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "FETCH_ERROR",
        message: ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to fetch reviews",
        details: (_f = error.response) == null ? void 0 : _f.data
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
