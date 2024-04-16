"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user.controllers");
const middlewares_1 = require("../middlewares");
const app = express_1.default.Router();
app.route("/user/sign-up").post(user_controllers_1.createUser);
app.route("/user/log-in").post(user_controllers_1.loginUser);
app.route("/user/:id").put(middlewares_1.verifyToken, user_controllers_1.updateUser).delete(middlewares_1.verifyToken, user_controllers_1.deleteUser);
exports.default = app;
