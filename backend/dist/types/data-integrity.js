"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZDelete_Meal = exports.ZMeals = exports.ZUser_Updation = exports.ZParams = exports.ZUsers = exports.ZIngredients = void 0;
const zod_1 = require("zod");
exports.ZIngredients = zod_1.z.object({
    name: zod_1.z.string()
});
exports.ZUsers = zod_1.z.object({
    username: zod_1.z.string().min(2),
    password: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
});
exports.ZParams = zod_1.z.object({
    id: zod_1.z.string().min(1),
});
exports.ZUser_Updation = zod_1.z.object({
    username: zod_1.z.string().min(1),
    email: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1)
});
exports.ZMeals = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    imageUrl: zod_1.z.string().optional(),
    userId: zod_1.z.string().min(1)
});
exports.ZDelete_Meal = zod_1.z.object({
    userId: zod_1.z.string().min(1),
});
