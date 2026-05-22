import express from "express";
import {} from "../controllers/generalControllers.js"
const router = express.Router();
import loginMiddleware  from "../middleware/loginMiddleware.js";
import {loginController,signupController,sendOTPEmail,verifyOTP,changePassword} from "../controllers/usersController.js";
import signupMiddleware from "../middleware/signupMiddleware.js";


router.post("/login",loginMiddleware,loginController);
router.post("/signup",signupMiddleware,signupController);
router.post("/sendotp",sendOTPEmail);
router.post("/verifyotp",verifyOTP);
router.post("/changepassword",changePassword);
export default router;



// UPDATE `users` SET `ID`='[value-1]',`NAME`='[value-2]',`EMAIL`='[value-3]',`PASS`='[value-4]',`ROLE`='[value-5]',`SETTINGS`='[value-6]',`PHONE`='[value-7]',`STATUS`='[value-8]' WHERE 1