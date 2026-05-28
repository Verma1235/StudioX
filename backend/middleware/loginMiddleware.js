import jwt from "jsonwebtoken";
import { validateEmail, isEmpty, isMatch, validatePassword, isUserRegistered, isDBconnected, isBodyEmpty } from "./validationhelper.js"


// utils/validateEmail.js

const loginMiddleware = (req, res, next) => {
    console.log("incoming request");
    console.log(req?.body);
    if (isBodyEmpty(req)) {
        return res.status(400).json({
            success: false,
            message: "Request body is empty!",
        });
    }
    if (!isDBconnected()) {
        return res.status(500).send({
            success: false,
            message: "login not possible yet !! database not connected !!"
        })

    }

    let { email, password, rememberme } = req.body;
    // console.log(rememberme);

   

        try {
            // get
            if (isEmpty(email) || isEmpty(password)) {
                const data = {
                    success: false,
                    message: "All field are required! ",
                }
                return res.status(401).json(data);
            } else {
                email = email.trim();
                password = password.trim();

            }

            if (validateEmail(email) && !isEmpty(password)) {
                return next();
            }
            if (!validateEmail(email)) {
                const data = {
                    success: false,
                    message: "Enter correct email ! this is not the valid email id !!",
                }

                return res.status(401).json(data);
            }


        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Server issues occures !",
                error,
            })
        }
    
}


export default loginMiddleware;