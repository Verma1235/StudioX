import express from "express";
import {} from "../controllers/generalControllers.js"
const router = express.Router();
import loginMiddleware  from "../middleware/loginMiddleware.js";
import {loginController,signupController} from "../controllers/usersController.js";
import signupMiddleware from "../middleware/signupMiddleware.js";


router.post("/login",loginMiddleware,loginController);

router.post("/signup",signupMiddleware,signupController);

export default router;