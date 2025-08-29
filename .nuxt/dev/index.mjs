import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, createError, getQuery as getQuery$1, readBody, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, getRouterParam, setCookie, getHeader, getCookie, getHeaders, setHeader, getResponseStatusText } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { escapeHtml } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/@vue/shared/dist/shared.cjs.js';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, joinRelativeURL } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/vue/server-renderer/index.mjs';
import destr, { destr as destr$1 } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/destr/dist/index.mjs';
import { createHooks } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/nitropack/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { stringify, uneval } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/devalue/index.js';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/errx/dist/index.js';
import { isVNode, toValue, isRef } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/vue/index.mjs';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/pathe/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/unhead/dist/server.mjs';
import { DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/unhead/dist/plugins.mjs';
import { walkResolver } from 'file:///home/zohardus/www/ak9project/frontendv2/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"/home/zohardus/www/ak9project/frontendv2/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/home/zohardus/www/ak9project/frontendv2","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/home/zohardus/www/ak9project/frontendv2/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/home/zohardus/www/ak9project/frontendv2/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/home/zohardus/www/ak9project/frontendv2/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/home/zohardus/www/ak9project/frontendv2/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "apiBase": "http://localhost:3003",
    "forumUrl": "http://localhost:8083",
    "siteUrl": "",
    "enablePlayground": true
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (event.handled || isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
    defaultRes.body.stack = defaultRes.body.stack.join("\n");
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    if (header === "set-cookie") {
      appendResponseHeader(event, header, value);
      continue;
    }
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script$1 = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _BLmhqYQTMZyjvZkY9ad9TcaeplPYFzvoAVC1esemM = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script$1}<\/script>`);
  });
});

const rootDir = "/home/zohardus/www/ak9project/frontendv2";

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"description","content":"Découvrez et partagez vos animes et mangas préférés"}],"link":[{"rel":"icon","type":"image/x-icon","href":"/favicon.ico"}],"style":[],"script":[],"noscript":[],"title":"Anime-Kun V2"};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _FICHtICc13wEQw7mnNJEsiJxHeBZ0uqZiVdXRf31BnU = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola$1.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola$1.wrapConsole();
}

const script = "\"use strict\";(()=>{const t=window,e=document.documentElement,c=[\"dark\",\"light\"],n=getStorageValue(\"localStorage\",\"nuxt-color-mode\")||\"system\";let i=n===\"system\"?u():n;const r=e.getAttribute(\"data-color-mode-forced\");r&&(i=r),l(i),t[\"__NUXT_COLOR_MODE__\"]={preference:n,value:i,getColorScheme:u,addColorScheme:l,removeColorScheme:d};function l(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.add(s):e.className+=\" \"+s,a&&e.setAttribute(\"data-\"+a,o)}function d(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.remove(s):e.className=e.className.replace(new RegExp(s,\"g\"),\"\"),a&&e.removeAttribute(\"data-\"+a)}function f(o){return t.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function u(){if(t.matchMedia&&f(\"\").media!==\"not all\"){for(const o of c)if(f(\":\"+o).matches)return o}return\"light\"}})();function getStorageValue(t,e){switch(t){case\"localStorage\":return window.localStorage.getItem(e);case\"sessionStorage\":return window.sessionStorage.getItem(e);case\"cookie\":return getCookie(e);default:return null}}function getCookie(t){const c=(\"; \"+window.document.cookie).split(\"; \"+t+\"=\");if(c.length===2)return c.pop()?.split(\";\").shift()}";

const _sACKhBkF6AK8qp58hD3a2zk3cXkG7YtIo75m05520k = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _BLmhqYQTMZyjvZkY9ad9TcaeplPYFzvoAVC1esemM,
_FICHtICc13wEQw7mnNJEsiJxHeBZ0uqZiVdXRf31BnU,
_sACKhBkF6AK8qp58hD3a2zk3cXkG7YtIo75m05520k
];

const assets = {
  "/index.mjs": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2f4f0-jJ4RX8Wu9Spbgu9WMh7wHYsUjns\"",
    "mtime": "2025-08-28T17:07:45.609Z",
    "size": 193776,
    "path": "index.mjs"
  },
  "/index.mjs.map": {
    "type": "application/json",
    "etag": "\"a9fe9-F5sk39CNpI+/FsQ0hQgCHyvMIcY\"",
    "mtime": "2025-08-28T17:07:45.613Z",
    "size": 696297,
    "path": "index.mjs.map"
  }
};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _voBdP9 = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
  disableCapoSorting: false,
  plugins: [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin],
};

function createSSRContext(event) {
  const ssrContext = {
    url: event.path,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: true,
    head: createHead(unheadOptions),
    error: false,
    nuxt: void 0,
    /* NuxtApp */
    payload: {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set()
  };
  return ssrContext;
}
function setSSRError(ssrContext, error) {
  ssrContext.error = true;
  ssrContext.payload = { error };
  ssrContext.url = error.url;
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => Promise.resolve().then(function () { return server$1; }).then((r) => r.default || r);
const getClientManifest = () => import('file:///home/zohardus/www/ak9project/frontendv2/.nuxt//dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
    }
  });
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules ||= /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function getRenderer(ssrContext) {
  return getSPARenderer() ;
}
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
function getServerComponentHTML(body) {
  const match = body.match(ROOT_NODE_REGEX);
  return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, id, slot] = match;
      if (!slot || clientUid !== id) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const ISLAND_SUFFIX_RE = /\.json(\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
  const nitroApp = useNitroApp();
  setResponseHeaders(event, {
    "content-type": "application/json;charset=utf-8",
    "x-powered-by": "Nuxt"
  });
  const islandContext = await getIslandContext(event);
  const ssrContext = {
    ...createSSRContext(event),
    islandContext,
    noSSR: false,
    url: islandContext.url
  };
  const renderer = await getSSRRenderer();
  const renderResult = await renderer.renderToString(ssrContext).catch(async (error) => {
    await ssrContext.nuxt?.hooks.callHook("app:error", error);
    throw error;
  });
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult });
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  {
    const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      ssrContext.head.push({ link }, { mode: "server" });
    }
  }
  const islandHead = {};
  for (const entry of ssrContext.head.entries.values()) {
    for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
      const currentValue = islandHead[key];
      if (Array.isArray(currentValue)) {
        currentValue.push(...value);
      }
      islandHead[key] = value;
    }
  }
  islandHead.link ||= [];
  islandHead.style ||= [];
  const islandResponse = {
    id: islandContext.id,
    head: islandHead,
    html: getServerComponentHTML(renderResult.html),
    components: getClientIslandResponse(ssrContext),
    slots: getSlotIslandResponse(ssrContext)
  };
  await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
  return islandResponse;
});
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr$1(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}

const _lazy_GkVjRc = () => Promise.resolve().then(function () { return login_post$1; });
const _lazy_qRfBst = () => Promise.resolve().then(function () { return logout_post$1; });
const _lazy_cqFUOV = () => Promise.resolve().then(function () { return profile_get$1; });
const _lazy_tsE2b8 = () => Promise.resolve().then(function () { return profile_put$1; });
const _lazy_zL4xIi = () => Promise.resolve().then(function () { return refresh_post$1; });
const _lazy_JloaGf = () => Promise.resolve().then(function () { return register_post$1; });
const _lazy_fVD8nG = () => Promise.resolve().then(function () { return collectionAnimes_get$1; });
const _lazy_h4BSzg = () => Promise.resolve().then(function () { return collectionMangas_get$1; });
const _lazy_Rz0xAz = () => Promise.resolve().then(function () { return _id__delete$3; });
const _lazy_baAQmU = () => Promise.resolve().then(function () { return _id__get$5; });
const _lazy_x323th = () => Promise.resolve().then(function () { return _id__patch$1; });
const _lazy_qGKcaA = () => Promise.resolve().then(function () { return animes_get$5; });
const _lazy_vTRxHL = () => Promise.resolve().then(function () { return animes_post$1; });
const _lazy_XZYq6F = () => Promise.resolve().then(function () { return _animeId__delete$1; });
const _lazy_f2N73r = () => Promise.resolve().then(function () { return mangas_get$3; });
const _lazy_3WrlW9 = () => Promise.resolve().then(function () { return mangas_post$1; });
const _lazy_RFujop = () => Promise.resolve().then(function () { return _mangaId__delete$1; });
const _lazy_XqdLYq = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_4aeQo0 = () => Promise.resolve().then(function () { return index_post$3; });
const _lazy_dNwJbU = () => Promise.resolve().then(function () { return my_get$3; });
const _lazy_sXMzTM = () => Promise.resolve().then(function () { return animes_get$3; });
const _lazy_IEuUQG = () => Promise.resolve().then(function () { return articles_get$1; });
const _lazy_fj7wqc = () => Promise.resolve().then(function () { return featured_get$1; });
const _lazy_hNMzJ3 = () => Promise.resolve().then(function () { return _slug__get$1; });
const _lazy_gzlsSt = () => Promise.resolve().then(function () { return categories_get$1; });
const _lazy_GExDv6 = () => Promise.resolve().then(function () { return mangas_get$1; });
const _lazy_seaUDL = () => Promise.resolve().then(function () { return reviews_get$1; });
const _lazy_VguI_S = () => Promise.resolve().then(function () { return _id__delete$1; });
const _lazy_ppiZ_f = () => Promise.resolve().then(function () { return _id__get$3; });
const _lazy_Er9820 = () => Promise.resolve().then(function () { return _id__put$1; });
const _lazy_MHOdTY = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_WW2oZ_ = () => Promise.resolve().then(function () { return index_post$1; });
const _lazy_FHSNlc = () => Promise.resolve().then(function () { return my_get$1; });
const _lazy_w9vxVl = () => Promise.resolve().then(function () { return stats_get$1; });
const _lazy_N7UEc_ = () => Promise.resolve().then(function () { return top_get$1; });
const _lazy_12WkpI = () => Promise.resolve().then(function () { return _userId__get$1; });
const _lazy_xyqpYP = () => Promise.resolve().then(function () { return _id__get$1; });
const _lazy_63UapP = () => Promise.resolve().then(function () { return animes_get$1; });
const _lazy_TpqgiK = () => Promise.resolve().then(function () { return current_get$1; });
const _lazy_WbRI2v = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_8x2vz1 = () => Promise.resolve().then(function () { return ____path__get$1; });
const _lazy_F1mQO2 = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _voBdP9, lazy: false, middleware: true, method: undefined },
  { route: '/api/auth/login', handler: _lazy_GkVjRc, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/logout', handler: _lazy_qRfBst, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/profile', handler: _lazy_cqFUOV, lazy: true, middleware: false, method: "get" },
  { route: '/api/auth/profile', handler: _lazy_tsE2b8, lazy: true, middleware: false, method: "put" },
  { route: '/api/auth/refresh', handler: _lazy_zL4xIi, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/register', handler: _lazy_JloaGf, lazy: true, middleware: false, method: "post" },
  { route: '/api/collection-animes', handler: _lazy_fVD8nG, lazy: true, middleware: false, method: "get" },
  { route: '/api/collection-mangas', handler: _lazy_h4BSzg, lazy: true, middleware: false, method: "get" },
  { route: '/api/collections/:id', handler: _lazy_Rz0xAz, lazy: true, middleware: false, method: "delete" },
  { route: '/api/collections/:id', handler: _lazy_baAQmU, lazy: true, middleware: false, method: "get" },
  { route: '/api/collections/:id', handler: _lazy_x323th, lazy: true, middleware: false, method: "patch" },
  { route: '/api/collections/:id/animes', handler: _lazy_qGKcaA, lazy: true, middleware: false, method: "get" },
  { route: '/api/collections/:id/animes', handler: _lazy_vTRxHL, lazy: true, middleware: false, method: "post" },
  { route: '/api/collections/:id/animes/:animeId', handler: _lazy_XZYq6F, lazy: true, middleware: false, method: "delete" },
  { route: '/api/collections/:id/mangas', handler: _lazy_f2N73r, lazy: true, middleware: false, method: "get" },
  { route: '/api/collections/:id/mangas', handler: _lazy_3WrlW9, lazy: true, middleware: false, method: "post" },
  { route: '/api/collections/:id/mangas/:mangaId', handler: _lazy_RFujop, lazy: true, middleware: false, method: "delete" },
  { route: '/api/collections', handler: _lazy_XqdLYq, lazy: true, middleware: false, method: "get" },
  { route: '/api/collections', handler: _lazy_4aeQo0, lazy: true, middleware: false, method: "post" },
  { route: '/api/collections/my', handler: _lazy_dNwJbU, lazy: true, middleware: false, method: "get" },
  { route: '/api/proxy/animes', handler: _lazy_sXMzTM, lazy: true, middleware: false, method: "get" },
  { route: '/api/proxy/articles', handler: _lazy_IEuUQG, lazy: true, middleware: false, method: "get" },
  { route: '/api/proxy/articles/featured', handler: _lazy_fj7wqc, lazy: true, middleware: false, method: "get" },
  { route: '/api/proxy/articles/slug/:slug', handler: _lazy_hNMzJ3, lazy: true, middleware: false, method: "get" },
  { route: '/api/proxy/categories', handler: _lazy_gzlsSt, lazy: true, middleware: false, method: "get" },
  { route: '/api/proxy/mangas', handler: _lazy_GExDv6, lazy: true, middleware: false, method: "get" },
  { route: '/api/proxy/reviews', handler: _lazy_seaUDL, lazy: true, middleware: false, method: "get" },
  { route: '/api/reviews/:id', handler: _lazy_VguI_S, lazy: true, middleware: false, method: "delete" },
  { route: '/api/reviews/:id', handler: _lazy_ppiZ_f, lazy: true, middleware: false, method: "get" },
  { route: '/api/reviews/:id', handler: _lazy_Er9820, lazy: true, middleware: false, method: "put" },
  { route: '/api/reviews', handler: _lazy_MHOdTY, lazy: true, middleware: false, method: "get" },
  { route: '/api/reviews', handler: _lazy_WW2oZ_, lazy: true, middleware: false, method: "post" },
  { route: '/api/reviews/my', handler: _lazy_FHSNlc, lazy: true, middleware: false, method: "get" },
  { route: '/api/reviews/stats', handler: _lazy_w9vxVl, lazy: true, middleware: false, method: "get" },
  { route: '/api/reviews/top', handler: _lazy_N7UEc_, lazy: true, middleware: false, method: "get" },
  { route: '/api/reviews/user/:userId', handler: _lazy_12WkpI, lazy: true, middleware: false, method: "get" },
  { route: '/api/seasons/:id', handler: _lazy_xyqpYP, lazy: true, middleware: false, method: "get" },
  { route: '/api/seasons/:id/animes', handler: _lazy_63UapP, lazy: true, middleware: false, method: "get" },
  { route: '/api/seasons/current', handler: _lazy_TpqgiK, lazy: true, middleware: false, method: "get" },
  { route: '/api/seasons', handler: _lazy_WbRI2v, lazy: true, middleware: false, method: "get" },
  { route: '/api/webzine/img/**:path', handler: _lazy_8x2vz1, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_F1mQO2, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_F1mQO2, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(nodeHandler, aRequest);
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server$2 = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server$2.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server$2.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server$2.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = { "appName": "Nuxt", "version": "", "statusCode": 500, "statusMessage": "Server error", "description": "An error occurred in the application and the page could not be served. If you are the application owner, check your server logs for details.", "stack": "" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml(messages.statusCode) + " - " + escapeHtml(messages.statusMessage || "Internal Server Error") + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);bottom:-40vh;filter:blur(30vh);height:60vh;opacity:.8}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.pointer-events-none{pointer-events:none}.fixed{position:fixed}.left-0{left:0}.right-0{right:0}.z-10{z-index:10}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-black\\/5{background-color:#0000000d}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-14{padding-top:3.5rem}.text-6xl{font-size:3.75rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:bg-white\\/10{background-color:#ffffff1a}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script></head><body class="antialiased bg-white dark:bg-black dark:text-white flex flex-col font-sans min-h-screen pt-14 px-10 text-black"><div class="fixed left-0 pointer-events-none right-0 spotlight"></div><h1 class="font-medium mb-6 sm:text-8xl text-6xl">` + escapeHtml(messages.statusCode) + '</h1><p class="font-light leading-tight mb-8 sm:text-2xl text-xl">' + escapeHtml(messages.description) + '</p><div class="bg-black/5 bg-white dark:bg-white/10 flex-1 h-auto overflow-y-auto rounded-t-md"><div class="font-light leading-tight p-8 text-xl z-10">' + escapeHtml(messages.stack) + "</div></div></body></html>";
};

const errorDev = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const server = () => {};

const server$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: server
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

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

const login_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: login_post
}, Symbol.toStringTag, { value: 'Module' }));

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

const logout_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: logout_post
}, Symbol.toStringTag, { value: 'Module' }));

const profile_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
  const config = useRuntimeConfig();
  const authToken = getHeader(event, "authorization") || getCookie(event, "auth-token");
  if (!authToken) {
    setResponseStatus(event, 401);
    return {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication required"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    const backendUrl = `${config.public.apiBase}/auth/profile`;
    const response = await $fetch(backendUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`
      }
    });
    const userProfile = {
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
    };
    return {
      success: true,
      data: userProfile,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Profile API Error:", error);
    let statusCode = ((_n = error.response) == null ? void 0 : _n.status) || 500;
    let errorCode = ((_p = (_o = error.response) == null ? void 0 : _o.data) == null ? void 0 : _p.code) || "PROFILE_ERROR";
    let errorMessage = ((_r = (_q = error.response) == null ? void 0 : _q.data) == null ? void 0 : _r.message) || error.message || "Failed to fetch profile";
    if (statusCode === 401) {
      errorCode = "TOKEN_INVALID";
      errorMessage = "Invalid or expired authentication token";
    } else if (statusCode === 404) {
      errorCode = "USER_NOT_FOUND";
      errorMessage = "User account not found";
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

const profile_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: profile_get
}, Symbol.toStringTag, { value: 'Module' }));

const profile_put = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const authToken = getHeader(event, "authorization") || getCookie(event, "auth-token");
  if (!authToken) {
    setResponseStatus(event, 401);
    return {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication required"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  const allowedFields = ["pseudo", "bio", "avatar", "preferences"];
  const updateData = {};
  for (const field of allowedFields) {
    if (body[field] !== void 0) {
      updateData[field] = body[field];
    }
  }
  if (updateData.pseudo) {
    if (updateData.pseudo.length < 3 || updateData.pseudo.length > 20) {
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
  }
  if (updateData.bio && updateData.bio.length > 500) {
    setResponseStatus(event, 400);
    return {
      success: false,
      error: {
        code: "BIO_TOO_LONG",
        message: "Bio must be 500 characters or less",
        field: "bio"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    const backendUrl = `${config.public.apiBase}/auth/profile`;
    const response = await $fetch(backendUrl, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`
      },
      body: updateData
    });
    const updatedProfile = {
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
    };
    return {
      success: true,
      data: updatedProfile,
      message: "Profile updated successfully",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Profile Update API Error:", error);
    let statusCode = ((_n = error.response) == null ? void 0 : _n.status) || 500;
    let errorCode = ((_p = (_o = error.response) == null ? void 0 : _o.data) == null ? void 0 : _p.code) || "UPDATE_ERROR";
    let errorMessage = ((_r = (_q = error.response) == null ? void 0 : _q.data) == null ? void 0 : _r.message) || error.message || "Failed to update profile";
    let errorField = (_t = (_s = error.response) == null ? void 0 : _s.data) == null ? void 0 : _t.field;
    if (statusCode === 401) {
      errorCode = "TOKEN_INVALID";
      errorMessage = "Invalid or expired authentication token";
    } else if (statusCode === 409) {
      if (errorMessage.toLowerCase().includes("username") || errorMessage.toLowerCase().includes("pseudo")) {
        errorCode = "USERNAME_EXISTS";
        errorMessage = "This username is already taken";
        errorField = "pseudo";
      }
    }
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
        field: errorField,
        details: (_u = error.response) == null ? void 0 : _u.data
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
});

const profile_put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: profile_put
}, Symbol.toStringTag, { value: 'Module' }));

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

const refresh_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: refresh_post
}, Symbol.toStringTag, { value: 'Module' }));

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

const register_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: register_post
}, Symbol.toStringTag, { value: 'Module' }));

const collectionAnimes_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const { id_membre } = query;
    if (!id_membre) {
      throw createError({
        statusCode: 400,
        statusMessage: "id_membre is required"
      });
    }
    const config = useRuntimeConfig();
    const headers = getHeaders(event);
    const allAnimeItems = [];
    const collectionTypes = [1, 2, 3, 4];
    for (const type of collectionTypes) {
      try {
        const animesResponse = await $fetch(`${config.public.apiBase}/api/collections/user/${id_membre}/type/${type}/animes`, {
          method: "GET",
          params: {
            page: query.page || 1,
            limit: query.limit || 1e3
            // Get all items
          },
          headers: {
            "Authorization": headers.authorization,
            "Content-Type": "application/json"
          }
        });
        if (animesResponse.success && animesResponse.data && Array.isArray(animesResponse.data)) {
          const itemsWithStatus = animesResponse.data.map((item) => {
            var _a, _b, _c, _d, _e;
            return {
              id: item.id,
              collectionId: null,
              // Not relevant for the new structure
              collectionName: getCollectionNameFromType$1(type),
              collectionType: type,
              status: getStatusFromCollectionType$1(type),
              title: ((_a = item.anime) == null ? void 0 : _a.titre) || "Anime sans titre",
              imageUrl: ((_b = item.anime) == null ? void 0 : _b.image) ? `${config.public.apiBase}/uploads/animes/${item.anime.image}` : null,
              year: (_c = item.anime) == null ? void 0 : _c.annee,
              progress: ((_d = item.anime) == null ? void 0 : _d.nbEp) ? `${item.anime.nbEp} \xE9pisodes` : null,
              description: (_e = item.anime) == null ? void 0 : _e.synopsis,
              addedAt: item.addedAt,
              notes: item.notes,
              rating: item.rating,
              anime: item.anime
            };
          });
          allAnimeItems.push(...itemsWithStatus);
        }
      } catch (err) {
        console.warn(`Failed to fetch animes for collection type ${type}:`, err);
        continue;
      }
    }
    return {
      items: allAnimeItems,
      collections: []
      // Not needed with new structure
    };
  } catch (error) {
    console.error("Collection animes proxy error:", {
      message: error.message,
      statusCode: error.statusCode,
      statusMessage: error.statusMessage,
      data: error.data,
      stack: error.stack
    });
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || "Failed to fetch anime collections"
    });
  }
});
function getStatusFromCollectionType$1(type) {
  switch (type) {
    case 1:
      return "termine";
    // Completed
    case 2:
      return "planifie";
    // Plan to Watch
    case 3:
      return "en-cours";
    // Watching
    case 4:
      return "abandonne";
    // Dropped
    default:
      return "en-attente";
  }
}
function getCollectionNameFromType$1(type) {
  switch (type) {
    case 1:
      return "Termin\xE9";
    case 2:
      return "Planifi\xE9";
    case 3:
      return "En cours";
    case 4:
      return "Abandonn\xE9";
    default:
      return "Autre";
  }
}

const collectionAnimes_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: collectionAnimes_get
}, Symbol.toStringTag, { value: 'Module' }));

const collectionMangas_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const { id_membre } = query;
    if (!id_membre) {
      throw createError({
        statusCode: 400,
        statusMessage: "id_membre is required"
      });
    }
    const config = useRuntimeConfig();
    const headers = getHeaders(event);
    const allMangaItems = [];
    const collectionTypes = [1, 2, 3, 4];
    for (const type of collectionTypes) {
      try {
        const mangasResponse = await $fetch(`${config.public.apiBase}/api/collections/user/${id_membre}/type/${type}/mangas`, {
          method: "GET",
          params: {
            page: query.page || 1,
            limit: query.limit || 1e3
            // Get all items
          },
          headers: {
            "Authorization": headers.authorization,
            "Content-Type": "application/json"
          }
        });
        if (mangasResponse.success && mangasResponse.data && Array.isArray(mangasResponse.data)) {
          const itemsWithStatus = mangasResponse.data.map((item) => {
            var _a, _b, _c, _d, _e;
            return {
              id: item.id,
              collectionId: null,
              // Not relevant for the new structure
              collectionName: getCollectionNameFromType(type),
              collectionType: type,
              status: getStatusFromCollectionType(type),
              title: ((_a = item.manga) == null ? void 0 : _a.titre) || "Manga sans titre",
              imageUrl: ((_b = item.manga) == null ? void 0 : _b.image) ? `${config.public.apiBase}/uploads/mangas/${item.manga.image}` : null,
              year: (_c = item.manga) == null ? void 0 : _c.annee,
              progress: ((_d = item.manga) == null ? void 0 : _d.auteur) ? `Par ${item.manga.auteur}` : null,
              description: (_e = item.manga) == null ? void 0 : _e.synopsis,
              addedAt: item.addedAt,
              notes: item.notes,
              rating: item.rating,
              manga: item.manga
            };
          });
          allMangaItems.push(...itemsWithStatus);
        }
      } catch (err) {
        console.warn(`Failed to fetch mangas for collection type ${type}:`, err);
        continue;
      }
    }
    return {
      items: allMangaItems,
      collections: []
      // Not needed with new structure
    };
  } catch (error) {
    console.error("Collection mangas proxy error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Failed to fetch manga collections"
    });
  }
});
function getStatusFromCollectionType(type) {
  switch (type) {
    case 1:
      return "termine";
    // Completed
    case 2:
      return "planifie";
    // Plan to Read
    case 3:
      return "en-cours";
    // Reading
    case 4:
      return "abandonne";
    // Dropped
    default:
      return "en-attente";
  }
}
function getCollectionNameFromType(type) {
  switch (type) {
    case 1:
      return "Termin\xE9";
    case 2:
      return "Planifi\xE9";
    case 3:
      return "En cours";
    case 4:
      return "Abandonn\xE9";
    default:
      return "Autre";
  }
}

const collectionMangas_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: collectionMangas_get
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$2 = defineEventHandler(async (event) => {
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

const _id__delete$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$2
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get$4 = defineEventHandler(async (event) => {
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

const _id__get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$4
}, Symbol.toStringTag, { value: 'Module' }));

const _id__patch = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
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
        message: "Authentication required to update a collection"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    const body = await readBody(event);
    const backendUrl = `${config.public.apiBase}/collections/${collectionId}`;
    const response = await $fetch(backendUrl, {
      method: "PATCH",
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
      message: "Collection updated successfully",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Update Collection API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "UPDATE_ERROR";
    let errorMessage = ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to update collection";
    if (statusCode === 401) {
      errorCode = "UNAUTHORIZED";
      errorMessage = "Invalid or expired authentication token";
    } else if (statusCode === 403) {
      errorCode = "FORBIDDEN";
      errorMessage = "You do not have permission to update this collection";
    } else if (statusCode === 404) {
      errorCode = "NOT_FOUND";
      errorMessage = "Collection not found";
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

const _id__patch$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__patch
}, Symbol.toStringTag, { value: 'Module' }));

const animes_get$4 = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const collectionId = getRouterParam(event, "id");
  const query = getQuery$1(event);
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
    const params = new URLSearchParams();
    if (query.page) params.append("page", query.page);
    if (query.limit) params.append("limit", query.limit);
    const backendUrl = `${config.public.apiBase}/collections/${collectionId}/animes?${params.toString()}`;
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
    const animes = (response.data || response.animes || response || []).map((item) => ({
      ...item,
      addedAt: item.addedAt || item.dateAjout
    }));
    return {
      success: true,
      data: animes,
      meta: {
        total: response.total || animes.length,
        page: parseInt(query.page) || 1,
        limit: parseInt(query.limit) || 20,
        hasMore: response.hasMore || false
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Collection Animes API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "FETCH_ERROR";
    let errorMessage = ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to fetch collection animes";
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

const animes_get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: animes_get$4
}, Symbol.toStringTag, { value: 'Module' }));

const animes_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
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
        message: "Authentication required to add anime to collection"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    const body = await readBody(event);
    const backendUrl = `${config.public.apiBase}/collections/${collectionId}/animes`;
    const response = await $fetch(backendUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`
      },
      body
    });
    const collectionAnime = {
      ...response.data || response,
      addedAt: response.addedAt || response.dateAjout
    };
    return {
      success: true,
      data: collectionAnime,
      message: "Anime added to collection successfully",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Add Anime to Collection API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "ADD_ERROR";
    let errorMessage = ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to add anime to collection";
    if (statusCode === 401) {
      errorCode = "UNAUTHORIZED";
      errorMessage = "Invalid or expired authentication token";
    } else if (statusCode === 403) {
      errorCode = "FORBIDDEN";
      errorMessage = "You do not have permission to modify this collection";
    } else if (statusCode === 404) {
      errorCode = "NOT_FOUND";
      errorMessage = "Collection or anime not found";
    } else if (statusCode === 409) {
      errorCode = "ALREADY_EXISTS";
      errorMessage = "Anime is already in this collection";
    } else if (statusCode === 400) {
      errorCode = "VALIDATION_ERROR";
      errorMessage = ((_g = (_f = error.response) == null ? void 0 : _f.data) == null ? void 0 : _g.message) || "Invalid data";
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

const animes_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: animes_post
}, Symbol.toStringTag, { value: 'Module' }));

const _animeId__delete = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const collectionId = getRouterParam(event, "id");
  const animeId = getRouterParam(event, "animeId");
  if (!collectionId || !animeId) {
    setResponseStatus(event, 400);
    return {
      success: false,
      error: {
        code: "MISSING_PARAMS",
        message: "Collection ID and Anime ID are required"
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
        message: "Authentication required to remove anime from collection"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    const backendUrl = `${config.public.apiBase}/collections/${collectionId}/animes/${animeId}`;
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
      message: "Anime removed from collection successfully",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Remove Anime from Collection API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "REMOVE_ERROR";
    let errorMessage = ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to remove anime from collection";
    if (statusCode === 401) {
      errorCode = "UNAUTHORIZED";
      errorMessage = "Invalid or expired authentication token";
    } else if (statusCode === 403) {
      errorCode = "FORBIDDEN";
      errorMessage = "You do not have permission to modify this collection";
    } else if (statusCode === 404) {
      errorCode = "NOT_FOUND";
      errorMessage = "Collection, anime, or collection item not found";
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

const _animeId__delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _animeId__delete
}, Symbol.toStringTag, { value: 'Module' }));

const mangas_get$2 = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const collectionId = getRouterParam(event, "id");
  const query = getQuery$1(event);
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
    const params = new URLSearchParams();
    if (query.page) params.append("page", query.page);
    if (query.limit) params.append("limit", query.limit);
    const backendUrl = `${config.public.apiBase}/collections/${collectionId}/mangas?${params.toString()}`;
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
    const mangas = (response.data || response.mangas || response || []).map((item) => ({
      ...item,
      addedAt: item.addedAt || item.dateAjout
    }));
    return {
      success: true,
      data: mangas,
      meta: {
        total: response.total || mangas.length,
        page: parseInt(query.page) || 1,
        limit: parseInt(query.limit) || 20,
        hasMore: response.hasMore || false
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Collection Mangas API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "FETCH_ERROR";
    let errorMessage = ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to fetch collection mangas";
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

const mangas_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: mangas_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const mangas_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
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
        message: "Authentication required to add manga to collection"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    const body = await readBody(event);
    const backendUrl = `${config.public.apiBase}/collections/${collectionId}/mangas`;
    const response = await $fetch(backendUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`
      },
      body
    });
    const collectionManga = {
      ...response.data || response,
      addedAt: response.addedAt || response.dateAjout
    };
    return {
      success: true,
      data: collectionManga,
      message: "Manga added to collection successfully",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Add Manga to Collection API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "ADD_ERROR";
    let errorMessage = ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to add manga to collection";
    if (statusCode === 401) {
      errorCode = "UNAUTHORIZED";
      errorMessage = "Invalid or expired authentication token";
    } else if (statusCode === 403) {
      errorCode = "FORBIDDEN";
      errorMessage = "You do not have permission to modify this collection";
    } else if (statusCode === 404) {
      errorCode = "NOT_FOUND";
      errorMessage = "Collection or manga not found";
    } else if (statusCode === 409) {
      errorCode = "ALREADY_EXISTS";
      errorMessage = "Manga is already in this collection";
    } else if (statusCode === 400) {
      errorCode = "VALIDATION_ERROR";
      errorMessage = ((_g = (_f = error.response) == null ? void 0 : _f.data) == null ? void 0 : _g.message) || "Invalid data";
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

const mangas_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: mangas_post
}, Symbol.toStringTag, { value: 'Module' }));

const _mangaId__delete = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const collectionId = getRouterParam(event, "id");
  const mangaId = getRouterParam(event, "mangaId");
  if (!collectionId || !mangaId) {
    setResponseStatus(event, 400);
    return {
      success: false,
      error: {
        code: "MISSING_PARAMS",
        message: "Collection ID and Manga ID are required"
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
        message: "Authentication required to remove manga from collection"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    const backendUrl = `${config.public.apiBase}/collections/${collectionId}/mangas/${mangaId}`;
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
      message: "Manga removed from collection successfully",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Remove Manga from Collection API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "REMOVE_ERROR";
    let errorMessage = ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to remove manga from collection";
    if (statusCode === 401) {
      errorCode = "UNAUTHORIZED";
      errorMessage = "Invalid or expired authentication token";
    } else if (statusCode === 403) {
      errorCode = "FORBIDDEN";
      errorMessage = "You do not have permission to modify this collection";
    } else if (statusCode === 404) {
      errorCode = "NOT_FOUND";
      errorMessage = "Collection, manga, or collection item not found";
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

const _mangaId__delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _mangaId__delete
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$4 = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const query = getQuery$1(event);
  const authToken = getCookie(event, "auth-token") || getHeader(event, "authorization");
  try {
    const params = new URLSearchParams();
    if (query.page) params.append("page", query.page);
    if (query.limit) params.append("limit", query.limit);
    if (query.search) params.append("search", query.search);
    if (query.sortBy) params.append("sortBy", query.sortBy);
    if (query.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query.userId) params.append("userId", query.userId);
    if (query.isPublic !== void 0) params.append("isPublic", query.isPublic);
    const backendUrl = `${config.public.apiBase}/collections?${params.toString()}`;
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
    const collections = (response.data || response.collections || response || []).map((collection) => ({
      ...collection,
      // Ensure consistent field naming
      createdAt: collection.createdAt || collection.dateCreation,
      updatedAt: collection.updatedAt || collection.dateModification,
      itemCount: collection.itemCount || collection.nbItems || 0
    }));
    return {
      success: true,
      data: collections,
      meta: {
        total: response.total || collections.length,
        page: parseInt(query.page) || 1,
        limit: parseInt(query.limit) || 20,
        hasMore: response.hasMore || false
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Collections API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "FETCH_ERROR";
    let errorMessage = ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to fetch collections";
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

const index_get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$4
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$2 = defineEventHandler(async (event) => {
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

const index_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const my_get$2 = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const query = getQuery$1(event);
  const authToken = getCookie(event, "auth-token") || getHeader(event, "authorization");
  if (!authToken) {
    setResponseStatus(event, 401);
    return {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication required to view your collections"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    const params = new URLSearchParams();
    if (query.page) params.append("page", query.page);
    if (query.limit) params.append("limit", query.limit);
    if (query.search) params.append("search", query.search);
    if (query.sortBy) params.append("sortBy", query.sortBy);
    if (query.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query.isPublic !== void 0) params.append("isPublic", query.isPublic);
    if (query.userId) {
      params.append("userId", String(query.userId));
    } else if (authToken) {
      try {
        const token = authToken.startsWith("Bearer ") ? authToken.slice(7) : authToken;
        const payload = JSON.parse(Buffer.from(token.split(".")[1] || "", "base64").toString("utf8"));
        const sub = (payload == null ? void 0 : payload.sub) || (payload == null ? void 0 : payload.userId) || (payload == null ? void 0 : payload.id);
        if (sub) params.append("userId", String(sub));
      } catch {
      }
    }
    const backendUrl = `${config.public.apiBase}/api/collections/my?${params.toString()}`;
    const response = await $fetch(backendUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`
      }
    });
    const collections = (response.data || response.collections || response || []).map((collection) => ({
      ...collection,
      // Ensure consistent field naming
      createdAt: collection.createdAt || collection.dateCreation,
      updatedAt: collection.updatedAt || collection.dateModification,
      itemCount: collection.itemCount || collection.nbItems || 0
    }));
    return {
      success: true,
      data: collections,
      meta: {
        total: response.total || collections.length,
        page: parseInt(query.page) || 1,
        limit: parseInt(query.limit) || 20,
        hasMore: response.hasMore || false
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("My Collections API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "FETCH_ERROR";
    let errorMessage = ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to fetch your collections";
    if (statusCode === 401) {
      errorCode = "UNAUTHORIZED";
      errorMessage = "Invalid or expired authentication token";
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

const my_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: my_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const animes_get$2 = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery$1(event);
  try {
    console.log("Proxying animes request with query:", query);
    const response = await $fetch(`${config.public.apiBase}/api/animes`, {
      query
    });
    const search = query.search || query.q || "";
    if (search && response && Array.isArray(response.animes)) {
      const norm = (s) => typeof s === "string" ? s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim() : "";
      const qn = norm(search);
      const scored = response.animes.map((a) => {
        const titre = norm(a.titre);
        const titreOrig = norm(a.titreOrig);
        const nice = norm(a.niceUrl);
        let w = 0;
        if (titre === qn) w += 100;
        if (titre.startsWith(qn)) w += 50;
        if (nice === qn) w += 40;
        if (titre.includes(qn)) w += 10;
        if (titreOrig && titreOrig === qn) w += 20;
        if (titreOrig && titreOrig.startsWith(qn)) w += 10;
        const rating = Number(a.moyenneNotes || a.moyenne_notes || 0);
        const reviews = Number(a.nbReviews || a.nb_reviews || 0);
        const year = Number(a.annee || 0);
        return { a, w, rating, reviews, year };
      });
      scored.sort(
        (x, y) => y.w - x.w || y.rating - x.rating || y.reviews - x.reviews || y.year - x.year
      );
      response.animes = scored.map((s) => s.a);
    }
    console.log("Proxy successful, returning data");
    return response;
  } catch (error) {
    console.error("Proxy failed:", error.message);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch animes"
    });
  }
});

const animes_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: animes_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const articles_get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery$1(event);
  try {
    console.log("Proxying articles request with query:", query);
    const cleanQuery = Object.entries(query).reduce((acc, [key, value]) => {
      if (value !== "" && value !== null && value !== void 0) {
        acc[key] = value;
      }
      return acc;
    }, {});
    console.log("Cleaned query:", cleanQuery);
    const response = await $fetch(`${config.public.apiBase}/api/articles`, {
      query: cleanQuery
    });
    console.log("Proxy successful, returning data");
    return response;
  } catch (error) {
    console.error("Proxy failed:", error.message);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch articles"
    });
  }
});

const articles_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: articles_get
}, Symbol.toStringTag, { value: 'Module' }));

const featured_get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery$1(event);
  try {
    console.log("Proxying featured articles request with query:", query);
    const cleanQuery = Object.entries(query).reduce((acc, [key, value]) => {
      if (value !== "" && value !== null && value !== void 0) {
        acc[key] = value;
      }
      return acc;
    }, {});
    cleanQuery.onindex = true;
    console.log("Cleaned query for featured articles:", cleanQuery);
    const response = await $fetch(`${config.public.apiBase}/api/articles`, {
      query: cleanQuery
    });
    console.log("Featured articles proxy successful, returning data");
    return response.articles || [];
  } catch (error) {
    console.error("Featured articles proxy failed:", error.message);
    console.log("Returning empty array for featured articles");
    return [];
  }
});

const featured_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: featured_get
}, Symbol.toStringTag, { value: 'Module' }));

const _slug__get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const slug = getRouterParam(event, "slug");
  try {
    console.log("Proxying article by slug request for:", slug);
    const response = await $fetch(`${config.public.apiBase}/api/articles/slug/${slug}`);
    console.log("Article by slug proxy successful, returning data");
    return response;
  } catch (error) {
    console.error("Article by slug proxy failed:", error.message);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Failed to fetch article"
    });
  }
});

const _slug__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _slug__get
}, Symbol.toStringTag, { value: 'Module' }));

const categories_get = defineEventHandler(async (event) => {
  const query = getQuery$1(event);
  try {
    console.log("Proxying categories request with query:", query);
    const categories = [
      { id: 1, name: "Editos", slug: "editos" },
      { id: 2, name: "Chroniques", slug: "chroniques" },
      { id: 4, name: "Dossiers", slug: "dossiers" },
      { id: 5, name: "Focus", slug: "focus" },
      { id: 6, name: "Top 5", slug: "top-5" },
      { id: 7, name: "WTF", slug: "wtf" },
      { id: 8, name: "Anime", slug: "anime" },
      { id: 9, name: "Figurines", slug: "figurines" },
      { id: 10, name: "Artbooks", slug: "artbooks" },
      { id: 11, name: "Goodies", slug: "goodies" }
    ];
    console.log("Proxy successful, returning categories data");
    return categories;
  } catch (error) {
    console.error("Categories proxy failed:", error.message);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch categories"
    });
  }
});

const categories_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: categories_get
}, Symbol.toStringTag, { value: 'Module' }));

const mangas_get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery$1(event);
  try {
    console.log("Proxying mangas request with query:", query);
    const response = await $fetch(`${config.public.apiBase}/api/mangas`, {
      query
    });
    console.log("Proxy successful, returning data");
    return response;
  } catch (error) {
    console.error("Proxy failed:", error.message);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch mangas"
    });
  }
});

const mangas_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: mangas_get
}, Symbol.toStringTag, { value: 'Module' }));

const reviews_get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery$1(event);
  try {
    console.log("Proxying reviews request with query:", query);
    const response = await $fetch(`${config.public.apiBase}/api/reviews`, {
      query
    });
    console.log("Reviews proxy successful, returning data");
    return response;
  } catch (error) {
    console.error("Reviews proxy failed:", error.message);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch reviews"
    });
  }
});

const reviews_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: reviews_get
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const id = getRouterParam(event, "id");
  const authToken = getCookie(event, "auth-token") || getHeader(event, "authorization");
  if (!authToken) {
    setResponseStatus(event, 401);
    return {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication required to delete a review"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
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
    const backendUrl = `${config.public.apiBase}/critiques/${id}`;
    await $fetch(backendUrl, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Authorization": authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`
      }
    });
    return {
      success: true,
      message: "Review deleted successfully",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Delete Review API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "DELETE_ERROR";
    let errorMessage = ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to delete review";
    if (statusCode === 401) {
      errorCode = "UNAUTHORIZED";
      errorMessage = "Invalid or expired authentication token";
    } else if (statusCode === 403) {
      errorCode = "FORBIDDEN";
      errorMessage = "You do not have permission to delete this review";
    } else if (statusCode === 404) {
      errorCode = "NOT_FOUND";
      errorMessage = "Review not found";
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

const _id__delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get$2 = defineEventHandler(async (event) => {
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

const _id__get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$2
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const authToken = getCookie(event, "auth-token") || getHeader(event, "authorization");
  if (!authToken) {
    setResponseStatus(event, 401);
    return {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication required to update a review"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
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
    if (body.notation !== void 0 && (body.notation < 0 || body.notation > 10)) {
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
    const backendData = {};
    if (body.titre !== void 0) backendData.titre = body.titre;
    if (body.contenu !== void 0) backendData.contenu = body.contenu;
    if (body.content !== void 0) backendData.contenu = body.content;
    if (body.critique !== void 0) backendData.critique = body.critique;
    if (body.notation !== void 0) backendData.notation = body.notation;
    if (body.rating !== void 0) backendData.notation = body.rating;
    if (body.tags !== void 0) backendData.tags = body.tags;
    if (body.estPublique !== void 0) backendData.estPublique = body.estPublique;
    if (body.isPublic !== void 0) backendData.estPublique = body.isPublic;
    if (body.allowComments !== void 0) backendData.allowComments = body.allowComments;
    if (body.metaTitle !== void 0) backendData.metaTitle = body.metaTitle;
    if (body.metaDescription !== void 0) backendData.metaDescription = body.metaDescription;
    if (body.statut !== void 0) backendData.statut = body.statut;
    const backendUrl = `${config.public.apiBase}/critiques/${id}`;
    const response = await $fetch(backendUrl, {
      method: "PUT",
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
      message: "Review updated successfully",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Update Review API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "UPDATE_ERROR";
    let errorMessage = ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to update review";
    if (statusCode === 401) {
      errorCode = "UNAUTHORIZED";
      errorMessage = "Invalid or expired authentication token";
    } else if (statusCode === 403) {
      errorCode = "FORBIDDEN";
      errorMessage = "You do not have permission to update this review";
    } else if (statusCode === 404) {
      errorCode = "NOT_FOUND";
      errorMessage = "Review not found";
    } else if (statusCode === 400) {
      errorCode = "VALIDATION_ERROR";
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

const _id__put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$2 = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const query = getQuery$1(event);
  try {
    const params = new URLSearchParams();
    if (query.page) params.append("page", query.page);
    if (query.limit) params.append("limit", query.limit);
    if (query.search) params.append("search", query.search);
    if (query.type) params.append("type", query.type);
    if (query.sortBy) params.append("sortBy", query.sortBy);
    if (query.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query.rating) params.append("minNotation", query.rating);
    if (query.author) params.append("author", query.author);
    if (query.idAnime) params.append("idAnime", query.idAnime);
    if (query.idManga) params.append("idManga", query.idManga);
    if (query.statut) params.append("statut", query.statut);
    if (query.estPublique !== void 0) params.append("estPublique", query.estPublique);
    const backendUrl = `${config.public.apiBase}/critiques?${params.toString()}`;
    const response = await $fetch(backendUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
    return {
      success: true,
      data: response.data || response.critiques || response || [],
      meta: {
        total: response.total || 0,
        page: parseInt(query.page) || 1,
        limit: parseInt(query.limit) || 20,
        hasMore: response.hasMore || false
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Reviews API Error:", error);
    setResponseStatus(event, ((_a = error.response) == null ? void 0 : _a.status) || 500);
    return {
      success: false,
      error: {
        code: ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "FETCH_ERROR",
        message: ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to fetch reviews",
        details: (_f = error.response) == null ? void 0 : _f.data
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
});

const index_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$2
}, Symbol.toStringTag, { value: 'Module' }));

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

const index_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post
}, Symbol.toStringTag, { value: 'Module' }));

const my_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const query = getQuery$1(event);
  const authToken = getCookie(event, "auth-token") || getHeader(event, "authorization");
  if (!authToken) {
    setResponseStatus(event, 401);
    return {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication required to view your reviews"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  try {
    const params = new URLSearchParams();
    if (query.page) params.append("page", query.page);
    if (query.limit) params.append("limit", query.limit);
    if (query.search) params.append("search", query.search);
    if (query.sortBy) params.append("sortBy", query.sortBy);
    if (query.sortOrder) params.append("sortOrder", query.sortOrder);
    if (query.statut !== void 0) params.append("statut", query.statut);
    if (query.estPublique !== void 0) params.append("estPublique", query.estPublique);
    const backendUrl = `${config.public.apiBase}/critiques/my?${params.toString()}`;
    const response = await $fetch(backendUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`
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
        hasMore: response.hasMore || false
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("My Reviews API Error:", error);
    let statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    let errorCode = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "FETCH_ERROR";
    let errorMessage = ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to fetch your reviews";
    if (statusCode === 401) {
      errorCode = "UNAUTHORIZED";
      errorMessage = "Invalid or expired authentication token";
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

const my_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: my_get
}, Symbol.toStringTag, { value: 'Module' }));

const stats_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const query = getQuery$1(event);
  try {
    const params = new URLSearchParams();
    if (query.period) params.append("period", query.period);
    if (query.type) params.append("type", query.type);
    const backendUrl = `${config.public.apiBase}/critiques/stats?${params.toString()}`;
    const response = await $fetch(backendUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
    const stats = {
      totalReviews: response.totalReviews || response.total || 0,
      publishedReviews: response.publishedReviews || response.published || 0,
      draftReviews: response.draftReviews || response.drafts || 0,
      averageRating: response.averageRating || response.avgRating || 0,
      totalViews: response.totalViews || response.views || 0,
      totalLikes: response.totalLikes || response.likes || 0,
      totalComments: response.totalComments || response.comments || 0,
      // Top reviewers
      topReviewers: response.topReviewers || [],
      // Popular media
      popularMedia: response.popularMedia || [],
      // Recent activity
      recentActivity: response.recentActivity || [],
      // Additional stats
      topTags: response.topTags || [],
      ratingDistribution: response.ratingDistribution || [],
      monthlyStats: response.monthlyStats || []
    };
    return {
      success: true,
      data: stats,
      meta: {
        period: query.period || "all",
        type: query.type || "both",
        generatedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Review Stats API Error:", error);
    const fallbackStats = {
      totalReviews: 0,
      publishedReviews: 0,
      draftReviews: 0,
      averageRating: 0,
      totalViews: 0,
      totalLikes: 0,
      totalComments: 0,
      topReviewers: [],
      popularMedia: [],
      recentActivity: [],
      topTags: [],
      ratingDistribution: [],
      monthlyStats: []
    };
    const statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    if (statusCode >= 500) {
      console.warn("Using fallback stats due to server error");
      return {
        success: true,
        data: fallbackStats,
        meta: {
          period: query.period || "all",
          type: query.type || "both",
          generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          fallback: true
        },
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: {
        code: ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "STATS_ERROR",
        message: ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to fetch review statistics",
        details: (_f = error.response) == null ? void 0 : _f.data
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
});

const stats_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: stats_get
}, Symbol.toStringTag, { value: 'Module' }));

const top_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const query = getQuery$1(event);
  try {
    const params = new URLSearchParams();
    if (query.limit) params.append("limit", query.limit);
    if (query.period) params.append("period", query.period);
    if (query.type) params.append("type", query.type);
    const backendUrl = `${config.public.apiBase}/critiques/top?${params.toString()}`;
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
        total: reviews.length,
        limit: parseInt(query.limit) || 10,
        period: query.period || "week"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Top Reviews API Error:", error);
    const statusCode = ((_a = error.response) == null ? void 0 : _a.status) || 500;
    if (statusCode >= 500) {
      return {
        success: true,
        data: [],
        meta: {
          total: 0,
          limit: parseInt(query.limit) || 10,
          period: query.period || "week"
        },
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: {
        code: ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.code) || "FETCH_ERROR",
        message: ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || error.message || "Failed to fetch top reviews",
        details: (_f = error.response) == null ? void 0 : _f.data
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
});

const top_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: top_get
}, Symbol.toStringTag, { value: 'Module' }));

const _userId__get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const userId = getRouterParam(event, "userId");
  const query = getQuery$1(event);
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

const _userId__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _userId__get
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get = defineEventHandler(async (event) => {
  var _a;
  const seasonId = getRouterParam(event, "id");
  if (!seasonId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Season ID is required"
    });
  }
  try {
    const config = useRuntimeConfig();
    const response = await $fetch(`${config.public.apiBase}/api/seasons/${seasonId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const saisonMap = {
      1: "hiver",
      2: "printemps",
      3: "\xE9t\xE9",
      4: "automne"
    };
    const seasonData = response;
    return {
      id_saison: seasonData.id_saison || seasonData.idSaison,
      saison: seasonData.saison,
      annee: seasonData.annee,
      statut: seasonData.statut,
      nom_saison: saisonMap[seasonData.saison] || "\xE9t\xE9",
      json_data: seasonData.json_data || seasonData.jsonData
    };
  } catch (error) {
    console.error("Error fetching season:", error);
    if (((_a = error.response) == null ? void 0 : _a.status) === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: "Season not found"
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Error fetching season data"
    });
  }
});

const _id__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get
}, Symbol.toStringTag, { value: 'Module' }));

const animes_get = defineEventHandler(async (event) => {
  var _a;
  const seasonId = getRouterParam(event, "id");
  if (!seasonId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Season ID is required"
    });
  }
  try {
    const config = useRuntimeConfig();
    const animes = await $fetch(`${config.public.apiBase}/api/seasons/${seasonId}/animes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return animes;
  } catch (error) {
    console.error("Error fetching season animes:", error);
    if (((_a = error.response) == null ? void 0 : _a.status) === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: "Season not found"
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Error fetching season anime data"
    });
  }
});

const animes_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: animes_get
}, Symbol.toStringTag, { value: 'Module' }));

const current_get = defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const response = await $fetch(`${config.public.apiBase}/api/seasons/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const saisonMap = {
      1: "hiver",
      2: "printemps",
      3: "\xE9t\xE9",
      4: "automne"
    };
    const seasonData = response;
    return {
      id_saison: seasonData.id_saison || seasonData.idSaison,
      saison: seasonData.saison,
      annee: seasonData.annee,
      statut: seasonData.statut,
      nom_saison: saisonMap[seasonData.saison] || "\xE9t\xE9"
    };
  } catch (error) {
    console.error("Error fetching current season:", error);
    return {
      id_saison: 198,
      saison: 3,
      // été
      annee: 2025,
      statut: 1,
      nom_saison: "\xE9t\xE9"
    };
  }
});

const current_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: current_get
}, Symbol.toStringTag, { value: 'Module' }));

const index_get = defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const response = await $fetch(`${config.public.apiBase}/api/seasons`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const saisonMap = {
      1: "hiver",
      2: "printemps",
      3: "\xE9t\xE9",
      4: "automne"
    };
    const seasons = response.map((season) => ({
      id_saison: season.id_saison || season.idSaison,
      saison: season.saison,
      annee: season.annee,
      statut: season.statut,
      nom_saison: saisonMap[season.saison] || "\xE9t\xE9",
      json_data: season.json_data || season.jsonData
    }));
    seasons.sort((a, b) => {
      if (a.annee !== b.annee) {
        return b.annee - a.annee;
      }
      return b.saison - a.saison;
    });
    return seasons;
  } catch (error) {
    console.error("Error fetching seasons:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error fetching seasons data"
    });
  }
});

const index_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get
}, Symbol.toStringTag, { value: 'Module' }));

const ____path__get = defineEventHandler(async (event) => {
  const path = getRouterParam(event, "path");
  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid image path"
    });
  }
  const imagePath = Array.isArray(path) ? path.join("/") : path;
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  const hasValidExtension = allowedExtensions.some(
    (ext) => imagePath.toLowerCase().endsWith(ext)
  );
  if (!hasValidExtension) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid file type"
    });
  }
  if (imagePath.includes("..")) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid file path"
    });
  }
  const filename = imagePath.split("/").pop() || imagePath;
  try {
    const localImagePath = `/home/zohardus/www/ak9project/frontendv2/public/images/webzine/img/${filename}`;
    const fs = await import('node:fs/promises');
    await fs.access(localImagePath);
    const imageBuffer = await fs.readFile(localImagePath);
    let contentType = "image/jpeg";
    if (filename.toLowerCase().endsWith(".png")) contentType = "image/png";
    else if (filename.toLowerCase().endsWith(".gif")) contentType = "image/gif";
    else if (filename.toLowerCase().endsWith(".webp")) contentType = "image/webp";
    setHeader(event, "Content-Type", contentType);
    setHeader(event, "Cache-Control", "public, max-age=86400");
    setHeader(event, "Content-Length", imageBuffer.length.toString());
    return imageBuffer;
  } catch (error) {
    console.error("Error serving webzine image:", error);
    throw createError({
      statusCode: 404,
      statusMessage: "Image not found"
    });
  }
});

const ____path__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: ____path__get
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": false
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

const renderSSRHeadOptions = {"omitLineBreaks":false};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const ssrContext = createSSRContext(event);
  const headEntryOptions = { mode: "server" };
  ssrContext.head.push(appHead, headEntryOptions);
  if (ssrError) {
    ssrError.statusCode &&= Number.parseInt(ssrError.statusCode);
    setSSRError(ssrContext, ssrError);
  }
  const isRenderingPayload = PAYLOAD_URL_RE.test(ssrContext.url);
  if (isRenderingPayload) {
    const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
    ssrContext.url = url;
    event._path = event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  if (routeOptions.ssr === false) {
    ssrContext.noSSR = true;
  }
  const renderer = await getRenderer();
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  const inlinedStyles = [];
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response = renderPayloadResponse(ssrContext);
    return response;
  }
  const NO_SCRIPTS = routeOptions.noScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest && !NO_SCRIPTS) {
    ssrContext.head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  const link = [];
  for (const resource of Object.values(styles)) {
    if ("inline" in getQuery(resource.file)) {
      continue;
    }
    link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
  }
  if (link.length) {
    ssrContext.head.push({ link }, headEntryOptions);
  }
  if (!NO_SCRIPTS) {
    ssrContext.head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.noScripts) {
    const tagPosition = "head";
    ssrContext.head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition,
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
  const htmlContext = {
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  return {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
});
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}

const renderer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: renderer
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
