import { defineEventHandler, readBody, getCookie, getHeader, setResponseStatus } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const authToken = getCookie(event, "auth-token") || getHeader(event, "authorization");
  if (!authToken) {
    setResponseStatus(event, 401);
    return {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication required to create a review"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    if (!body.titre || !body.contenu || body.notation === void 0) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Title, content, and rating are required",
          details: {
            missingFields: [
              !body.titre && "titre",
              !body.contenu && "contenu",
              body.notation === void 0 && "notation"
            ].filter(Boolean)
          }
        },
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    if (body.notation < 0 || body.notation > 10) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Rating must be between 0 and 10"
        },
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    const backendData = {
      titre: body.titre,
      critique: body.contenu || body.content,
      // Handle both field names
      contenu: body.contenu || body.content,
      notation: body.notation || body.rating,
      idAnime: body.idAnime,
      idManga: body.idManga,
      tags: body.tags,
      estPublique: (_b = (_a = body.estPublique) != null ? _a : body.isPublic) != null ? _b : true,
      allowComments: (_c = body.allowComments) != null ? _c : true,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription
    };
    const backendUrl = `${config.public.apiBase}/critiques`;
    const response = await $fetch(backendUrl, {
      method: "POST",
      body: backendData,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`
      }
    });
    return {
      success: true,
      data: response,
      message: "Review created successfully",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Create Review API Error:", error);
    let statusCode = ((_d = error.response) == null ? void 0 : _d.status) || 500;
    let errorCode = ((_f = (_e = error.response) == null ? void 0 : _e.data) == null ? void 0 : _f.code) || "CREATE_ERROR";
    let errorMessage = ((_h = (_g = error.response) == null ? void 0 : _g.data) == null ? void 0 : _h.message) || error.message || "Failed to create review";
    if (statusCode === 400) {
      errorCode = "VALIDATION_ERROR";
    } else if (statusCode === 401) {
      errorCode = "UNAUTHORIZED";
      errorMessage = "Invalid or expired authentication token";
    } else if (statusCode === 403) {
      errorCode = "FORBIDDEN";
      errorMessage = "You do not have permission to create reviews";
    }
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
        details: (_i = error.response) == null ? void 0 : _i.data
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
