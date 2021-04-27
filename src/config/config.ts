export default {
  urls: {
    startSession: "/index/api/v1/startsession",
    category: "/index/api/v1/category",
    baseUrl: "http://3.140.247.38:7005",
    // ====================================================
    subCategory: "/shopping/api/v1/subcategory",
    sortByMethod: "/shopping/api/v1/sort_by_method",
    AllItems: "/shopping/api/v1/get-all-items",
    // ====================================================
    addToCart: "/payment/api/v1/add_to_cart",
    proceedToCheckout: "/payment/api/v1/proceed-to-checkout",
    // ======================================================
    checkCart: "/payout/api/v1/cart-checkout",
    payment: "/payout/api/v1/confirm-checkout",
    requestNumber: "/payout/api/v1/phonenumber-request",
    // ======================================================
    profileMain: "/profile/api/v1/get-profile",
    profileSectionRedirector: `/profile/api/v1/redirector`,
    profileName: "/profile/api/v1/read-write-name",
    profileEmail: "/profile/api/v1/save-email",
    requestResidence: "/profile/api/v1/update-residence",
    requestTown: "/profile/api/v1/update-town",
    liveLocation: "/profile/api/v1/live-location",
    // ==========================================================
    autoMessagePayment: "/auto-message/api/v1/payment-state",
    autoMessageRating: "/auto-message/api/v1/rating",
    autoPaymentReconciliation: `/auto-message/api/v1/payment-reconciliation`,
    // =====================================================================
  },

  urlsIds: {
    categoryId: "s1",
    subCategoryId: "s2",
    sortByMethodId: "s3",
    AllItemsId: "s4",
    addToCartId: "s5",
    proceedToCheckoutId: "s6",
    checkCartId: "pd1",
    // ======================================
    paymentId: "pd2",
    requestNumberId: "pd3",
    // =================================
    profileMainId: "p1",
    profileNameId: "qa2",
    profileEmailId: "qa3",
    liveLocationId: "qa4",
    profileResidenceId: "qa5",
    profileTownId: "qa6",
    profileSectionRedirectorId: "pr",
    // ==================================
    autoMessagePaymentId: "amp2",
    autoMessageRatingId: "amr2",
    autoPaymentReconciliationId: "amp3",
    // ==================================
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    accountToken: process.env.TWILIO_ACCOUNT_TOKEN,
  },
};
