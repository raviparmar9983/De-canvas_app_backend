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
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const type_1 = require("../constants/type");
const empathy_service_1 = require("../services/empathy.service");
let EmpathyController = class EmpathyController {
    constructor(_empathyService) {
        this._empathyService = _empathyService;
    }
    empathy(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const projectId = req.projectId;
                const empathy = Object.assign({}, req.body);
                const created = yield this._empathyService.createEmpathy(userId, projectId, empathy);
                res.status(200).json({
                    created
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getEmpathy(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const projectId = req.projectId;
                const empathy = yield this._empathyService.getEmpathy(projectId, userId);
                res.status(200).json({
                    data: empathy[0]
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getEmapthyPdf(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const projectId = req.projectId;
                const pdfBuffer = yield this._empathyService.getEmpathyPdf(projectId);
                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename="AEIOU_Summary.pdf"',
                });
                res.send(Buffer.from(pdfBuffer));
            }
            catch (err) {
                throw err;
            }
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpPost)('/'),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __param(2, (0, inversify_express_utils_1.next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], EmpathyController.prototype, "empathy", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/'),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __param(2, (0, inversify_express_utils_1.next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], EmpathyController.prototype, "getEmpathy", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/pdf'),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __param(2, (0, inversify_express_utils_1.next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], EmpathyController.prototype, "getEmapthyPdf", null);
EmpathyController = __decorate([
    (0, inversify_express_utils_1.controller)('/user/empathy', type_1.TYPES.AuthenticationMiddleware, type_1.TYPES.projectAuthenticatorMiddlerWare),
    __param(0, (0, inversify_1.inject)(type_1.TYPES.empathyService)),
    __metadata("design:paramtypes", [empathy_service_1.EmapthyService])
], EmpathyController);
