import express from "express";
import {} from "../controllers/generalControllers.js"
const router = express.Router();
import loginMiddleware  from "../middleware/loginMiddleware.js";
import {loginController} from "../controllers/usersController.js";


export default router;