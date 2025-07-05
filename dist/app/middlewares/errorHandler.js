"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    if (err.name === 'ValidationError') {
        statusCode = 400;
        return res.status(statusCode).json({
            message: "Validation failed",
            success: false,
            error: {
                name: err.name,
                errors: err.errors
            }
        });
    }
    if (err.name === 'NotFoundError' || err.message.includes('not found')) {
        statusCode = 404;
    }
    return res.status(statusCode).json({
        message: err.message || "Something went wrong",
        success: false,
        error: err
    });
};
exports.errorHandler = errorHandler;
