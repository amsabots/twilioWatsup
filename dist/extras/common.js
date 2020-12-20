"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonUtils = /** @class */ (function () {
    function CommonUtils() {
        this.logger = function (message, file, type) {
            if (file === void 0) { file = "index"; }
            if (type === void 0) { type = "info"; }
            console.log("[" + type.toUpperCase() + "] >twilio-Discovery@" + file + ".ts>>> message");
        };
    }
    return CommonUtils;
}());
exports.default = CommonUtils;
