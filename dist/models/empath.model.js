"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const empathySchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        unique: true,
        default: undefined
    },
    projectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    user: {
        type: [String],
        default: [],
    },
    stackholder: {
        type: [String],
        default: [],
    },
    activities: {
        type: [String],
        default: [],
    },
    happy1: {
        type: [String],
        default: [],
    },
    sad1: {
        type: [String],
        default: [],
    },
    happy2: {
        type: [String],
        default: [],
    },
    sad2: {
        type: [String],
        default: [],
    }
});
exports.default = mongoose_1.default.model("Empathy", empathySchema);
