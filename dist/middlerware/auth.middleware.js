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
exports.AuthenticateMiddlerWare = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const mongoose_1 = __importDefault(require("mongoose"));
const type_1 = require("../constants/type");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const status_constant_1 = __importDefault(require("../constants/status.constant"));
const custome_Error_1 = __importDefault(require("../utils/custome.Error"));
let AuthenticateMiddlerWare = class AuthenticateMiddlerWare extends inversify_express_utils_1.BaseMiddleware {
    handler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const authheaders = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                if (!authheaders)
                    throw new custome_Error_1.default(status_constant_1.default.NOT_FOUND.httpStatusCode, 'token missing please login again');
                const payload = jsonwebtoken_1.default.verify(authheaders, process.env.SECRET_KEY);
                const email = payload.email;
                const user = yield this.userModel.findOne({ email });
                if (!user)
                    throw new custome_Error_1.default(status_constant_1.default.FORBIDDEN.httpStatusCode, 'invalid token');
                req.userId = user._id;
                req.email = email;
                req.name = user.name;
                next();
            }
            catch (err) {
                next(err);
            }
        });
    }
};
exports.AuthenticateMiddlerWare = AuthenticateMiddlerWare;
__decorate([
    (0, inversify_1.inject)(type_1.TYPES.UserModel),
    __metadata("design:type", mongoose_1.default.Model)
], AuthenticateMiddlerWare.prototype, "userModel", void 0);
exports.AuthenticateMiddlerWare = AuthenticateMiddlerWare = __decorate([
    (0, inversify_1.injectable)()
], AuthenticateMiddlerWare);
