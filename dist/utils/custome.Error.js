"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomeError extends Error {
    constructor(_status, message) {
        super(message);
        this.status = _status;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = CustomeError;
