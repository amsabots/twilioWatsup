"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var express_1 = __importDefault(require("express"));
var ioredis_1 = __importDefault(require("ioredis"));
var common_1 = __importDefault(require("./extras/common"));
var index_1 = require("./routes/index");
var auto_messages_1 = require("./routes/auto-messages");
var status_1 = require("./routes/status");
// main app modules
var app = express_1.default();
// App configurations
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//Application variable initialization and assignment
var redisClient;
exports.redisClient = redisClient;
var utils = new common_1.default();
var _a = process.env, PORT = _a.PORT, REDIS_CONNECTION = _a.REDIS_CONNECTION;
// route management and configurations
app.use("/webhook", index_1.twilioRouter);
app.use("/auto-message", auto_messages_1.AutoMessage);
app.use("/callback", status_1.StatusCallback);
// app.use((req: Request, res: Response, next: NextFunction) => {
//   utils.logger(req.originalUrl);
// });
app.use(function (req, res, next) {
    if (!req.route)
        throw new Error("The url requested by the app does not exist or is running behind some proxy/reverse server");
    return next;
});
var initAppConnection = function () {
    try {
        exports.redisClient = redisClient = new ioredis_1.default(REDIS_CONNECTION);
        app.listen(PORT, function () { return utils.logger("App listening on port " + PORT); });
        redisClient.on("connect", function () {
            utils.logger("Redis listening on port " + REDIS_CONNECTION, "app");
        });
    }
    catch (error) {
        console.log(error);
    }
};
initAppConnection();
