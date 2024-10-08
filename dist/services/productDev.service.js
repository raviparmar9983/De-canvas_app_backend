"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDevService = void 0;
const inversify_1 = require("inversify");
const mongoose_1 = __importStar(require("mongoose"));
const type_1 = require("../constants/type");
const custome_Error_1 = __importDefault(require("../utils/custome.Error"));
const generatePDF_1 = require("../utils/generatePDF");
const status_constant_1 = __importDefault(require("../constants/status.constant"));
const productDev_template_1 = require("../templates/productDev.template");
let ProductDevService = class ProductDevService {
    constructor(_productDevModel) {
        this._productDevModel = _productDevModel;
    }
    createProductDev(userId, projectId, productDev) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield this._productDevModel.findOne({ projectId });
            if (exist) {
                return yield this._productDevModel.updateOne({ projectId }, Object.assign({}, productDev), { runValidators: true });
            }
            productDev.userId = new mongoose_1.Types.ObjectId(userId);
            productDev.projectId = new mongoose_1.Types.ObjectId(projectId);
            return yield this._productDevModel.create(Object.assign(Object.assign({}, productDev), { userId, projectId }));
        });
    }
    getProductDev(projectId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._productDevModel.aggregate([
                {
                    $match: {
                        projectId
                    }
                },
                {
                    $lookup: {
                        from: 'projects',
                        localField: 'projectId',
                        foreignField: '_id',
                        as: 'project'
                    }
                },
                {
                    $replaceRoot: {
                        newRoot: { $mergeObjects: [{ $first: '$project' }, '$$ROOT'] }
                    }
                },
                {
                    $project: {
                        project: 0,
                        __v: 0,
                        createdBy: 0,
                        updatedAt: 0,
                        createdAT: 0
                    }
                }
            ]);
        });
    }
    getProductDevPdf(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const canvas = yield this.getProductDev(projectId, '');
                if (canvas.length == 0) {
                    throw new custome_Error_1.default(status_constant_1.default.NOT_FOUND.httpStatusCode, "AEIOU canvas is not found please create first");
                }
                const htmlString = (0, productDev_template_1.generateProductDevelopmentHtmlString)(canvas[0]);
                const PDF = yield (0, generatePDF_1.generatePdf)(htmlString, "A1", 1.8);
                return PDF;
            }
            catch (error) {
            }
        });
    }
};
exports.ProductDevService = ProductDevService;
exports.ProductDevService = ProductDevService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(type_1.TYPES.productDevModel)),
    __metadata("design:paramtypes", [mongoose_1.default.Model])
], ProductDevService);
