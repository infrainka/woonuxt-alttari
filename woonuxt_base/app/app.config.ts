/**
 * App configuration.
 * This file is used to configure the app settings.
 * Below are the default values.
 */
const baseUrl = 'https://alttari.shop';

export default defineAppConfig({
  siteName: 'Alttari',
  shortDescription: 'Näyttäviä ja kestäviä teräskoruja tummanpuhuvan estetiikan ystäville. Alttari tarjoaa laadukkaat, vedenkestävät ruostumattomasta teräksestä valmistetut korut.',
  description: `Merkityksellisiä, keskiaikaisen symboliikan inspiroimia, alt -ja goottityylisiä terässormuksia teräskaulakoruja ja teräskorvakoruja.`,
  baseUrl,
  siteImage: `${baseUrl}/images/alttari-frontpage.png`,
  storeSettings: {
    autoOpenCart: false,
    // cartMode: 'optimistic' updates UI immediately; 'safe' waits for the server response.
    cartMode: 'optimistic',
    showReviews: true,
    showFilters: true,
    showOrderByDropdown: true,
    showSKU: true,
    showRelatedProducts: true,
    showProductCategoriesOnSingleProduct: true,
    showBreadcrumbOnSingleProduct: true,
    showMoveToWishlist: true,
    hideBillingAddressForVirtualProducts: false,
    initStoreOnUserActionToReduceServerLoad: true,
    productGalleryThumbnailsPosition: 'bottom', // 'bottom' or 'left'
    saleBadge: 'percent', // 'percent', 'onSale' or 'hidden'
    socialLoginsDisplay: 'buttons', // 'buttons' or 'icons'
  },
});
