"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.regenerateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const regenerateToken = (req, res, next) => {
    try {
        let { refreshtoken } = req.headers;
        let verifiedToken = jsonwebtoken_1.default.verify(refreshtoken, process.env.SECRET_KEY);
        req.regenerateToken = false;
        if (verifiedToken) {
            let token = jsonwebtoken_1.default.sign({ email: verifiedToken === null || verifiedToken === void 0 ? void 0 : verifiedToken.email }, process.env.SECRET_KEY, { expiresIn: "1m" });
            req.token = token;
            req.refreshToken = refreshtoken;
            req.email = verifiedToken === null || verifiedToken === void 0 ? void 0 : verifiedToken.email;
            req.regenerateToken = true;
            next();
        }
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.name) === "TokenExpiredError") {
            return res.status(500).send({ message: "Token expired" });
        }
        return res.status(500).send({ error });
    }
};
exports.regenerateToken = regenerateToken;
const verifyToken = (req, res, next) => {
    try {
        let { authorization, refreshtoken } = req.headers;
        if (!authorization || !refreshtoken) {
            return res.status(401).send({ message: "UnAuthorised" });
        }
        let verifiedToken = jsonwebtoken_1.default.verify(authorization, process.env.SECRET_KEY);
        if (verifiedToken) {
            req.email = verifiedToken === null || verifiedToken === void 0 ? void 0 : verifiedToken.email;
            req.regenerateToken = false;
            next();
        }
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.name) === "TokenExpiredError") {
            (0, exports.regenerateToken)(req, res, next);
            return;
        }
        return res.status(500).send({ error });
    }
};
exports.verifyToken = verifyToken;
