/**
 * App configuration.
 * This file is used to configure the app settings.
 * Below are the default values.
 */
export default defineAppConfig({
  siteName: 'Alttari',
  shortDescription: 'Näyttäviä ja kestäviä teräskoruja tummanpuhuvan estetiikan ystäville. Alttari tarjoaa laadukkaat, vedenkestävät ruostumattomasta teräksestä valmistetut korut.',
  description: `Merkityksellisiä, keskiaikaisen symboliikan inspiroimia, alt -ja goottityylisiä terässormuksia teräskaulakoruja ja teräskorvakoruja.`,
  baseUrl: 'https://demo.woonuxt.com',
  siteImage: 'https://user-images.githubusercontent.com/5116925/218879668-f4c1f9fd-bef4-44b0-bc7f-e87d994aa3a1.png',
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
