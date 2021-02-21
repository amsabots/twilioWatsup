"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCallback = void 0;
var express_1 = __importDefault(require("express"));
var router = express_1.default();
exports.StatusCallback = router;
router.post("/whatsapp/status", function (req, res) {
    console.log("STATUS CALLBACK", req.body);
});
