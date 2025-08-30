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

const _id__delete = defineEventHandler(async (event) => {
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
  if (!authToken) {
    setResponseStatus(event, 401);
    return {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication required to delete a collection"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    const backendUrl = `${config.public.apiBase}/collections/${collectionId}`;
    await $fetch(backendUrl, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`
      }
    });
    return {
      success: true,
      message: "Collection deleted successfully",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Delete Collection API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "DELETE_ERROR";
    let errorMessage = ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to delete collection";
    if (statusCode === 401) {
      errorCode = "UNAUTHORIZED";
      errorMessage = "Invalid or expired authentication token";
    } else if (statusCode === 403) {
      errorCode = "FORBIDDEN";
      errorMessage = "You do not have permission to delete this collection";
    } else if (statusCode === 404) {
      errorCode = "NOT_FOUND";
      errorMessage = "Collection not found";
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

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
