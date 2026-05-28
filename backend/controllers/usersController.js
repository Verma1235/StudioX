import jwt from "jsonwebtoken";
import db from "../config/sqlDb.js";
import bcrypt from "bcryptjs";
import { isUserRegistered, isEmpty } from "../middleware/validationhelper.js";
import { sendMail } from "../utils/Email.js";
import { generateOTP } from "../utils/generateOTP.js";
import { passwordValidator } from "../middleware/authMiddleware.js"
let otp = '000000';
// import {Email} from "../utils/Email.js"
const loginController = async (req, res) => {
    try {
        let { email, password, rememberme } = req.body;
        email = email.trim();
        password = password.trim();

        const sql = "SELECT * FROM `users` WHERE EMAIL= ? ";
        db.query(sql, email, async (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (result.length === 0) {
                return res.status(404).send({
                    success: false,
                    message: `${email} is not registered email id !! please siginup first !!`,
                });
            }

            const hashPassword = result[0].PASS;
            const isMatch = await bcrypt.compare(password, hashPassword);


            if (!isMatch) {
                return res.status(401).send({
                    success: false,
                    message: "Invalid password !",
                });
            }

            if (isMatch) {

                // Generate JWT token

                const token = jwt.sign(
                    {
                        id: result[0].ID,
                        email: result[0].EMAIL,
                        role: result[0].ROLE,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: rememberme ? "30d" : "1d" }
                );

                // success response

                res.status(200).send(
                    {
                        success: true,
                        token,
                        action: 1,
                    }
                );
            }
        });
    } catch (err) {

        res.status(500).json({
            message: error.message,
        });

    }
};

// signup controller

const signupController = async (req, res) => {
    const { NAME, EMAIL, PASS, CONFPASS } = req.body;

    try {
        const HASHPASS = await bcrypt.hash(PASS, 10);

        const sql = "INSERT INTO `users` (`NAME`, `EMAIL`, `PASS`, `ROLE`) VALUES (?,?,?,?)";
        db.query(sql, [NAME, EMAIL, HASHPASS, "USER"], (err, result) => {
            if (err) return res.status(500).send({
                sucess: false,
                message: "Server internal errors !!"
            });

            // initialization of options according to role
            const sql_options = "INSERT INTO `options` ( `ID`, `EMAIL`, `AVAILABLE_OPTIONS`, `ROLE`) VALUES (?,?,?,?);";
            try {


                db.query(sql_options, [result.insertId, EMAIL, "11110000", "USER"], (err2, result2) => {
                    if (err2) return res.status(500).send({
                        success: true,
                        message: "Signup successfully but role assign error !! signup",
                        id: result.insertId
                    });

                    res.send({
                        sucess: true,
                        message: "Signup sucessfully",
                        id: result.insertId
                    });

                });


            } catch (error) {

                res.send({
                    sucess: true,
                    message: "Signup sucessfully",
                    id: result.insertId,
                    error: error,
                });

            }

            // res.send({
            //     sucess: true,
            //     message: "Signup sucessfully",
            //     id: result.insertId
            // });
        });


    } catch (error) {

        return res.status(500).send({
            sucess: false,
            message: "Internal Server errors !!",
            error
        })

    }

}

const sendOTPEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const checkEmail = isEmpty(email);
        if (checkEmail) {
            return res.status(404).send({
                success: false,
                messahe: "Please enter any email id"
            })
        }
        const result = await isUserRegistered(email);
        if (result !== true) {
            return res.status(401).send({
                success: false,
                message: "This email is not registered !! please enter valid email"
            })
        }
        if (result == 2) {
            return res.status(500).send({
                success: false,
                message: "Server internal error occours !!"
            })
        }

        otp = await generateOTP();
        // Run function
        let newEmail = {
            email: email,
            otp: otp,
            text: "Your 6-digits Verification code is ",

        }
        sendMail(newEmail).catch(console.error);

        res.status(200).send({
            success: true,
            message: "6-Digits Verification code sent to your email id "
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in sending verification code "
        })

    }
}

const verifyOTP = (req, res) => {
    try {
        const { OTP } = req.body;

        const checkOTP = isEmpty(OTP);
        if (checkOTP) return res.status(401).send({ success: false, message: "Please enter 6 digits verification code, i.e sent to your email id !!" });

        if (OTP === otp && otp !== "000000") {
            res.status(200).send({
                success: true,
                message: "Code verified successfully !!",
            });

        } else {
            res.status(401).send({
                success: false,
                message: "Wrong verification code !!",
            });
        }


    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in  verifing code "
        })

    }

}

const changePassword = async (req, res) => {
    // console.log(req.body);
    const { email, newPassword, } = req.body;
    try {
        if (!isUserRegistered(email)) {
            return res.status(401).send({
                success: false,
                message: "This email is not registered"
            })
        }
        const hashedPass = await bcrypt.hash(newPassword, 10)
        const sql = "UPDATE `users` SET `PASS`= ? WHERE `EMAIL`= ?";
        db.query(sql, [hashedPass, email], (err, result) => {

            if (err) return res.status(500).send({ success: false, message: "Password uopdation error !!", error: err });
            if (result.affectedRows === 0) {
                res.status(406).send({ success: false, message: "Password Updation Error ! " });
                return;
            }
            res.status(200).send({ success: true, message: "Successfully password are changed " });

        })

    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })

    }
}

export { loginController, signupController, sendOTPEmail, verifyOTP, changePassword };