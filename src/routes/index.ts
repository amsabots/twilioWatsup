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
  utils.senderPhoneNumber = From;
  redis.phoneNumberId = utils.getPhoneNumber();
  const redisRecord = await redis.getRedisRecord();
  if (NumMedia == 0) {
    //   get urls from config file
    const {
      baseUrl,
      startSession,
      sortByMethod,
      sortParameters,
      AllItems,
      category,
      subCategory,
      addToCart,
      proceedToCheckout,
    } = config.urls;
    const {
      categoryId,
      subCategoryId,
      sortByMethodId,
      sortParametersId,
      AllItemsId,
      addToCartId,
      proceedToCheckoutId,
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
          const previousUrlCall: string = await redisRecord.previousUrlCall.split(
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
            case sortParametersId:
              requestUrl = requestUrl.concat(sortParameters);
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
        console.log(data);
        utils.message = `*Invalid input response*, Please try again and make sure you submit the correct choices shown from the list
        Reply with-:
        *menu*: Main menu
        *start:* View shopping category`;
      }
      await utils.sendTwilioWhatsappMessage();
      await redis.setRedisStorageClient(data);
      utils.logger(
        `Message sent successfully to phoneNumber ${utils.getPhoneNumber()}`
      );
    } catch (error) {
      utils.message =
        "*Operation failed,* Reply with either\n*menu:* To main Menu\n*0:* To previous saved state";
      utils.logger(
        `Message sent successfully to phoneNumber ${utils.getPhoneNumber()}`
      );
    }
  }

  //   end of no media response from whatsapp
});
export { router as twilioRouter };
