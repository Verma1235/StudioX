import express from "express";
import { } from "../controllers/generalControllers.js"
const router = express.Router();
import loginMiddleware from "../middleware/loginMiddleware.js";
import { loginController, signupController, sendOTPEmail, verifyOTP, changePassword } from "../controllers/usersController.js";
import signupMiddleware from "../middleware/signupMiddleware.js";
import { tokenValidator } from "../controllers/apiControllers.js"
import settingsMiddleware from "../middleware/settingsMiddleware.js";


router.post("/login", settingsMiddleware('login') ,loginMiddleware, loginController);
router.post("/signup",settingsMiddleware('signup'), signupMiddleware, signupController);
router.post("/sendotp", sendOTPEmail);
router.post("/verifyotp", verifyOTP);
router.post("/changepassword", changePassword);
router.get("/token", tokenValidator);

export default router;

// {
//   "success": true,
//   "message": "settings fetched successfully from database ",
//   "data": [
//     {
//       "settings_id": 1,
//       "login": 0,
//       "logout": 1,
//       "signup": 1,
//       "user_login": 0,
//       "employee_login": 1,
//       "admin_login": 1,
//       "coadmin_login": 1,
//       "developer_login": 1,
//       "warning_msg": 1,
//       "sms_allow": 1,
//       "notificaton_allow": 1,
//       "socketio_connection": 1
//     }
//   ]
// }

// UPDATE `users` SET `ID`='[value-1]',`NAME`='[value-2]',`EMAIL`='[value-3]',`PASS`='[value-4]',`ROLE`='[value-5]',`SETTINGS`='[value-6]',`PHONE`='[value-7]',`STATUS`='[value-8]' WHERE 1