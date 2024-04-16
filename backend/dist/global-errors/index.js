"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidAPI = exports.handleErrors = void 0;
const handleErrors = (err, req, res, next) => {
    res.status(500).send({
        message: "Something went wrong"
    });
};
exports.handleErrors = handleErrors;
const invalidAPI = (req, res) => {
    res.status(404).send({
        message: "Invalid API"
    });
};
exports.invalidAPI = invalidAPI;
