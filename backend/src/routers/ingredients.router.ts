import express from 'express';
import { createIngredients } from '../controllers/ingredients.controlles';

const app = express.Router();

app.route("/ingredients").post(createIngredients);





export default app;