import { defineEventHandler, readBody, setResponseStatus, setCookie } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
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

const login_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
  const config = useRuntimeConfig();
  const body = await readBody(event);
  if (!body.email || !body.password) {
    setResponseStatus(event, 400);
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Email and password are required",
        field: !body.email ? "email" : "password"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    setResponseStatus(event, 400);
    return {
      success: false,
      error: {
        code: "INVALID_EMAIL",
        message: "Please enter a valid email address",
        field: "email"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    const backendUrl = `${config.public.apiBase}/auth/login`;
    const response = await $fetch(backendUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: {
        email: body.email,
        password: body.password,
        remember: body.remember || false
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
          bio: ((_e = response.user) == null ? void 0 : _e.bio) || response.bio,
          isVerified: ((_f = response.user) == null ? void 0 : _f.isVerified) || response.verified || false,
          joinDate: ((_g = response.user) == null ? void 0 : _g.joinDate) || response.createdAt,
          reviewsCount: ((_h = response.user) == null ? void 0 : _h.reviewsCount) || 0,
          averageRating: ((_i = response.user) == null ? void 0 : _i.averageRating) || 0,
          permissions: ((_j = response.user) == null ? void 0 : _j.permissions) || response.permissions || [],
          preferences: ((_k = response.user) == null ? void 0 : _k.preferences) || {
            receiveNotifications: true,
            profilePublic: true,
            allowComments: true,
            theme: "auto"
          }
        },
        token: response.token || response.accessToken,
        refreshToken: response.refreshToken
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    setCookie(event, "auth-token", authResponse.data.token, {
      secure: true,
      sameSite: "lax",
      maxAge: body.remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
      // 30 days or 1 day
      httpOnly: false
      // Allow client access for API calls
    });
    if (authResponse.data.refreshToken) {
      setCookie(event, "refresh-token", authResponse.data.refreshToken, {
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        // 30 days
        httpOnly: true
        // Keep refresh token httpOnly for security
      });
    }
    return authResponse;
  } catch (error) {
    console.error("Login API Error:", error);
    let statusCode = ((_l = error.response) == null ? void 0 : _l.status) || 500;
    let errorCode = ((_n = (_m = error.response) == null ? void 0 : _m.data) == null ? void 0 : _n.code) || "LOGIN_ERROR";
    let errorMessage = ((_p = (_o = error.response) == null ? void 0 : _o.data) == null ? void 0 : _p.message) || error.message || "Login failed";
    let errorField = (_r = (_q = error.response) == null ? void 0 : _q.data) == null ? void 0 : _r.field;
    if (statusCode === 401) {
      errorCode = "INVALID_CREDENTIALS";
      errorMessage = "Invalid email or password";
    } else if (statusCode === 429) {
      errorCode = "TOO_MANY_ATTEMPTS";
      errorMessage = "Too many login attempts. Please try again later.";
    } else if (statusCode === 403) {
      errorCode = "ACCOUNT_SUSPENDED";
      errorMessage = "Your account has been suspended. Please contact support.";
    }
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
        field: errorField,
        details: (_s = error.response) == null ? void 0 : _s.data
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
