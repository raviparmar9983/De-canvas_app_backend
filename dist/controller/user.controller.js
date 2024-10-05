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
const inversify_express_utils_1 = require("inversify-express-utils");
const user_service_1 = __importDefault(require("../services/user.service"));
const inversify_1 = require("inversify");
const type_1 = require("../constants/type");
const status_constant_1 = __importDefault(require("../constants/status.constant"));
const custome_Error_1 = __importDefault(require("../utils/custome.Error"));
const mongoose_1 = __importDefault(require("mongoose"));
const email_verification_1 = __importDefault(require("../models/email.verification"));
const email_1 = __importDefault(require("../utils/email"));
const templates_1 = require("../templates");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            try {
                const { name, email, password, confirmPassword } = req.body;
                if (!name || !email || !password || !confirmPassword) {
                    throw new custome_Error_1.default(400, 'email , name , password and confirmpasword is required');
                }
                const token = yield this.userService.createUser({ name, email, password, confirmPassword }, session);
                const emailsend = yield email_verification_1.default.findOneAndUpdate({ email }, { token }, { session, new: true, upsert: true });
                const link = `localhost:4200/verify;token=${token}`;
                const option = {
                    email,
                    subject: `Verify your account`,
                    html: (0, templates_1.verifyAccountTemplate)(link)
                };
                (0, email_1.default)(option);
                yield session.commitTransaction();
                res.status(200).json({
                    status: 'success',
                    message: 'verification link send on your email'
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
    verify(token, req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token)
                    throw new custome_Error_1.default(status_constant_1.default.RESOURCE_NOT_FOUND.httpStatusCode, 'token is missing');
                const newToken = yield this.userService.verifyUser(token);
                res.status(200).json({
                    status: 'success',
                    token: newToken
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    throw new custome_Error_1.default(status_constant_1.default.BAD_REQUEST.httpStatusCode, 'email and password are required');
                }
                const token = yield this.userService.login(email, password);
                if (!token) {
                    throw new custome_Error_1.default(status_constant_1.default.INTERNAL_SERVER_ERROR.httpStatusCode, 'somthing went wrong');
                }
                res.status(200).json({
                    status: 'suceess',
                    token
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email)
                    return next(new custome_Error_1.default(status_constant_1.default.FORBIDDEN.httpStatusCode, 'email is required'));
                const result = yield this.userService.forgotPassword(email);
                res.status(200).json({
                    result
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    resetPassword(token, req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token)
                    throw new custome_Error_1.default(status_constant_1.default.BAD_REQUEST.httpStatusCode, 'Toekn is missing');
                const { password, confirmPassword } = req.body;
                if (!password || !confirmPassword)
                    throw new custome_Error_1.default(status_constant_1.default.BAD_REQUEST.httpStatusCode, 'password and confrim password is required');
                const newToken = yield this.userService.resetPassword(token, password, confirmPassword);
                res.status(200).json({
                    token: newToken
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpPost)('/signup'),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __param(2, (0, inversify_express_utils_1.next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/verify/:token'),
    __param(0, (0, inversify_express_utils_1.requestParam)('token')),
    __param(1, (0, inversify_express_utils_1.request)()),
    __param(2, (0, inversify_express_utils_1.response)()),
    __param(3, (0, inversify_express_utils_1.next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verify", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/login'),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __param(2, (0, inversify_express_utils_1.next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/forgotpassword'),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __param(2, (0, inversify_express_utils_1.next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgotPassword", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/resetpassword/:token'),
    __param(0, (0, inversify_express_utils_1.requestParam)('token')),
    __param(1, (0, inversify_express_utils_1.request)()),
    __param(2, (0, inversify_express_utils_1.response)()),
    __param(3, (0, inversify_express_utils_1.next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
UserController = __decorate([
    (0, inversify_express_utils_1.controller)('/user'),
    __param(0, (0, inversify_1.inject)(type_1.TYPES.UserService)),
    __metadata("design:paramtypes", [user_service_1.default])
], UserController);
