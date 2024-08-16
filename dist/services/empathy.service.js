"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.EmapthyService = void 0;
const inversify_1 = require("inversify");
const mongoose_1 = __importDefault(require("mongoose"));
const type_1 = require("../constants/type");
let EmapthyService = class EmapthyService {
    constructor(_emparhyModel) {
        this._emparhyModel = _emparhyModel;
    }
    createEmpathy(userId, projectId, empathy) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield this._emparhyModel.findOne({ projectId });
            if (exist) {
                return yield this._emparhyModel.updateOne({ projectId }, Object.assign({}, empathy), { runValidators: true });
            }
            empathy.userId = new mongoose_1.default.Types.ObjectId(userId);
            empathy.projectId = new mongoose_1.default.Types.ObjectId(projectId);
            return yield this._emparhyModel.create(empathy);
        });
    }
    getEmpathy(projectId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._emparhyModel.aggregate([
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
};
exports.EmapthyService = EmapthyService;
exports.EmapthyService = EmapthyService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(type_1.TYPES.empathyModel)),
    __metadata("design:paramtypes", [mongoose_1.default.Model])
], EmapthyService);
