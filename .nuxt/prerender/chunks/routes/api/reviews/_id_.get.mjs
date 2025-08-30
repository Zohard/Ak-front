import { defineEventHandler, getRouterParam, setResponseStatus } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
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
  var _a, _b;
  const config = useRuntimeConfig();
  const id = getRouterParam(event, "id");
  if (!id) {
    setResponseStatus(event, 400);
    return {
      success: false,
      error: {
        code: "INVALID_ID",
        message: "Review ID is required"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    const isNumeric = /^\d+$/.test(id);
    const endpoint = isNumeric ? `${config.public.apiBase}/critiques/${id}` : `${config.public.apiBase}/critiques/slug/${id}`;
    const response = await $fetch(endpoint, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
    if (!response) {
      setResponseStatus(event, 404);
      return {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Review not found"
        },
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    const reviewData = {
      ...response,
      // Ensure consistent field naming
      contenu: response.contenu || response.critique,
      critique: response.critique || response.contenu,
      notation: response.notation || response.note,
      note: response.note || response.notation,
      dateCritique: response.dateCritique || response.dateCreation,
      dateCreation: response.dateCreation || response.dateCritique,
      nbVues: response.nbVues || response.nbClics || 0,
      nbClics: response.nbClics || response.nbVues || 0
    };
    try {
      $fetch(`${config.public.apiBase}/critiques/${response.idCritique || response.id}/view`, {
        method: "POST"
      }).catch(() => {
      });
    } catch {
    }
    return {
      success: true,
      data: reviewData,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Review Detail API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = "FETCH_ERROR";
    let errorMessage = "Failed to fetch review";
    if (statusCode === 404) {
      errorCode = "NOT_FOUND";
      errorMessage = "Review not found";
    } else if (statusCode === 403) {
      errorCode = "FORBIDDEN";
      errorMessage = "You do not have permission to view this review";
    }
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
        details: (_b = error.response) == null ? void 0 : _b.data
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
