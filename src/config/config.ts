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
  },

  urlsIds: {
    categoryId: "s1",
    subCategoryId: "s2",
    sortByMethodId: "s3",
    sortParametersId: "s4",
    AllItemsId: "s5",
    addToCartId: "s6",
    proceedToCheckoutId: "s7",
  },
  twilio: {
    accountSid:
      process.env.TWILIO_ACCOUNT_SID || "ACb4bfe96169bd3097e0ce5eb79ba2b7b8",
    accountToken:
      process.env.TWILIO_ACCOUNT_TOKEN || "50fd5e8974fb3979b7eccb5368692a0f",
  },
};
