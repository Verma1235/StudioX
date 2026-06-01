import db from "../config/sqlDb.js";
import { isUserRegistered } from "./validationhelper.js";
import { isEmpty } from "./validationhelper.js";
class Settings {
    constructor(email = '', role = 'USER') {
        this.role = role;
        this.email = email;
    }

    #fetchSettingsData = async () => {
        return await new Promise((resolve, reject) => {
            try {
                const sql = "SELECT * FROM `settings` where settings_id=?";
                db.query(sql, [1], (err, result) => {

                    if (err) {
                        reject({
                            success: false,
                            message: "Error occours in doing query to fetch settings ",
                            error: err,
                        });
                    }
                    resolve({
                        success: true,
                        message: "settings fetched successfully from database ",
                        data: result,
                    })

                })

            } catch (error) {
                console.log("ERROR OCCOURS IN fetchingSettings in backend/middleware/checkSettings.js ");
                reject({
                    success: false,
                    message: "Server error in fetching StudioX settings",
                    error
                });
            }
        })
    }

    #fetchRole = async () => {
        const chkReg = await isUserRegistered(this.email);
        if (!chkReg) {
            return { success: false, message: "This Email is not registered !!" };
        }
        return new Promise((resolve, reject) => {

            try {
                const sql = "SELECT ROLE,SETTINGS FROM `users` WHERE EMAIL=?";
                db.query(sql, [this.email], (err, result) => {
                    if (err) {
                        reject({
                            success: false,
                            message: "Error in fetching settings",
                            error: err,
                        })
                    }

                    resolve({
                        success: true,
                        message: "Role fetched successfully !!",
                        data: result[0],
                    });
                });
            } catch (error) {
                reject({
                    success: false,
                    message: "Error in fetching settings",
                    error: error,
                })
            }
        })
    }

    checkLogin = async () => {

        try {
            const roleRes = await this.#fetchRole();
            if (roleRes.success == false) {
                return {
                    success: false,
                    message: roleRes?.message || "Unable to Proccess your data, sorry !!"
                }
            }
            // console.log("FETCHROLE:", roleRes); ///all things works here correctly !! 

            let roleName = `${roleRes?.data?.ROLE.toLowerCase()}_login`;

            // console.log("ROLE chk:", roleName);
            const res = await this.#fetchSettingsData();
            // console.log("LOGIN Allow:", res?.data[0][roleName]);

            if (res?.success == true) {
                return {
                    success: true,
                    message: "Login data successfully fetched !!",
                    action: res?.data[0][roleName],
                };
            } else {
                return {
                    success: false,
                    message: "Login data unable to fatch for this user",
                    action: 0
                };
            }

        } catch (error) {
            console.log("ERRORS OCCOURS IN Catch section of database/middleware/checksettings/checklogin:");
            return {
                success: false,
                message: "Error occurs while procesing client settings authorizations ",
                action: 0,
                error: error
            };
        }


    }
    checkSignup = async () => {
        try {
            const res = await this.#fetchSettingsData();

            if (!res.success) {
                return {
                    success: false,
                    message: "Internal Server error occurs"
                };
            }

            return {
                success: true,
                message: "Signup data successfully fetched !!",
                action: res?.data[0]?.signup,
            };

        } catch (error) {
            console.log(
                "ERRORS OCCOURS IN Catch section of database/middleware/checksettings/checksignup:"
            );

            return {
                success: false,
                message: "Internal Server error occurs",
                error
            };
        }
    };

}


// FETCHROLE: {
//   success: true,
//   message: 'Role fetched successfully !!',
//   data: { ROLE: 'DEVELOPER', SETTINGS: '1111' }
// }
// FETCHSETTINGS: undefined
// LOGIN CHECK: undefined


export default Settings;