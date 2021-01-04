import { SIGUSR1 } from "constants";

export default {
  urls: {
    startSession: "/index/api/v1/startsession",
    category: "/index/api/v1/category",
    baseUrl: "http://localhost:3000",
    subCategory: "/shopping/api/v1/subcategory",
    sortByMethod: "/shopping/api/v1/sort_by_method",
    sortParameters: "/shopping/api/v1/get_sort_parameters",
    AllItems: "/shopping/api/v1/get-all-items",
    addToCart: "/payment/api/v1/add_to_cart",
    proceedToCheckout: "/payment/api/v1/proceed-to-checkout",
    checkCart: "/payout/api/v1/cart-checkout",
    payment: "/payout/api/v1/confirm-checkout",
    profileMain: "/profile/api/v1/get-profile",
    profileRequestName: "/profile/api/v1/request-name",
    profileName: "/profile/api/v1/read-write-name",
    profileLiveLocation: "/profile/api/v1/",
    requestNumber: "/payout/api/v1/phonenumber-request",
    liveLocation:"/profile/api/v1/live-location"
  },

  urlsIds: {
    categoryId: "s1",
    subCategoryId: "s2",
    sortByMethodId: "s3",
    sortParametersId: "s4",
    AllItemsId: "s5",
    addToCartId: "s6",
    proceedToCheckoutId: "s7",
    checkCartId: "pd1",
    paymentId: "pd2",
    requestNumberId: "pd3",
    profileMainId: "p1",
    requestNameId: "p2",
    profileNameId: "qa2",
    liveLocationId:"qa3"
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    accountToken: process.env.TWILIO_ACCOUNT_TOKEN,
  },
};
