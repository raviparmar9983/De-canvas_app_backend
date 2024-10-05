"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const user_model_1 = __importDefault(require("./models/user.model"));
const type_1 = require("./constants/type");
const user_service_1 = __importDefault(require("./services/user.service"));
const aeiou_model_1 = __importDefault(require("./models/aeiou.model"));
const aeiou_service_1 = __importDefault(require("./services/aeiou.service"));
const auth_middleware_1 = require("./middlerware/auth.middleware");
const project_model_1 = __importDefault(require("./models/project.model"));
const project_service_1 = __importDefault(require("./services/project.service"));
const project_middleware_1 = require("./middlerware/project.middleware");
const ideation_model_1 = __importDefault(require("./models/ideation.model"));
const empath_model_1 = __importDefault(require("./models/empath.model"));
const produc_dev_model_1 = __importDefault(require("./models/produc_dev.model"));
const empathy_service_1 = require("./services/empathy.service");
const ideation_service_1 = __importDefault(require("./services/ideation.service"));
const productDev_service_1 = require("./services/productDev.service");
require("./controller/empathy.controller");
require("./controller/productDev.controller");
require("./controller/user.controller");
require("./controller/aeiou.controller");
require("./controller/project.controller");
require("./controller/ideation.controller");
const container = new inversify_1.Container();
//MODELS
container.bind(type_1.TYPES.UserModel).toConstantValue(user_model_1.default);
container.bind(type_1.TYPES.aeiouModel).toConstantValue(aeiou_model_1.default);
container.bind(type_1.TYPES.projectModel).toConstantValue(project_model_1.default);
container.bind(type_1.TYPES.ideationModel).toConstantValue(ideation_model_1.default);
container.bind(type_1.TYPES.productDevModel).toConstantValue(produc_dev_model_1.default);
container.bind(type_1.TYPES.empathyModel).toConstantValue(empath_model_1.default);
// SERVICE
container.bind(type_1.TYPES.UserService).to(user_service_1.default);
container.bind(type_1.TYPES.aeiouService).to(aeiou_service_1.default);
container.bind(type_1.TYPES.prjectservice).to(project_service_1.default);
container.bind(type_1.TYPES.ideationService).to(ideation_service_1.default);
container.bind(type_1.TYPES.productDevService).to(productDev_service_1.ProductDevService);
container.bind(type_1.TYPES.empathyService).to(empathy_service_1.EmapthyService);
//MIDDLEWARE
container.bind(type_1.TYPES.projectAuthenticatorMiddlerWare).to(project_middleware_1.ProjectAuthenticatorMiddlerWare);
container.bind(type_1.TYPES.AuthenticationMiddleware).to(auth_middleware_1.AuthenticateMiddlerWare);
exports.default = container;
