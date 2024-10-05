"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || 'Internal Server Error';
    if (process.env.ENV == 'development') {
        res.status(err.status).json({
            name: err.name,
            message: err.message,
            stack: err.stack,
        });
    }
    else {
        res.status(err.status).json({
            name: err.name,
            message: err.message,
        });
    }
};
