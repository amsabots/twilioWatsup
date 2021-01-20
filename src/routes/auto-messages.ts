import express from "express";
import Common, { IDiscoveryResponse } from "../extras/common";
import Redis from "../config/redis";

const redis = new Redis();
const commonUtils = new Common();

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const payload: IDiscoveryResponse = JSON.parse(<string>req.query.payload);
    redis.phoneNumberId = payload.msisdn;
    const redisStorage = await redis.getRedisRecord();
    await redis.setRedisStorageClient(payload);
    //set whatsapp Number
    commonUtils.sendTo = commonUtils.convertToTwilioNumber(payload.msisdn);
    commonUtils.message = payload.message;
    await commonUtils.sendTwilioWhatsappMessage();
  } catch (error) {
    console.log(error);
  }
});

export { router as AutoMessage };
