"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var twilio_1 = __importDefault(require("twilio"));
var config_1 = __importDefault(require("../config/config"));
// const init
var _a = config_1.default.twilio, accountSid = _a.accountSid, accountToken = _a.accountToken;
var client = twilio_1.default(accountSid, accountToken);
var CommonUtils = /** @class */ (function () {
    function CommonUtils() {
        var _this = this;
        this.logger = function (message, file, type) {
            if (file === void 0) { file = "index"; }
            if (type === void 0) { type = "info"; }
            console.log("\u001B[35m[TwilioDiscovery::" + type.toUpperCase() + "]\u001B[0m > \u001B[2m" + _this.getTime() + "\u001B[0m [" + file + ".ts] ***\u001B[32m " + message + "\u001B[0m ***");
        };
        this.getTime = function () {
            var today;
            var date = new Date();
            today = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            return today;
        };
        this.convertToTwilioNumber = function (number) {
            var twilioNumber = "";
            twilioNumber = "whatsapp:+" + number;
            return twilioNumber;
        };
        this.getPhoneNumber = function () {
            var toBrokeToArray = _this.sendTo.split(":");
            return toBrokeToArray[1].replace("+", "");
        };
        this.sendTwilioWhatsappMessage = function () {
            try {
                var message = client.messages.create({
                    to: _this.sendTo,
                    from: _this.receivedFrom ||
                        _this.convertToTwilioNumber(process.env.TWILIO_NUMBER),
                    body: _this.message,
                });
                return message;
            }
            catch (error) {
                throw error;
            }
        };
        this.sendTwilioMediaMesssage = function (mediaUrl) {
            try {
                var message = client.messages.create({
                    to: _this.sendTo,
                    from: _this.receivedFrom ||
                        _this.convertToTwilioNumber(process.env.TWILIO_NUMBER),
                    body: _this.message,
                    mediaUrl: [mediaUrl],
                });
                return message;
            }
            catch (error) {
                throw error;
            }
        };
        this.sendTwilioLocationInfo = function (longitude, latitude) {
            try {
                var message = client.messages.create({
                    to: _this.sendTo,
                    from: _this.receivedFrom ||
                        _this.convertToTwilioNumber(process.env.TWILIO_NUMBER),
                    body: _this.message,
                    persistentAction: "geo:" + latitude + "," + longitude,
                });
                return message;
            }
            catch (error) {
                throw error;
            }
        };
    }
    return CommonUtils;
}());
exports.default = CommonUtils;
