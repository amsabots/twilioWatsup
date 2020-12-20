declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TWILIO_ACCOUNT_SID: string;
      TWILIO_ACCOUNT_TOKEN: string;
      PORT: string;
      REDIS_CONNECTION: string;
      TWILIO_NUMBER: string;
    }
  }
}

export {};
