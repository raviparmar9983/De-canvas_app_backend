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
const inversify_express_utils_1 = require("inversify-express-utils");
const type_1 = require("../constants/type");
const inversify_1 = require("inversify");
const project_service_1 = __importDefault(require("../services/project.service"));
const mongoose_1 = __importStar(require("mongoose"));
const custome_Error_1 = __importDefault(require("../utils/custome.Error"));
const aeiou_model_1 = __importDefault(require("../models/aeiou.model"));
const ideation_model_1 = __importDefault(require("../models/ideation.model"));
const produc_dev_model_1 = __importDefault(require("../models/produc_dev.model"));
const empath_model_1 = __importDefault(require("../models/empath.model"));
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    getProject(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield this.projectService.getProject(req.userId);
                if (!project) {
                    return next(new custome_Error_1.default(404, 'no project found please create it first'));
                }
                res.status(200).json({
                    status: 'success',
                    project
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    createProject(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            try {
                const data = req.body;
                data.userId = new mongoose_1.Types.ObjectId(req.userId);
                const newProject = yield this.projectService.create(data, session);
                yield aeiou_model_1.default.create([{ userId: req.userId, projectId: newProject[0]._id }], { session });
                yield ideation_model_1.default.create([{ userId: req.userId, projectId: newProject[0]._id }], { session });
                yield produc_dev_model_1.default.create([{ userId: req.userId, projectId: newProject[0]._id }], { session });
                yield empath_model_1.default.create([{ userId: req.userId, projectId: newProject[0]._id }], { session });
                yield session.commitTransaction();
                res.status(201).json({
                    status: 'Success',
                    newProject
                });
            }
            catch (err) {
                yield session.abortTransaction();
                next(err);
            }
            finally {
                yield session.endSession();
            }
        });
    }
    updateProject(id, req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const updated = yield this.projectService.update(id, data);
                res.status(200).json({
                    updated
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteProjec(id, req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            try {
                const delere = yield this.projectService.delete(id, session);
                ////// ON PROJECT DELETE DELETE THE CANVAS REFERES TO THAT PROJECT ALSO 
                yield aeiou_model_1.default.deleteOne({ projectId: id }).session(session);
                yield ideation_model_1.default.deleteOne({ projectId: id }).session(session);
                yield produc_dev_model_1.default.deleteOne({ projectId: id }).session(session);
                yield empath_model_1.default.deleteOne({ projectId: id }).session(session);
                yield session.commitTransaction();
                res.status(204).json({
                    message: 'Deleted successfully'
                });
            }
            catch (err) {
                yield session.abortTransaction();
                next(err);
            }
            finally {
                yield session.endSession();
            }
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpGet)('/'),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __param(2, (0, inversify_express_utils_1.next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProject", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/'),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __param(2, (0, inversify_express_utils_1.next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "createProject", null);
__decorate([
    (0, inversify_express_utils_1.httpPatch)('/:id', type_1.TYPES.projectAuthenticatorMiddlerWare),
    __param(0, (0, inversify_express_utils_1.requestParam)('id')),
    __param(1, (0, inversify_express_utils_1.request)()),
    __param(2, (0, inversify_express_utils_1.response)()),
    __param(3, (0, inversify_express_utils_1.next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateProject", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)('/:id', type_1.TYPES.projectAuthenticatorMiddlerWare),
    __param(0, (0, inversify_express_utils_1.requestParam)('id')),
    __param(1, (0, inversify_express_utils_1.request)()),
    __param(2, (0, inversify_express_utils_1.response)()),
    __param(3, (0, inversify_express_utils_1.next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteProjec", null);
ProjectController = __decorate([
    (0, inversify_express_utils_1.controller)('/user/project', type_1.TYPES.AuthenticationMiddleware),
    __param(0, (0, inversify_1.inject)(type_1.TYPES.prjectservice)),
    __metadata("design:paramtypes", [project_service_1.default])
], ProjectController);
