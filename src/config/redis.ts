import { redisClient } from "../app";
import Common, { RedisStorage, IDiscoveryResponse } from "../extras/common";

const utils = new Common();
export default class RedisClient {
  phoneNumberId: string;
  getRedisRecord = async (): Promise<null | RedisStorage> => {
    try {
      const cursor = ((await redisClient.hgetall(
        this.phoneNumberId
      )) as unknown) as RedisStorage;
      if (cursor) return cursor;
      return null;
    } catch (error) {
      throw error;
    }
  };
  setRedisStorageClient = async (axiosMessage: IDiscoveryResponse) => {
    try {
      const { msisdn, nextStepId, previousUrlCall, sessionId } = axiosMessage;
      const currentRecord = await redisClient.hmset(msisdn, {
        sessionId: sessionId,
        nextUrlCallId: nextStepId,
        previousUrlCall: previousUrlCall,
      });
      redisClient.expire(this.phoneNumberId, 1800);
      const log = await this.getRedisRecord();
      utils.logger(
        "new input data to redis at id:: " + axiosMessage.msisdn,
        "redis"
      );
    } catch (error) {
      throw error;
    }
  };
  resetRedisStorage = async () => {
    try {
      await redisClient.del(this.phoneNumberId);
      utils.logger(
        `${this.phoneNumberId} records has been unset from redis`,
        "redis"
      );
    } catch (error) {
      throw error;
    }
  };
}
