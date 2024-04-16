"use strict";
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
exports.deleteUser = exports.updateUser = exports.loginUser = exports.createUser = void 0;
const data_integrity_1 = require("../types/data-integrity");
const database_1 = require("../database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let validateRequestBody = data_integrity_1.ZUsers.safeParse(req.body);
        if (!(validateRequestBody === null || validateRequestBody === void 0 ? void 0 : validateRequestBody.success)) {
            return res.status(400).send({ message: "Please send valid data" });
        }
        let existingUser = yield database_1.prisma.user.findFirst({
            where: {
                email: req.body.email,
            },
        });
        if (!existingUser) {
            yield database_1.prisma.user.create({
                data: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                },
            });
            return res.status(201).send({
                message: "User created",
            });
        }
        return res.status(409).send({ message: "User already exists" });
    }
    catch (error) {
        return res.status(500).send({ error });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let validateRequestBody = data_integrity_1.ZUsers.safeParse(req.body);
        if (!(validateRequestBody === null || validateRequestBody === void 0 ? void 0 : validateRequestBody.success)) {
            return res.status(400).send({ message: "Please send valid data" });
        }
        let existingUser = yield database_1.prisma.user.findFirst({
            where: {
                email: req.body.email,
                password: req.body.password,
            },
        });
        if (existingUser) {
            const token = jsonwebtoken_1.default.sign({ email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email }, process.env.SECRET_KEY, { expiresIn: "1m" });
            const refreshToken = jsonwebtoken_1.default.sign({ email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email }, process.env.SECRET_KEY, { expiresIn: "2m" });
            return res.status(201).send({
                message: "User logged-in successfully",
                id: existingUser === null || existingUser === void 0 ? void 0 : existingUser.id,
                email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email,
                token,
                refreshToken,
            });
        }
        return res.status(401).send({ message: "User doesn't exist" });
    }
    catch (error) {
        return res.status(500).send({ error });
    }
});
exports.loginUser = loginUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let validateParams = data_integrity_1.ZParams.safeParse(req.params);
        let validateRequestBody = data_integrity_1.ZUser_Updation.safeParse(req.body);
        if (!(validateParams === null || validateParams === void 0 ? void 0 : validateParams.success) || !(validateRequestBody === null || validateRequestBody === void 0 ? void 0 : validateRequestBody.success)) {
            return res.status(400).send({ message: "Please send valid params" });
        }
        let varifyUser = yield database_1.prisma.user.findUnique({
            where: {
                id: Number((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id),
                email: req.email,
            },
        });
        if (varifyUser) {
            let updatedData = yield database_1.prisma.user.update({
                where: {
                    id: Number((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id),
                },
                data: Object.assign({}, req.body),
            });
            if (req === null || req === void 0 ? void 0 : req.regenerateToken) {
                return res.status(200).send({
                    message: "Updated Successfully",
                    token: req.token,
                    refreshToken: req.refreshToken,
                    email: updatedData === null || updatedData === void 0 ? void 0 : updatedData.email,
                    username: updatedData === null || updatedData === void 0 ? void 0 : updatedData.username,
                    password: updatedData === null || updatedData === void 0 ? void 0 : updatedData.password,
                });
            }
            return res.status(200).send({
                message: "Updated Successfully",
                email: updatedData === null || updatedData === void 0 ? void 0 : updatedData.email,
                username: updatedData === null || updatedData === void 0 ? void 0 : updatedData.username,
                password: updatedData === null || updatedData === void 0 ? void 0 : updatedData.password,
            });
        }
        return res.status(401).send({ message: "UnAuthorised" });
    }
    catch (error) {
        return res.status(500).send({ error });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        let validateParams = data_integrity_1.ZParams.safeParse(req.params);
        if (!(validateParams === null || validateParams === void 0 ? void 0 : validateParams.success)) {
            return res.status(400).send({ message: "Please send valid params" });
        }
        let varifyData = yield database_1.prisma.user.findFirst({
            where: {
                id: Number((_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id),
                email: req.email,
            },
        });
        if (varifyData) {
            yield database_1.prisma.user.delete({
                where: {
                    id: Number((_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.id)
                }
            });
            return res.status(200).send({
                message: " User deleted successfully"
            });
        }
        return res.status(401).send({ message: "UnAuthorised" });
    }
    catch (error) {
        return res.status(500).send({ error });
    }
});
exports.deleteUser = deleteUser;
