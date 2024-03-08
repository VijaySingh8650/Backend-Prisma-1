
import express from 'express';
import dotenv from "dotenv";
dotenv.config();    // for .env variables
import { handleErrors, invalidAPI } from './global-errors';
import IngredientsRouter from "./routers/ingredients.router";
import UserRouter from "./routers/user.router";

const app = express();
app.use(express.json()); // to parse the request body into js object

app.use("/api", IngredientsRouter);
app.use("/api", UserRouter);

app.use("*", invalidAPI);
app.use(handleErrors);

app.listen(process.env.Port, ()=>{
    console.log(`Server is running at ${process.env.Port}`)
});



