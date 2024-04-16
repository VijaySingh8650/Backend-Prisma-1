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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeal = exports.updateMeal = exports.createMeal = exports.getMeal = void 0;
const data_integrity_1 = require("../types/data-integrity");
const database_1 = require("../database");
const getMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let validateParams = data_integrity_1.ZParams.safeParse(req.params);
        if (!(validateParams === null || validateParams === void 0 ? void 0 : validateParams.success)) {
            return res.status(400).send({ message: "Please send valid params" });
        }
        let varifyUser = yield database_1.prisma.user.findUnique({
            where: {
                id: Number(req.params.id)
            },
        });
        if (varifyUser) {
            let allMeals = yield database_1.prisma.meals.findMany({
                where: {
                    userId: Number(req.params.id),
                }
            });
            if (req.regenerateToken) {
                return res.status(200).send({ size: allMeals === null || allMeals === void 0 ? void 0 : allMeals.length, meals: allMeals, token: req.token, refreshToken: req.refreshToken });
            }
            return res.status(200).send({ size: allMeals === null || allMeals === void 0 ? void 0 : allMeals.length, meals: allMeals });
        }
        return res.status(401).send({ message: "UnAuthorised" });
    }
    catch (error) {
        return res.status(500).send({ error });
    }
});
exports.getMeal = getMeal;
const createMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let validateRequestBody = data_integrity_1.ZMeals.safeParse(req.body);
        if (!(validateRequestBody === null || validateRequestBody === void 0 ? void 0 : validateRequestBody.success)) {
            return res.status(400).send({ message: "Please send valid data" });
        }
        let verifyUser = yield database_1.prisma.user.findUnique({
            where: {
                id: req.body.userId
            }
        });
        if (verifyUser) {
            let resp = yield database_1.prisma.meals.create({
                data: Object.assign({}, req.body)
            });
            if (req.regenerateToken) {
                return res.status(200).send({ message: "Meals created successfully", token: req.token, refreshToken: req.refreshToken });
            }
            return res.status(200).send({ message: "Meals created successfully", resp });
        }
        return res.status(401).send({ message: "UnAuthorised" });
    }
    catch (error) {
        return res.status(500).send({ error });
    }
});
exports.createMeal = createMeal;
const updateMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let validateParams = data_integrity_1.ZParams.safeParse(req.params);
        let validateRequestBody = data_integrity_1.ZMeals.safeParse(req.params);
        if (!(validateParams === null || validateParams === void 0 ? void 0 : validateParams.success) || !(validateRequestBody === null || validateRequestBody === void 0 ? void 0 : validateRequestBody.success)) {
            return res.status(400).send({ message: "Please send valid params" });
        }
        let varifyUser = yield database_1.prisma.user.findUnique({
            where: {
                id: Number(req.body.userId)
            },
        });
        if (varifyUser) {
            let updateMeal = yield database_1.prisma.meals.update({
                where: {
                    id: Number(req.params.id),
                },
                data: Object.assign({}, req.body)
            });
            if (req.regenerateToken) {
                return res.status(200).send({ message: "Meal is updated", updateMeal, token: req.token, refreshToken: req.refreshToken });
            }
            return res.status(200).send({ message: "Meal is updated", updateMeal });
        }
        return res.status(401).send({ message: "UnAuthorised" });
    }
    catch (error) {
        return res.status(500).send({ error });
    }
});
exports.updateMeal = updateMeal;
const deleteMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let validateParams = data_integrity_1.ZParams.safeParse(req.params);
        let validateRequestBody = data_integrity_1.ZDelete_Meal.safeParse(req.params);
        if (!(validateParams === null || validateParams === void 0 ? void 0 : validateParams.success) || !(validateRequestBody === null || validateRequestBody === void 0 ? void 0 : validateRequestBody.success)) {
            return res.status(400).send({ message: "Please send valid params" });
        }
        let varifyUser = yield database_1.prisma.user.findUnique({
            where: {
                id: Number(req.body.userId)
            },
        });
        if (varifyUser) {
            let updateMeal = yield database_1.prisma.meals.delete({
                where: {
                    id: Number(req.params.id),
                }
            });
            if (req.regenerateToken) {
                return res.status(200).send({ message: "Meal deleted successfully", updateMeal, token: req.token, refreshToken: req.refreshToken });
            }
            return res.status(200).send({ message: "Meal deleted successfully", updateMeal });
        }
        return res.status(401).send({ message: "UnAuthorised" });
    }
    catch (error) {
        return res.status(500).send({ error });
    }
});
exports.deleteMeal = deleteMeal;
