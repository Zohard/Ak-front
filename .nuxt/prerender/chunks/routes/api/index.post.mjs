import { defineEventHandler, getCookie, getHeader, setResponseStatus, readBody } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
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

const index_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const config = useRuntimeConfig();
  const authToken = getCookie(event, "auth-token") || getHeader(event, "authorization");
  if (!authToken) {
    setResponseStatus(event, 401);
    return {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication required to create a collection"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    const body = await readBody(event);
    const backendUrl = `${config.public.apiBase}/collections`;
    const response = await $fetch(backendUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`
      },
      body
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
      message: "Collection created successfully",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Create Collection API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "CREATE_ERROR";
    let errorMessage = ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to create collection";
    if (statusCode === 401) {
      errorCode = "UNAUTHORIZED";
      errorMessage = "Invalid or expired authentication token";
    } else if (statusCode === 400) {
      errorCode = "VALIDATION_ERROR";
      errorMessage = ((_g = (_f = error.response) == null ? void 0 : _f.data) == null ? void 0 : _g.message) || "Invalid collection data";
    }
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
        details: (_h = error.response) == null ? void 0 : _h.data
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
