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
var dotenv = __importStar(require("dotenv"));
var express_1 = __importDefault(require("express"));
var ioredis_1 = __importDefault(require("ioredis"));
var cors_1 = __importDefault(require("cors"));
var common_1 = __importDefault(require("./extras/common"));
// main app modules
dotenv.config();
var app = express_1.default();
// App configurations
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default);
//Application variable initialization and assignment
var redisClient;
var utils = new common_1.default();
var _a = process.env, PORT = _a.PORT, REDIS_CONNECTION = _a.REDIS_CONNECTION;
var initAppConnection = function () {
    try {
        redisClient = new ioredis_1.default(REDIS_CONNECTION);
        redisClient.on("connect", function () {
            utils.logger("Redis listening on port " + PORT, "app");
        });
    }
    catch (error) {
        console.log(error);
    }
};
initAppConnection();
