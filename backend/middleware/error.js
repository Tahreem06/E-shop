const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    //wrong mongoDb id error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    //wrong jwt error
    if (err.name === 'JsonWebTokenError') {
        const message = `Your url is invalid, please try again later`;
        err = new ErrorHandler(message, 400);
    }

    //jwt expire error
    if (err.name === 'TokenExpiredError') {
        const message = `Your url is expired, please try again later`;
        err = new ErrorHandler(message, 400);
    }1

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};