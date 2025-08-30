import { defineEventHandler, readBody, getCookie, setResponseStatus, setCookie } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
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

const refresh_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const refreshToken = body.refreshToken || getCookie(event, "refresh-token");
  if (!refreshToken) {
    setResponseStatus(event, 401);
    return {
      success: false,
      error: {
        code: "NO_REFRESH_TOKEN",
        message: "Refresh token is required"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    const backendUrl = `${config.public.apiBase}/auth/refresh`;
    const response = await $fetch(backendUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: {
        refreshToken
      }
    });
    const authResponse = {
      success: true,
      data: {
        user: {
          id: ((_a = response.user) == null ? void 0 : _a.id) || response.id,
          pseudo: ((_b = response.user) == null ? void 0 : _b.pseudo) || response.pseudo || response.username,
          email: ((_c = response.user) == null ? void 0 : _c.email) || response.email,
          avatar: ((_d = response.user) == null ? void 0 : _d.avatar) || response.avatar,
          bio: ((_e = response.user) == null ? void 0 : _e.bio) || response.bio || "",
          isVerified: ((_f = response.user) == null ? void 0 : _f.isVerified) || response.verified || false,
          joinDate: ((_g = response.user) == null ? void 0 : _g.joinDate) || response.createdAt,
          reviewsCount: ((_h = response.user) == null ? void 0 : _h.reviewsCount) || ((_i = response.stats) == null ? void 0 : _i.reviewsCount) || 0,
          averageRating: ((_j = response.user) == null ? void 0 : _j.averageRating) || ((_k = response.stats) == null ? void 0 : _k.averageRating) || 0,
          permissions: ((_l = response.user) == null ? void 0 : _l.permissions) || response.permissions || [],
          preferences: ((_m = response.user) == null ? void 0 : _m.preferences) || response.preferences || {
            receiveNotifications: true,
            profilePublic: true,
            allowComments: true,
            theme: "auto"
          }
        },
        token: response.token || response.accessToken,
        refreshToken: response.refreshToken || refreshToken
        // Use new refresh token if provided, otherwise keep current
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    setCookie(event, "auth-token", authResponse.data.token, {
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      // 1 day
      httpOnly: false
    });
    if (response.refreshToken && response.refreshToken !== refreshToken) {
      setCookie(event, "refresh-token", response.refreshToken, {
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        // 30 days
        httpOnly: true
      });
    }
    return authResponse;
  } catch (error) {
    console.error("Token Refresh API Error:", error);
    let statusCode = ((_n = error.response) == null ? void 0 : _n.status) || 500;
    let errorCode = ((_p = (_o = error.response) == null ? void 0 : _o.data) == null ? void 0 : _p.code) || "REFRESH_ERROR";
    let errorMessage = ((_r = (_q = error.response) == null ? void 0 : _q.data) == null ? void 0 : _r.message) || error.message || "Failed to refresh token";
    if (statusCode === 401) {
      errorCode = "INVALID_REFRESH_TOKEN";
      errorMessage = "Invalid or expired refresh token";
      setCookie(event, "refresh-token", "", {
        secure: true,
        sameSite: "lax",
        maxAge: 0,
        httpOnly: true
      });
    }
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
        details: (_s = error.response) == null ? void 0 : _s.data
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
});

export { refresh_post as default };
//# sourceMappingURL=refresh.post.mjs.map
