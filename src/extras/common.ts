import twilio from "twilio";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";
import config from "../config/config";
import { twilioRouter } from "../routes";

export interface RedisStorage {
  sessionId: string;
  nextUrlCallId: string;
  previousUrlCall: string;
}

export interface IDiscoveryResponse {
  sessionId?: string | null;
  message?: string | null;
  statusCode?: number | null;
  msisdn?: string | null;
  errorMessage?: string | null;
  nextStepId?: string | null;
  previousUrlCall?: string | null;
  imageUrl?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

// const init
const { accountSid, accountToken } = config.twilio;
const client = twilio(accountSid, accountToken);

export default class CommonUtils {
  message: string;
  sendTo: string;
  receivedFrom: string;

  logger = (message: string | {}, file = "index", type = "info"): void => {
    console.log(
      `\x1b[35m[TwilioDiscovery::${type.toUpperCase()}]\x1b[0m > \x1b[2m${this.getTime()}\x1b[0m [${file}.ts] ***\x1b[32m ${message}\x1b[0m ***`
    );
  };

  private getTime = (): string => {
    let today: string;
    const date = new Date();
    today = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return today;
  };

  convertToTwilioNumber = (number: string): string => {
    let twilioNumber: string = "";
    twilioNumber = `whatsapp:+${number}`;
    return twilioNumber;
  };

  getPhoneNumber = (): string => {
    const toBrokeToArray: string[] = this.sendTo.split(":");
    return toBrokeToArray[1].replace("+", "");
  };

  sendTwilioWhatsappMessage = (): Promise<MessageInstance> => {
    try {
      const message = client.messages.create({
        to: this.sendTo,
        from:
          this.receivedFrom ||
          this.convertToTwilioNumber(<string>process.env.TWILIO_NUMBER),
        body: this.message,
      });
      return message;
    } catch (error) {
      throw error;
    }
  };

  sendTwilioMediaMesssage = (mediaUrl: string) => {
    try {
      const message = client.messages.create({
        to: this.sendTo,
        from:
          this.receivedFrom ||
          this.convertToTwilioNumber(<string>process.env.TWILIO_NUMBER),
        body: this.message,
        mediaUrl: [mediaUrl],
      });
      return message;
    } catch (error) {
      throw error;
    }
  };
  sendTwilioLocationInfo = (longitude: number, latitude: number) => {
    try {
      const message = client.messages.create({
        to: this.sendTo,
        from:
          this.receivedFrom ||
          this.convertToTwilioNumber(<string>process.env.TWILIO_NUMBER),
        body: this.message,
        persistentAction: `geo:${latitude},${longitude}`,
      });
      return message;
    } catch (error) {
      throw error;
    }
  };
}
