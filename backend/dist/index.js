"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // for .env variables
const global_errors_1 = require("./global-errors");
const ingredients_router_1 = __importDefault(require("./routers/ingredients.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // to parse the request body into js object
app.use("/api", ingredients_router_1.default);
app.use("/api", user_router_1.default);
app.use("*", global_errors_1.invalidAPI);
app.use(global_errors_1.handleErrors);
app.listen(process.env.Port, () => {
    console.log(`Server is running at ${process.env.Port}`);
});
