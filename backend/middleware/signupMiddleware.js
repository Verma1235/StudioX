import jwt from "jsonwebtoken";
import { validateEmail, isEmpty, isMatch, validatePassword, isUserRegistered, isDBconnected, isBodyEmpty, validateName } from "./validationhelper.js"

const signupMiddleware = async (req, res, next) => {

    if (isBodyEmpty(req)) {
        return res.status(400).json({
            success: false,
            message: "Request body is empty!",
        });
    }


    let { NAME, EMAIL, PASS, CONFPASS } = req.body;

    try {
        if (!isDBconnected()) {
            return res.status(500).send({
                success: false,
                message: "signup not possible yet !! database not connected !!"
            })

        }
        if (isEmpty(NAME) || isEmpty(EMAIL) || isEmpty(PASS) || isEmpty(CONFPASS)) {

            return res.status(404).send({
                success: false,
                message: "All fields are required !!",
            })
        }

        if (!validateName(NAME)) {
            return res.send({
                success: false,
                message: "Please enter correct name !! This name is not valid",
            })
        }

        if (!validateEmail(EMAIL)) {
            return res.send({
                success: false,
                message: "Please enter correct email !! This email is not valid",
            })
        }


        if (!validatePassword(PASS)) {
            return res.send({
                success: false,
                message: "Password must be at least 6 characters",
            })
        }

        if (!isMatch(PASS, CONFPASS)) {
            return res.status(401).send({
                sucees: false,
                message: "Confirm password does not match !!"
            });
        }



        const UserRegisteredStatus = await isUserRegistered(EMAIL);

        if (UserRegisteredStatus == 2) {
            return res.send({
                success: false,
                message: "Database error !!",
            });
        }

        if (UserRegisteredStatus == true) {
            return res.send({
                success: false,
                message: "This Email id already registered !!",
            });
        }

        next();



    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Server errors",
            error,
        })

    }



}

export default signupMiddleware;