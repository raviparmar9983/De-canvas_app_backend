"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const product_developmentSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true,
        default: undefined
    },
    projectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Projects',
        unique: true
    },
    purpose_info: {
        type: [String],
        required: true
    },
    product_expr: {
        type: [String],
        required: true
    },
    customer_revali: {
        type: [String],
        required: true
    },
    product_fun: {
        type: [String],
        required: true
    },
    product_feature: {
        type: [String],
        required: true
    },
    people_info: {
        type: [String],
        required: true
    },
    component_info: {
        type: [String],
        required: true
    },
    reject: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
});
const Product_Development = mongoose_1.default.model("Product_Development", product_developmentSchema);
exports.default = Product_Development;
