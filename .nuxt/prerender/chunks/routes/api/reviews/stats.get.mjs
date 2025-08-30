import { defineEventHandler, getQuery, setResponseStatus } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';
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

const stats_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const config = useRuntimeConfig();
  const query = getQuery(event);
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

export { stats_get as default };
//# sourceMappingURL=stats.get.mjs.map
