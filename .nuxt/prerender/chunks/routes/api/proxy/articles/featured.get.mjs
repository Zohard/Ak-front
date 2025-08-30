import { defineEventHandler, getQuery } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
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

const featured_get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
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

export { featured_get as default };
//# sourceMappingURL=featured.get.mjs.map
