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

const register_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const requiredFields = ["pseudo", "email", "password", "confirmPassword", "agreeToTerms"];
  const missingFields = requiredFields.filter((field) => !body[field]);
  if (missingFields.length > 0) {
    setResponseStatus(event, 400);
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "All fields are required",
        field: missingFields[0]
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
  if (body.password !== body.confirmPassword) {
    setResponseStatus(event, 400);
    return {
      success: false,
      error: {
        code: "PASSWORD_MISMATCH",
        message: "Passwords do not match",
        field: "confirmPassword"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  if (body.password.length < 8) {
    setResponseStatus(event, 400);
    return {
      success: false,
      error: {
        code: "WEAK_PASSWORD",
        message: "Password must be at least 8 characters long",
        field: "password"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  if (body.pseudo.length < 3 || body.pseudo.length > 20) {
    setResponseStatus(event, 400);
    return {
      success: false,
      error: {
        code: "INVALID_USERNAME",
        message: "Username must be between 3 and 20 characters",
        field: "pseudo"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  if (!body.agreeToTerms) {
    setResponseStatus(event, 400);
    return {
      success: false,
      error: {
        code: "TERMS_NOT_ACCEPTED",
        message: "You must agree to the terms and conditions",
        field: "agreeToTerms"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    const backendUrl = `${config.public.apiBase}/auth/register`;
    const response = await $fetch(backendUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: {
        pseudo: body.pseudo,
        email: body.email,
        password: body.password,
        agreeToTerms: body.agreeToTerms
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
          reviewsCount: 0,
          averageRating: 0,
          permissions: ((_h = response.user) == null ? void 0 : _h.permissions) || response.permissions || ["create_review"],
          preferences: {
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
      maxAge: 60 * 60 * 24,
      // 1 day for new registrations
      httpOnly: false
    });
    if (authResponse.data.refreshToken) {
      setCookie(event, "refresh-token", authResponse.data.refreshToken, {
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        // 30 days
        httpOnly: true
      });
    }
    return authResponse;
  } catch (error) {
    console.error("Register API Error:", error);
    let statusCode = ((_i = error.response) == null ? void 0 : _i.status) || 500;
    let errorCode = ((_k = (_j = error.response) == null ? void 0 : _j.data) == null ? void 0 : _k.code) || "REGISTER_ERROR";
    let errorMessage = ((_m = (_l = error.response) == null ? void 0 : _l.data) == null ? void 0 : _m.message) || error.message || "Registration failed";
    let errorField = (_o = (_n = error.response) == null ? void 0 : _n.data) == null ? void 0 : _o.field;
    if (statusCode === 409) {
      if (errorMessage.toLowerCase().includes("email")) {
        errorCode = "EMAIL_EXISTS";
        errorMessage = "An account with this email already exists";
        errorField = "email";
      } else if (errorMessage.toLowerCase().includes("username") || errorMessage.toLowerCase().includes("pseudo")) {
        errorCode = "USERNAME_EXISTS";
        errorMessage = "This username is already taken";
        errorField = "pseudo";
      }
    } else if (statusCode === 429) {
      errorCode = "TOO_MANY_ATTEMPTS";
      errorMessage = "Too many registration attempts. Please try again later.";
    }
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
        field: errorField,
        details: (_p = error.response) == null ? void 0 : _p.data
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
