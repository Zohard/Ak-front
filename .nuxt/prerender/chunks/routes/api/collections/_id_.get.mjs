import { defineEventHandler, getRouterParam, setResponseStatus, getCookie, getHeader } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const collectionId = getRouterParam(event, "id");
  if (!collectionId) {
    setResponseStatus(event, 400);
    return {
      success: false,
      error: {
        code: "MISSING_ID",
        message: "Collection ID is required"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  const authToken = getCookie(event, "auth-token") || getHeader(event, "authorization");
  try {
    const backendUrl = `${config.public.apiBase}/collections/${collectionId}`;
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
    const collection = {
      ...response.data || response,
      createdAt: response.createdAt || response.dateCreation,
      updatedAt: response.updatedAt || response.dateModification,
      itemCount: response.itemCount || response.nbItems || 0
    };
    return {
      success: true,
      data: collection,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Collection Detail API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "FETCH_ERROR";
    let errorMessage = ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to fetch collection";
    if (statusCode === 404) {
      errorCode = "NOT_FOUND";
      errorMessage = "Collection not found";
    } else if (statusCode === 403) {
      errorCode = "FORBIDDEN";
      errorMessage = "Access denied to this collection";
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

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
