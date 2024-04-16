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
exports.createIngredients = void 0;
const data_integrity_1 = require("../types/data-integrity");
const database_1 = require("../database");
const createIngredients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let validateRequestBody = data_integrity_1.ZIngredients.safeParse(req.body);
        if (!validateRequestBody.success) {
            return res.status(400).send({ message: "Please send valid data" });
        }
        yield database_1.prisma.ingredients.create({
            data: {
                name: req.body.name
            }
        });
        return res.status(200).send({ message: "Ingredients created" });
    }
    catch (error) {
        return res.status(500).send({
            error
        });
    }
});
exports.createIngredients = createIngredients;
