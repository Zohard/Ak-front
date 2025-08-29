
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'AdminNotification': typeof import("../components/AdminNotification.vue")['default']
    'AnimeCard': typeof import("../components/AnimeCard.vue")['default']
    'ArticleCard': typeof import("../components/ArticleCard.vue")['default']
    'ForumPanel': typeof import("../components/ForumPanel.vue")['default']
    'HeroBanner': typeof import("../components/HeroBanner.vue")['default']
    'LogoutModal': typeof import("../components/LogoutModal.vue")['default']
    'MangaCard': typeof import("../components/MangaCard.vue")['default']
    'ModernHeroBanner': typeof import("../components/ModernHeroBanner.vue")['default']
    'NotificationContainer': typeof import("../components/NotificationContainer.vue")['default']
    'RelatedContent': typeof import("../components/RelatedContent.vue")['default']
    'ReviewDetail': typeof import("../components/ReviewDetail.vue")['default']
    'SearchBar': typeof import("../components/SearchBar.vue")['default']
    'ShareModal': typeof import("../components/ShareModal.vue")['default']
    'SimpleHeroBanner': typeof import("../components/SimpleHeroBanner.vue")['default']
    'SmartImage': typeof import("../components/SmartImage.vue")['default']
    'TheFooter': typeof import("../components/TheFooter.vue")['default']
    'TheHeader': typeof import("../components/TheHeader.vue")['default']
    'ThemeToggle': typeof import("../components/ThemeToggle.vue")['default']
    'ArticlesArticleCard': typeof import("../components/articles/ArticleCard.vue")['default']
    'ArticlesArticleCardGrid': typeof import("../components/articles/ArticleCardGrid.vue")['default']
    'ArticlesArticleContent': typeof import("../components/articles/ArticleContent.vue")['default']
    'ArticlesArticleHeader': typeof import("../components/articles/ArticleHeader.vue")['default']
    'ArticlesArticleNavigation': typeof import("../components/articles/ArticleNavigation.vue")['default']
    'ArticlesArticlePagination': typeof import("../components/articles/ArticlePagination.vue")['default']
    'ArticlesArticleSocialShare': typeof import("../components/articles/ArticleSocialShare.vue")['default']
    'GlobalIcon': typeof import("../components/global/Icon.vue")['default']
    'ReviewsReviewAuthor': typeof import("../components/reviews/ReviewAuthor.vue")['default']
    'ReviewsReviewCard': typeof import("../components/reviews/ReviewCard.vue")['default']
    'ReviewsReviewContent': typeof import("../components/reviews/ReviewContent.vue")['default']
    'ReviewsReviewFilters': typeof import("../components/reviews/ReviewFilters.vue")['default']
    'ReviewsReviewImageModal': typeof import("../components/reviews/ReviewImageModal.vue")['default']
    'ReviewsReviewMediaCard': typeof import("../components/reviews/ReviewMediaCard.vue")['default']
    'ReviewsReviewRating': typeof import("../components/reviews/ReviewRating.vue")['default']
    'ReviewsTopReviews': typeof import("../components/reviews/TopReviews.vue")['default']
    'SeasonsSeasonAnimeCard': typeof import("../components/seasons/SeasonAnimeCard.vue")['default']
    'UiBadge': typeof import("../components/ui/Badge.vue")['default']
    'UiButton': typeof import("../components/ui/Button.vue")['default']
    'UiCheckbox': typeof import("../components/ui/Checkbox.vue")['default']
    'UiInput': typeof import("../components/ui/Input.vue")['default']
    'UiLoadingSkeleton': typeof import("../components/ui/LoadingSkeleton.vue")['default']
    'UiModal': typeof import("../components/ui/Modal.vue")['default']
    'UiRadio': typeof import("../components/ui/Radio.vue")['default']
    'UiSelect': typeof import("../components/ui/Select.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'ColorScheme': typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyAdminNotification': LazyComponent<typeof import("../components/AdminNotification.vue")['default']>
    'LazyAnimeCard': LazyComponent<typeof import("../components/AnimeCard.vue")['default']>
    'LazyArticleCard': LazyComponent<typeof import("../components/ArticleCard.vue")['default']>
    'LazyForumPanel': LazyComponent<typeof import("../components/ForumPanel.vue")['default']>
    'LazyHeroBanner': LazyComponent<typeof import("../components/HeroBanner.vue")['default']>
    'LazyLogoutModal': LazyComponent<typeof import("../components/LogoutModal.vue")['default']>
    'LazyMangaCard': LazyComponent<typeof import("../components/MangaCard.vue")['default']>
    'LazyModernHeroBanner': LazyComponent<typeof import("../components/ModernHeroBanner.vue")['default']>
    'LazyNotificationContainer': LazyComponent<typeof import("../components/NotificationContainer.vue")['default']>
    'LazyRelatedContent': LazyComponent<typeof import("../components/RelatedContent.vue")['default']>
    'LazyReviewDetail': LazyComponent<typeof import("../components/ReviewDetail.vue")['default']>
    'LazySearchBar': LazyComponent<typeof import("../components/SearchBar.vue")['default']>
    'LazyShareModal': LazyComponent<typeof import("../components/ShareModal.vue")['default']>
    'LazySimpleHeroBanner': LazyComponent<typeof import("../components/SimpleHeroBanner.vue")['default']>
    'LazySmartImage': LazyComponent<typeof import("../components/SmartImage.vue")['default']>
    'LazyTheFooter': LazyComponent<typeof import("../components/TheFooter.vue")['default']>
    'LazyTheHeader': LazyComponent<typeof import("../components/TheHeader.vue")['default']>
    'LazyThemeToggle': LazyComponent<typeof import("../components/ThemeToggle.vue")['default']>
    'LazyArticlesArticleCard': LazyComponent<typeof import("../components/articles/ArticleCard.vue")['default']>
    'LazyArticlesArticleCardGrid': LazyComponent<typeof import("../components/articles/ArticleCardGrid.vue")['default']>
    'LazyArticlesArticleContent': LazyComponent<typeof import("../components/articles/ArticleContent.vue")['default']>
    'LazyArticlesArticleHeader': LazyComponent<typeof import("../components/articles/ArticleHeader.vue")['default']>
    'LazyArticlesArticleNavigation': LazyComponent<typeof import("../components/articles/ArticleNavigation.vue")['default']>
    'LazyArticlesArticlePagination': LazyComponent<typeof import("../components/articles/ArticlePagination.vue")['default']>
    'LazyArticlesArticleSocialShare': LazyComponent<typeof import("../components/articles/ArticleSocialShare.vue")['default']>
    'LazyGlobalIcon': LazyComponent<typeof import("../components/global/Icon.vue")['default']>
    'LazyReviewsReviewAuthor': LazyComponent<typeof import("../components/reviews/ReviewAuthor.vue")['default']>
    'LazyReviewsReviewCard': LazyComponent<typeof import("../components/reviews/ReviewCard.vue")['default']>
    'LazyReviewsReviewContent': LazyComponent<typeof import("../components/reviews/ReviewContent.vue")['default']>
    'LazyReviewsReviewFilters': LazyComponent<typeof import("../components/reviews/ReviewFilters.vue")['default']>
    'LazyReviewsReviewImageModal': LazyComponent<typeof import("../components/reviews/ReviewImageModal.vue")['default']>
    'LazyReviewsReviewMediaCard': LazyComponent<typeof import("../components/reviews/ReviewMediaCard.vue")['default']>
    'LazyReviewsReviewRating': LazyComponent<typeof import("../components/reviews/ReviewRating.vue")['default']>
    'LazyReviewsTopReviews': LazyComponent<typeof import("../components/reviews/TopReviews.vue")['default']>
    'LazySeasonsSeasonAnimeCard': LazyComponent<typeof import("../components/seasons/SeasonAnimeCard.vue")['default']>
    'LazyUiBadge': LazyComponent<typeof import("../components/ui/Badge.vue")['default']>
    'LazyUiButton': LazyComponent<typeof import("../components/ui/Button.vue")['default']>
    'LazyUiCheckbox': LazyComponent<typeof import("../components/ui/Checkbox.vue")['default']>
    'LazyUiInput': LazyComponent<typeof import("../components/ui/Input.vue")['default']>
    'LazyUiLoadingSkeleton': LazyComponent<typeof import("../components/ui/LoadingSkeleton.vue")['default']>
    'LazyUiModal': LazyComponent<typeof import("../components/ui/Modal.vue")['default']>
    'LazyUiRadio': LazyComponent<typeof import("../components/ui/Radio.vue")['default']>
    'LazyUiSelect': LazyComponent<typeof import("../components/ui/Select.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyColorScheme': LazyComponent<typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const AdminNotification: typeof import("../components/AdminNotification.vue")['default']
export const AnimeCard: typeof import("../components/AnimeCard.vue")['default']
export const ArticleCard: typeof import("../components/ArticleCard.vue")['default']
export const ForumPanel: typeof import("../components/ForumPanel.vue")['default']
export const HeroBanner: typeof import("../components/HeroBanner.vue")['default']
export const LogoutModal: typeof import("../components/LogoutModal.vue")['default']
export const MangaCard: typeof import("../components/MangaCard.vue")['default']
export const ModernHeroBanner: typeof import("../components/ModernHeroBanner.vue")['default']
export const NotificationContainer: typeof import("../components/NotificationContainer.vue")['default']
export const RelatedContent: typeof import("../components/RelatedContent.vue")['default']
export const ReviewDetail: typeof import("../components/ReviewDetail.vue")['default']
export const SearchBar: typeof import("../components/SearchBar.vue")['default']
export const ShareModal: typeof import("../components/ShareModal.vue")['default']
export const SimpleHeroBanner: typeof import("../components/SimpleHeroBanner.vue")['default']
export const SmartImage: typeof import("../components/SmartImage.vue")['default']
export const TheFooter: typeof import("../components/TheFooter.vue")['default']
export const TheHeader: typeof import("../components/TheHeader.vue")['default']
export const ThemeToggle: typeof import("../components/ThemeToggle.vue")['default']
export const ArticlesArticleCard: typeof import("../components/articles/ArticleCard.vue")['default']
export const ArticlesArticleCardGrid: typeof import("../components/articles/ArticleCardGrid.vue")['default']
export const ArticlesArticleContent: typeof import("../components/articles/ArticleContent.vue")['default']
export const ArticlesArticleHeader: typeof import("../components/articles/ArticleHeader.vue")['default']
export const ArticlesArticleNavigation: typeof import("../components/articles/ArticleNavigation.vue")['default']
export const ArticlesArticlePagination: typeof import("../components/articles/ArticlePagination.vue")['default']
export const ArticlesArticleSocialShare: typeof import("../components/articles/ArticleSocialShare.vue")['default']
export const GlobalIcon: typeof import("../components/global/Icon.vue")['default']
export const ReviewsReviewAuthor: typeof import("../components/reviews/ReviewAuthor.vue")['default']
export const ReviewsReviewCard: typeof import("../components/reviews/ReviewCard.vue")['default']
export const ReviewsReviewContent: typeof import("../components/reviews/ReviewContent.vue")['default']
export const ReviewsReviewFilters: typeof import("../components/reviews/ReviewFilters.vue")['default']
export const ReviewsReviewImageModal: typeof import("../components/reviews/ReviewImageModal.vue")['default']
export const ReviewsReviewMediaCard: typeof import("../components/reviews/ReviewMediaCard.vue")['default']
export const ReviewsReviewRating: typeof import("../components/reviews/ReviewRating.vue")['default']
export const ReviewsTopReviews: typeof import("../components/reviews/TopReviews.vue")['default']
export const SeasonsSeasonAnimeCard: typeof import("../components/seasons/SeasonAnimeCard.vue")['default']
export const UiBadge: typeof import("../components/ui/Badge.vue")['default']
export const UiButton: typeof import("../components/ui/Button.vue")['default']
export const UiCheckbox: typeof import("../components/ui/Checkbox.vue")['default']
export const UiInput: typeof import("../components/ui/Input.vue")['default']
export const UiLoadingSkeleton: typeof import("../components/ui/LoadingSkeleton.vue")['default']
export const UiModal: typeof import("../components/ui/Modal.vue")['default']
export const UiRadio: typeof import("../components/ui/Radio.vue")['default']
export const UiSelect: typeof import("../components/ui/Select.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const ColorScheme: typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyAdminNotification: LazyComponent<typeof import("../components/AdminNotification.vue")['default']>
export const LazyAnimeCard: LazyComponent<typeof import("../components/AnimeCard.vue")['default']>
export const LazyArticleCard: LazyComponent<typeof import("../components/ArticleCard.vue")['default']>
export const LazyForumPanel: LazyComponent<typeof import("../components/ForumPanel.vue")['default']>
export const LazyHeroBanner: LazyComponent<typeof import("../components/HeroBanner.vue")['default']>
export const LazyLogoutModal: LazyComponent<typeof import("../components/LogoutModal.vue")['default']>
export const LazyMangaCard: LazyComponent<typeof import("../components/MangaCard.vue")['default']>
export const LazyModernHeroBanner: LazyComponent<typeof import("../components/ModernHeroBanner.vue")['default']>
export const LazyNotificationContainer: LazyComponent<typeof import("../components/NotificationContainer.vue")['default']>
export const LazyRelatedContent: LazyComponent<typeof import("../components/RelatedContent.vue")['default']>
export const LazyReviewDetail: LazyComponent<typeof import("../components/ReviewDetail.vue")['default']>
export const LazySearchBar: LazyComponent<typeof import("../components/SearchBar.vue")['default']>
export const LazyShareModal: LazyComponent<typeof import("../components/ShareModal.vue")['default']>
export const LazySimpleHeroBanner: LazyComponent<typeof import("../components/SimpleHeroBanner.vue")['default']>
export const LazySmartImage: LazyComponent<typeof import("../components/SmartImage.vue")['default']>
export const LazyTheFooter: LazyComponent<typeof import("../components/TheFooter.vue")['default']>
export const LazyTheHeader: LazyComponent<typeof import("../components/TheHeader.vue")['default']>
export const LazyThemeToggle: LazyComponent<typeof import("../components/ThemeToggle.vue")['default']>
export const LazyArticlesArticleCard: LazyComponent<typeof import("../components/articles/ArticleCard.vue")['default']>
export const LazyArticlesArticleCardGrid: LazyComponent<typeof import("../components/articles/ArticleCardGrid.vue")['default']>
export const LazyArticlesArticleContent: LazyComponent<typeof import("../components/articles/ArticleContent.vue")['default']>
export const LazyArticlesArticleHeader: LazyComponent<typeof import("../components/articles/ArticleHeader.vue")['default']>
export const LazyArticlesArticleNavigation: LazyComponent<typeof import("../components/articles/ArticleNavigation.vue")['default']>
export const LazyArticlesArticlePagination: LazyComponent<typeof import("../components/articles/ArticlePagination.vue")['default']>
export const LazyArticlesArticleSocialShare: LazyComponent<typeof import("../components/articles/ArticleSocialShare.vue")['default']>
export const LazyGlobalIcon: LazyComponent<typeof import("../components/global/Icon.vue")['default']>
export const LazyReviewsReviewAuthor: LazyComponent<typeof import("../components/reviews/ReviewAuthor.vue")['default']>
export const LazyReviewsReviewCard: LazyComponent<typeof import("../components/reviews/ReviewCard.vue")['default']>
export const LazyReviewsReviewContent: LazyComponent<typeof import("../components/reviews/ReviewContent.vue")['default']>
export const LazyReviewsReviewFilters: LazyComponent<typeof import("../components/reviews/ReviewFilters.vue")['default']>
export const LazyReviewsReviewImageModal: LazyComponent<typeof import("../components/reviews/ReviewImageModal.vue")['default']>
export const LazyReviewsReviewMediaCard: LazyComponent<typeof import("../components/reviews/ReviewMediaCard.vue")['default']>
export const LazyReviewsReviewRating: LazyComponent<typeof import("../components/reviews/ReviewRating.vue")['default']>
export const LazyReviewsTopReviews: LazyComponent<typeof import("../components/reviews/TopReviews.vue")['default']>
export const LazySeasonsSeasonAnimeCard: LazyComponent<typeof import("../components/seasons/SeasonAnimeCard.vue")['default']>
export const LazyUiBadge: LazyComponent<typeof import("../components/ui/Badge.vue")['default']>
export const LazyUiButton: LazyComponent<typeof import("../components/ui/Button.vue")['default']>
export const LazyUiCheckbox: LazyComponent<typeof import("../components/ui/Checkbox.vue")['default']>
export const LazyUiInput: LazyComponent<typeof import("../components/ui/Input.vue")['default']>
export const LazyUiLoadingSkeleton: LazyComponent<typeof import("../components/ui/LoadingSkeleton.vue")['default']>
export const LazyUiModal: LazyComponent<typeof import("../components/ui/Modal.vue")['default']>
export const LazyUiRadio: LazyComponent<typeof import("../components/ui/Radio.vue")['default']>
export const LazyUiSelect: LazyComponent<typeof import("../components/ui/Select.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyColorScheme: LazyComponent<typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
