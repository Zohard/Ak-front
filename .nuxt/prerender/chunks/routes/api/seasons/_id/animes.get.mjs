import { defineEventHandler, getRouterParam, createError } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
import { u as useRuntimeConfig } from '../../../../nitro/nitro.mjs';
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

export { animes_get as default };
//# sourceMappingURL=animes.get.mjs.map
