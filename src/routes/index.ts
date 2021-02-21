import express, { request } from "express";
import Common, { IDiscoveryResponse } from "../extras/common";
const router = express.Router();
import config from "../config/config";
import axios from "axios";
import redisUtils from "../config/redis";

const utils = new Common();
const redis = new redisUtils();

interface Params {
  action: string | number;
  msisdn: string;
  previousUrlCall?: string;
}

router.get("/", (req, res) => {
  res.send("Connection is live at this end point");
});

router.post("/api/twilio/", async (req, res) => {
  const { To, From, Body, NumMedia } = req.body;
  console.log(Body);
  utils.sendTo = From;
  redis.phoneNumberId = utils.getPhoneNumber();
  const redisRecord = await redis.getRedisRecord();
  if (NumMedia == 0) {
    //   get urls from config file
    const {
      baseUrl,
      startSession,
      sortByMethod,
      AllItems,
      category,
      subCategory,
      addToCart,
      proceedToCheckout,
      payment,
      profileMain,
      profileName,
      requestNumber,
      liveLocation,
      autoMessagePayment,
      autoMessageRating,
      profileEmail,
      autoPaymentReconciliation,
      profileSectionRedirector,
      requestResidence,
      requestTown,
    } = config.urls;
    const {
      categoryId,
      subCategoryId,
      sortByMethodId,
      AllItemsId,
      addToCartId,
      proceedToCheckoutId,
      paymentId,
      profileMainId,
      profileNameId,
      requestNumberId,
      liveLocationId,
      autoMessagePaymentId,
      autoMessageRatingId,
      profileEmailId,
      autoPaymentReconciliationId,
      profileSectionRedirectorId,
      profileResidenceId,
      profileTownId,
    } = config.urlsIds;
    let params: Params = {
        action: Body.toLowerCase(),
        msisdn: utils.getPhoneNumber(),
      },
      requestUrl = baseUrl;

    if (redisRecord.nextUrlCallId) {
      switch (Body.toLowerCase()) {
        case "menu":
          requestUrl = requestUrl.concat(startSession);
          break;
        case "start":
          requestUrl = requestUrl.concat(category);
          params.action = 1;
          break;
        case "0":
          const previousUrlCall: string = redisRecord.previousUrlCall.split(
            "?"
          )[0];
          params.action = 0;
          requestUrl = requestUrl.concat(previousUrlCall);
          break;
        default:
          switch (redisRecord.nextUrlCallId) {
            case categoryId:
              requestUrl = requestUrl.concat(category);
              break;
            case subCategoryId:
              requestUrl = requestUrl.concat(subCategory);
              break;
            case sortByMethodId:
              requestUrl = requestUrl.concat(sortByMethod);
              break;
            case AllItemsId:
              requestUrl = requestUrl.concat(AllItems);
              break;
            case subCategoryId:
              requestUrl = requestUrl.concat(subCategory);
              break;
            case addToCartId:
              requestUrl = requestUrl.concat(addToCart);
              break;
            case proceedToCheckoutId:
              requestUrl = requestUrl.concat(proceedToCheckout);
              break;
            case paymentId:
              requestUrl = requestUrl.concat(payment);
              break;
            case profileMainId:
              requestUrl = requestUrl.concat(profileMain);
              break;
            case profileNameId:
              requestUrl = requestUrl.concat(profileName);
              break;
            case requestNumberId:
              requestUrl = requestUrl.concat(requestNumber);
              break;
            case liveLocationId:
              params.action = req.body;
              requestUrl = requestUrl.concat(liveLocation);
              break;
            case autoMessagePaymentId:
              requestUrl = requestUrl.concat(autoMessagePayment);
              break;
            case autoMessageRatingId:
              requestUrl = requestUrl.concat(autoMessageRating);
              break;
            case profileEmailId:
              requestUrl = requestUrl.concat(profileEmail);
              break;
            case autoPaymentReconciliationId:
              requestUrl = requestUrl.concat(autoPaymentReconciliation);
              break;
            case profileSectionRedirectorId:
              requestUrl = requestUrl.concat(profileSectionRedirector);
              break;
            case profileTownId:
              requestUrl = requestUrl.concat(requestTown);
              break;
            case profileResidenceId:
              requestUrl = requestUrl.concat(requestResidence);
              break;
          }
          break;
      }
    } else {
      requestUrl = requestUrl.concat(startSession);
    }

    try {
      const response = await axios.get(requestUrl, { params });
      const data: IDiscoveryResponse = response.data;
      if (data.statusCode === 200 || data.statusCode === 500) {
        utils.message = data.message;
      } else {
        utils.message = `⚠️ *Invalid input response*, This is an automated system, we serve your request by pre-defined input-:

        *menu* - Reset and Exit to Main Menu`;
      }
      if (data.constructor == Array) {
        console.log("an array");
      } else {
        const send = await utils.sendTwilioWhatsappMessage();
        console.log(send);
      }
      await redis.setRedisStorageClient(data);
      utils.logger(
        `Message sent successfully to phoneNumber ${utils.getPhoneNumber()}`
      );
      return res.send();
    } catch (error) {
      console.log(error);
      utils.message =
        "⚠️ *Operation failed,* Reply with either\n*menu:* To main Menu\n*0:* To previous saved state";
      utils.logger(
        `Message sent successfully to phoneNumber ${utils.getPhoneNumber()}`
      );
    }
  }

  //   end of no media response from whatsapp
});
export { router as twilioRouter };
