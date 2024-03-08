import express from 'express';
import { loginUser, createUser, updateUser, deleteUser } from '../controllers/user.controllers';
import { verifyToken } from '../middlewares';

const app = express.Router();

app.route("/user/sign-up").post(createUser);
app.route("/user/log-in").post(loginUser);
app.route("/user/:id").put(verifyToken, updateUser).delete(verifyToken, deleteUser);



export default app;