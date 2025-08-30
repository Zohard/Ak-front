import { defineEventHandler, getQuery, setResponseStatus } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
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

const top_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const query = getQuery(event);
  try {
    const params = new URLSearchParams();
    if (query.limit) params.append("limit", query.limit);
    if (query.period) params.append("period", query.period);
    if (query.type) params.append("type", query.type);
    const backendUrl = `${config.public.apiBase}/critiques/top?${params.toString()}`;
    const response = await $fetch(backendUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
    const reviews = (response.data || response.critiques || response || []).map((review) => ({
      ...review,
      // Ensure consistent field naming
      contenu: review.contenu || review.critique,
      critique: review.critique || review.contenu,
      notation: review.notation || review.note,
      note: review.note || review.notation,
      dateCritique: review.dateCritique || review.dateCreation,
      dateCreation: review.dateCreation || review.dateCritique,
      nbVues: review.nbVues || review.nbClics || 0,
      nbClics: review.nbClics || review.nbVues || 0
    }));
    return {
      success: true,
      data: reviews,
      meta: {
        total: reviews.length,
        limit: parseInt(query.limit) || 10,
        period: query.period || "week"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Top Reviews API Error:", error);
    const statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    if (statusCode >= 500) {
      return {
        success: true,
        data: [],
        meta: {
          total: 0,
          limit: parseInt(query.limit) || 10,
          period: query.period || "week"
        },
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: {
        code: ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "FETCH_ERROR",
        message: ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to fetch top reviews",
        details: (_f = error.response) == null ? void 0 : _f.data
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
});

export { top_get as default };
//# sourceMappingURL=top.get.mjs.map
