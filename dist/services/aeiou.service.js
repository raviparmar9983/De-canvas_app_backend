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
const inversify_1 = require("inversify");
const type_1 = require("../constants/type");
const mongoose_1 = __importStar(require("mongoose"));
const custome_Error_1 = __importDefault(require("../utils/custome.Error"));
const status_constant_1 = __importDefault(require("../constants/status.constant"));
const aeiouTemplate_1 = require("../templates/aeiouTemplate");
const generatePDF_1 = require("../utils/generatePDF");
let AeiouService = class AeiouService {
    constructor(aeoiuModel) {
        this.aeiouModel = aeoiuModel;
    }
    workingonAeiou(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield this.aeiouModel.findOne({ userId });
            const newdata = data;
            if (exist) {
                return yield this.aeiouModel.updateOne({ userId }, Object.assign({}, data), { runValidators: true });
            }
            else {
                newdata.userId = new mongoose_1.Types.ObjectId(userId);
                return yield this.aeiouModel.create(newdata);
            }
        });
    }
    getAeiou(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.aeiouModel.aggregate([
                { $match: { userId } },
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
    getAeiouPdf(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const canvas = yield this.getAeiou(userId);
                if (canvas.length == 0) {
                    throw new custome_Error_1.default(status_constant_1.default.NOT_FOUND.httpStatusCode, "AEIOU canvas is not found please create first");
                }
                const htmlString = (0, aeiouTemplate_1.generateHtmlString)(canvas[0]);
                const PDF = yield (0, generatePDF_1.generatePdf)(htmlString, 'A2', 1.8, true);
                return PDF;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
AeiouService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(type_1.TYPES.aeiouModel)),
    __metadata("design:paramtypes", [mongoose_1.default.Model])
], AeiouService);
exports.default = AeiouService;
