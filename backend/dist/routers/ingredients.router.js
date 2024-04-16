"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ingredients_controlles_1 = require("../controllers/ingredients.controlles");
const app = express_1.default.Router();
app.route("/ingredients").post(ingredients_controlles_1.createIngredients);
exports.default = app;
