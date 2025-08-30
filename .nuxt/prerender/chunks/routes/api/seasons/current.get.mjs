import { defineEventHandler } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
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

export { current_get as default };
//# sourceMappingURL=current.get.mjs.map
