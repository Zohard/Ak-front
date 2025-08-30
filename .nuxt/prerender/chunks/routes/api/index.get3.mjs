import { defineEventHandler, createError } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
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

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
