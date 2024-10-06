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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const bodyParser = __importStar(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './src/config.env' });
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_config_1 = __importDefault(require("./inversify.config"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_controller_1 = __importDefault(require("./controller/error.controller"));
const cors_1 = __importDefault(require("cors"));
mongoose_1.default.connect(process.env.CONN_STR).then(() => {
    console.log("connected successfully");
});
const server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.default, null, { rootPath: '/de-canvas' });
server.setConfig((app) => {
    app.use((0, cors_1.default)());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
}).setErrorConfig((app) => {
    app.use(error_controller_1.default);
});
const app = server.build();
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("server startted on");
});
