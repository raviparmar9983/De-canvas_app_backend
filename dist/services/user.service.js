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
const inversify_1 = require("inversify");
const mongoose_1 = __importDefault(require("mongoose"));
const type_1 = require("../constants/type");
const status_constant_1 = __importDefault(require("../constants/status.constant"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const custome_Error_1 = __importDefault(require("../utils/custome.Error"));
const email_1 = __importDefault(require("../utils/email"));
const email_verification_1 = __importDefault(require("../models/email.verification"));
const crypto_1 = __importDefault(require("crypto"));
const templates_1 = require("../templates");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    createUser(user, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, confirmPassword } = user;
            const exitst = yield this.userModel.findOne({ email }).session(session);
            if (exitst && exitst.isVerified) {
                throw new custome_Error_1.default(status_constant_1.default.RESOURCE_ALREADY_EXISTS.httpStatusCode, `use with this ${email} already exist`);
            }
            if (exitst && !exitst.isVerified) {
                return yield exitst.otpGenerat();
            }
            const newUser = yield this.userModel.create([{ name, email, password, confirmPassword }], { session });
            const token = crypto_1.default.randomBytes(32).toString('hex');
            const otpToken = crypto_1.default.createHash('sha256').update(token).digest('hex');
            return otpToken;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ email }).select('+password');
            if (!user) {
                throw new custome_Error_1.default(status_constant_1.default.UNAUTHORIZED.httpStatusCode, 'user with this emial  not existt');
            }
            if (!(yield user.comparePassword(password))) {
                throw new custome_Error_1.default(status_constant_1.default.BAD_REQUEST.httpStatusCode, 'password is incorrect');
            }
            if (!user.isVerified)
                throw new custome_Error_1.default(status_constant_1.default.FORBIDDEN.httpStatusCode, 'please verify the email first');
            return jsonwebtoken_1.default.sign({ email }, process.env.SECRET_KEY, { expiresIn: 900000 });
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ email });
            if (!user)
                throw new custome_Error_1.default(status_constant_1.default.NOT_FOUND.httpStatusCode, 'user with this emial not exists');
            if (user && !user.isVerified)
                throw new custome_Error_1.default(status_constant_1.default.FORBIDDEN.httpStatusCode, 'please verify the email');
            const token = yield user.otpGenerat();
            user.passwordForgotToken = token;
            user.passwordTokenExprie = Date.now() + (600000);
            yield user.save({ validateBeforeSave: false });
            const link = `localhost:4200/resetpassword;token=${token}`;
            const option = {
                email,
                subject: 'Your password reset link',
                html: (0, templates_1.resetPaswordTemplate)(link)
            };
            (0, email_1.default)(option);
            return `password reset link send on your registered email`;
        });
    }
    resetPassword(token, password, confirmPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ passwordForgotToken: token, passwordTokenExprie: { $gt: Date.now() } });
            if (!user)
                throw new custome_Error_1.default(status_constant_1.default.NOT_FOUND.httpStatusCode, 'token expired');
            if (user && !user.isVerified)
                throw new custome_Error_1.default(status_constant_1.default.FORBIDDEN.httpStatusCode, 'please verify the email');
            user.password = password;
            user.confirmPassword = confirmPassword;
            user.passwordTokenExprie = undefined;
            user.passwordForgotToken = undefined;
            yield user.save({ validateBeforeSave: true });
            const newToken = jsonwebtoken_1.default.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: 900000 });
            return newToken;
        });
    }
    verifyUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailVerifaction = yield email_verification_1.default.findOne({ token });
            if (!emailVerifaction)
                throw new custome_Error_1.default(status_constant_1.default.NOT_FOUND.httpStatusCode, 'please signup again');
            const user = yield this.userModel.findOne({ email: emailVerifaction.email });
            if (!user)
                throw new custome_Error_1.default(status_constant_1.default.NOT_FOUND.httpStatusCode, 'user not found please signup again');
            user.isVerified = true;
            yield user.save({ validateBeforeSave: false });
            yield email_verification_1.default.deleteOne({ token });
            return jsonwebtoken_1.default.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: 900000 });
        });
    }
};
UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(type_1.TYPES.UserModel)),
    __metadata("design:paramtypes", [mongoose_1.default.Model])
], UserService);
exports.default = UserService;
