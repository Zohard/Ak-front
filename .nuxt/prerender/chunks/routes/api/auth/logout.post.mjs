import { defineEventHandler, getHeader, getCookie, setResponseStatus, setCookie } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
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

const logout_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const authToken = getHeader(event, "authorization") || getCookie(event, "auth-token");
  if (!authToken) {
    setResponseStatus(event, 401);
    return {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "No authentication token provided"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    const backendUrl = `${config.public.apiBase}/auth/logout`;
    await $fetch(backendUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`
      }
    });
  } catch (error) {
    console.warn("Backend logout failed:", error);
  }
  setCookie(event, "auth-token", "", {
    secure: true,
    sameSite: "lax",
    maxAge: 0,
    // Expire immediately
    httpOnly: false
  });
  setCookie(event, "refresh-token", "", {
    secure: true,
    sameSite: "lax",
    maxAge: 0,
    // Expire immediately
    httpOnly: true
  });
  return {
    success: true,
    message: "Logged out successfully",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
