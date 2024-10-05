"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const emailVerification = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    }
});
const EmailVerification = mongoose_1.default.model('EmailVerification', emailVerification);
exports.default = EmailVerification;
