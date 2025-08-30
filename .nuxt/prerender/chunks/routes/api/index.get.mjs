import { defineEventHandler, getQuery, getCookie, getHeader, setResponseStatus } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
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
  const authToken = getCookie(event, "auth-token") || getHeader(event, "authorization");
  try {
    const params = new URLSearchParams();
    if (query.page) params.append("page", query.page);
    if (query.limit) params.append("limit", query.limit);
    if (query.search) params.append("search", query.search);
    if (query.sortBy) params.append("sortBy", query.sortBy);
    if (query.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query.userId) params.append("userId", query.userId);
    if (query.isPublic !== void 0) params.append("isPublic", query.isPublic);
    const backendUrl = `${config.public.apiBase}/collections?${params.toString()}`;
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    };
    if (authToken) {
      headers["Authorization"] = authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`;
    }
    const response = await $fetch(backendUrl, {
      method: "GET",
      headers
    });
    const collections = (response.data || response.collections || response || []).map((collection) => ({
      ...collection,
      // Ensure consistent field naming
      createdAt: collection.createdAt || collection.dateCreation,
      updatedAt: collection.updatedAt || collection.dateModification,
      itemCount: collection.itemCount || collection.nbItems || 0
    }));
    return {
      success: true,
      data: collections,
      meta: {
        total: response.total || collections.length,
        page: parseInt(query.page) || 1,
        limit: parseInt(query.limit) || 20,
        hasMore: response.hasMore || false
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Collections API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "FETCH_ERROR";
    let errorMessage = ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to fetch collections";
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
        details: (_f = error.response) == null ? void 0 : _f.data
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
