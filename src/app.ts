import * as dotenv from "dotenv";
dotenv.config();
import express, { Application, NextFunction, Response, Request } from "express";
import ioredis from "ioredis";
import IORedis from "ioredis";
import Common from "./extras/common";
import { twilioRouter } from "./routes/index";
import { AutoMessage } from "./routes/auto-messages";
import { StatusCallback } from "./routes/status";

// main app modules

const app: Application = express();

// App configurations
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Application variable initialization and assignment
let redisClient: IORedis.Redis;
const utils = new Common();
const { PORT, REDIS_CONNECTION } = process.env;

// route management and configurations
app.use("/webhook", twilioRouter);
app.use("/auto-message", AutoMessage);
app.use("/callback", StatusCallback);
app.use((req: Request, res: Response, next: NextFunction) => {
  utils.logger(req.originalUrl);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  if (!req.route)
    throw new Error(
      "The url request by the app does nor exist or is running behind some proxy server"
    );
  return next;
});
const initAppConnection = (): void => {
  try {
    redisClient = new ioredis(REDIS_CONNECTION);
    app.listen(PORT, () => utils.logger(`App listening on port ${PORT}`));
    redisClient.on("connect", () => {
      utils.logger(`Redis listening on port ${REDIS_CONNECTION}`, "app");
    });
  } catch (error) {
    console.log(error);
  }
};

initAppConnection();
export { redisClient };
