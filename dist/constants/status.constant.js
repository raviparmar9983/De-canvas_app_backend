"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCode_1 = __importDefault(require("../enum/statusCode"));
const StatusConstants = {
    BAD_REQUEST: {
        httpStatusCode: statusCode_1.default.BAD_REQUEST,
        body: {
            code: 'bad_request',
            message: 'Page Number not valid',
        },
    },
    DUPLICATE_KEY_VALUE: {
        httpStatusCode: statusCode_1.default.CONFLICT,
        body: {
            code: 'duplicate_key_value',
            message: 'Value already existed',
        },
    },
    INTERNAL_SERVER_ERROR: {
        httpStatusCode: statusCode_1.default.INTERNAL_SERVER_ERROR,
        body: {
            code: 'internal_server_error',
            message: 'Something went wrong, please try again later.',
        },
    },
    NOT_FOUND: {
        httpStatusCode: statusCode_1.default.NOT_FOUND,
        body: {
            code: 'not_found',
            message: 'Data Not Found',
        },
    },
    RESOURCE_NOT_FOUND: {
        httpStatusCode: statusCode_1.default.NOT_FOUND,
        body: {
            code: 'resource_not_found',
            message: 'Requested resource not found.',
        },
    },
    RESOURCE_ALREADY_EXISTS: {
        httpStatusCode: statusCode_1.default.CONFLICT,
        body: {
            code: 'resource_already_exists',
            message: 'Requested resource already exists.',
        },
    },
    FORBIDDEN: {
        httpStatusCode: statusCode_1.default.FORBIDDEN,
        body: {
            code: 'forbidden',
            message: 'Permission denied.',
        },
    },
    UNAUTHORIZED: {
        httpStatusCode: statusCode_1.default.UNAUTHORIZED,
        body: {
            code: 'unauthorized',
            message: 'You are not authorized.',
        },
    },
    TOKEN_EXPIRED: {
        httpStatusCode: statusCode_1.default.UNAUTHORIZED,
        body: {
            code: 'token_expired',
            message: 'Provided authorization token has expired. Please renew the token with the provider entity.',
        },
    },
    CONFLICT: {
        httpStatusCode: statusCode_1.default.CONFLICT,
        body: {
            code: 'conflict',
            message: 'Duplicate resource',
        },
    },
    INVALID_DATA: {
        httpStatusCode: statusCode_1.default.BAD_REQUEST,
        body: {
            code: 'invalid_data',
            message: 'Provided arguments are invalid or do not exist',
        },
    },
    NOT_IMPLEMENTED: {
        httpStatusCode: statusCode_1.default.NOT_IMPLEMENTED,
        body: {
            code: 'not_implemented',
            message: 'Server does not support the functionality required to fulfill the request.',
        },
    },
    UNPROCESSABLE: {
        httpStatusCode: statusCode_1.default.UNPROCESSABLE_ENTITY,
        body: {
            code: 'unprocessable',
            message: 'The request is unable to be processed.',
        },
    },
    PERMISSION_DENIED: {
        httpStatusCode: statusCode_1.default.FORBIDDEN,
        body: {
            code: 'permission_denied',
            message: 'Permission denied.',
        },
    },
};
exports.default = StatusConstants;
