"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.twilioRouter = void 0;
var express_1 = require("express");
var common_1 = require("../extras/common");
var router = express_1["default"].Router();
exports.twilioRouter = router;
var config_1 = require("../config/config");
var axios_1 = require("axios");
var redis_1 = require("../config/redis");
var twilio_1 = require("twilio");
var utils = new common_1["default"]();
var redis = new redis_1["default"]();
var _a = config_1["default"].twilio, accountSid = _a.accountSid, accountToken = _a.accountToken;
var client = twilio_1["default"](accountSid, accountToken);
router.get("/", function (req, res) {
    res.send("Connection is live at this end point");
});
router.post("/api/twilio/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, To, From, Body, NumMedia, redisRecord, _b, baseUrl, startSession, sortByMethod, AllItems, category, subCategory, addToCart, proceedToCheckout, payment, profileMain, profileName, requestNumber, liveLocation, autoMessagePayment, autoMessageRating, profileEmail, autoPaymentReconciliation, profileSectionRedirector, requestResidence, requestTown, _c, categoryId, subCategoryId, sortByMethodId, AllItemsId, addToCartId, proceedToCheckoutId, paymentId, profileMainId, profileNameId, requestNumberId, liveLocationId, autoMessagePaymentId, autoMessageRatingId, profileEmailId, autoPaymentReconciliationId, profileSectionRedirectorId, profileResidenceId, profileTownId, params, requestUrl, previousUrlCall, response, data, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, To = _a.To, From = _a.From, Body = _a.Body, NumMedia = _a.NumMedia;
                console.log(Body);
                utils.sendTo = From;
                redis.phoneNumberId = utils.getPhoneNumber();
                return [4 /*yield*/, redis.getRedisRecord()];
            case 1:
                redisRecord = _d.sent();
                if (!(NumMedia == 0)) return [3 /*break*/, 11];
                _b = config_1["default"].urls, baseUrl = _b.baseUrl, startSession = _b.startSession, sortByMethod = _b.sortByMethod, AllItems = _b.AllItems, category = _b.category, subCategory = _b.subCategory, addToCart = _b.addToCart, proceedToCheckout = _b.proceedToCheckout, payment = _b.payment, profileMain = _b.profileMain, profileName = _b.profileName, requestNumber = _b.requestNumber, liveLocation = _b.liveLocation, autoMessagePayment = _b.autoMessagePayment, autoMessageRating = _b.autoMessageRating, profileEmail = _b.profileEmail, autoPaymentReconciliation = _b.autoPaymentReconciliation, profileSectionRedirector = _b.profileSectionRedirector, requestResidence = _b.requestResidence, requestTown = _b.requestTown;
                _c = config_1["default"].urlsIds, categoryId = _c.categoryId, subCategoryId = _c.subCategoryId, sortByMethodId = _c.sortByMethodId, AllItemsId = _c.AllItemsId, addToCartId = _c.addToCartId, proceedToCheckoutId = _c.proceedToCheckoutId, paymentId = _c.paymentId, profileMainId = _c.profileMainId, profileNameId = _c.profileNameId, requestNumberId = _c.requestNumberId, liveLocationId = _c.liveLocationId, autoMessagePaymentId = _c.autoMessagePaymentId, autoMessageRatingId = _c.autoMessageRatingId, profileEmailId = _c.profileEmailId, autoPaymentReconciliationId = _c.autoPaymentReconciliationId, profileSectionRedirectorId = _c.profileSectionRedirectorId, profileResidenceId = _c.profileResidenceId, profileTownId = _c.profileTownId;
                params = {
                    action: Body.toLowerCase(),
                    msisdn: utils.getPhoneNumber()
                }, requestUrl = baseUrl;
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
                            previousUrlCall = redisRecord.previousUrlCall.split("?")[0];
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
                }
                else {
                    requestUrl = requestUrl.concat(startSession);
                }
                _d.label = 2;
            case 2:
                _d.trys.push([2, 10, , 11]);
                return [4 /*yield*/, axios_1["default"].get(requestUrl, { params: params })];
            case 3:
                response = _d.sent();
                data = response.data;
                if (data.statusCode === 200 || data.statusCode === 500) {
                    utils.message = data.message;
                }
                else {
                    utils.message = "\u26A0\uFE0F *Invalid input response*, This is an automated system, we serve your request by pre-defined input-:\n\n        *menu* - Reset and Exit to Main Menu";
                }
                if (!(data.constructor == Array)) return [3 /*break*/, 4];
                console.log("an array");
                return [3 /*break*/, 8];
            case 4:
                if (!!data.imageUrl) return [3 /*break*/, 6];
                utils.logger("Non media message sent to destination " + utils.getPhoneNumber());
                return [4 /*yield*/, utils.sendTwilioWhatsappMessage()];
            case 5: return [2 /*return*/, _d.sent()];
            case 6:
                utils.logger("Media message sent to destination " + utils.getPhoneNumber());
                return [4 /*yield*/, utils.sendTwilioMediaMesssage(data.imageUrl)];
            case 7: return [2 /*return*/, _d.sent()];
            case 8: return [4 /*yield*/, redis.setRedisStorageClient(data)];
            case 9:
                _d.sent();
                return [2 /*return*/, res.send()];
            case 10:
                error_1 = _d.sent();
                console.log(error_1);
                utils.message =
                    "⚠️ *Operation failed,* Reply with either\n*menu:* To main Menu\n*0:* To previous saved state";
                utils.logger("Message sent successfully to phoneNumber " + utils.getPhoneNumber());
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); });
