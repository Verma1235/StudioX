
import Settings from "./checkSettings.js";

const settingsMiddleware = (target = '') => {
    return async (req, res, next) => {

        switch (target.toLowerCase()) {
            case 'login':
                try {
                    const { email } = req.body;
                    const setting = new Settings(email);
                    const settingRes = await setting.checkLogin();
                    console.log("LOGIN CHECK:", settingRes);
                    if (settingRes?.success == true) {
                        if (settingRes?.action == 0) {
                            res.send({
                                success: false,
                                message: "Login Not Allowed !! Temporarly Login Blocked"
                            });
                        }
                        if (settingRes?.action == 1) {
                            next();
                        }
                    } else {
                        res.send({
                            success: false,
                            message: "Server Error !! try agin later after an hours ",
                        });
                    }

                } catch (error) {
                    console.log("ERROR Log:", error);
                    res.send({
                        success: false,
                        message: "Error occours while processing your request !! Plese try agin in few minutes or an hours",
                        error: error,
                    });

                }
                break;
            case 'signup':
                try {
                    const setting = new Settings();
                    const settingRes = await setting.checkSignup();

                    if (settingRes?.success == false) {
                        res.send({
                            success: false,
                            message: "New Account Signup blocked by the Owner || DUE TO Some Technical issues"
                        })
                    }
                    if (settingRes?.success == true) {
                        if (settingRes?.action == 1) {
                            next();
                        } else {
                            res.send({
                                success: false,
                                message: "New Account Signup blocked by the Owner"
                            })
                        }
                    }
                } catch (error) {
                    console.log("ERROR OCCOURS AT backend/middleware/settingsMiddlerware in signup section ");
                    res.send({
                        success: false,
                        message: "New Account Signup blocked by the Owner || DUE TO Some Technical issues"
                    })
                }
                break;
            default:
                console.log("DEFAULT ARE RUNNING : allowed ");
                next();
                break;

        }

    }
}


export default settingsMiddleware;