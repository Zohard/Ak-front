import { defineEventHandler, getRouterParam, getQuery, setResponseStatus } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
import { u as useRuntimeConfig } from '../../../../nitro/nitro.mjs';
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

const _userId__get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const userId = getRouterParam(event, "userId");
  const query = getQuery(event);
  if (!userId) {
    setResponseStatus(event, 400);
    return {
      success: false,
      error: {
        code: "INVALID_USER_ID",
        message: "User ID is required"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    const params = new URLSearchParams();
    if (query.page) params.append("page", query.page);
    if (query.limit) params.append("limit", query.limit);
    if (query.sortBy) params.append("sortBy", query.sortBy);
    if (query.sortOrder) params.append("sortOrder", query.sortOrder);
    params.append("estPublique", "true");
    params.append("statut", "1");
    const backendUrl = `${config.public.apiBase}/critiques/user/${userId}?${params.toString()}`;
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
        total: response.total || reviews.length,
        page: parseInt(query.page) || 1,
        limit: parseInt(query.limit) || 20,
        hasMore: response.hasMore || false,
        userId: parseInt(userId)
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("User Reviews API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "FETCH_ERROR";
    let errorMessage = ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to fetch user reviews";
    if (statusCode === 404) {
      errorCode = "USER_NOT_FOUND";
      errorMessage = "User not found";
    }
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

export { _userId__get as default };
//# sourceMappingURL=_userId_.get.mjs.map
