import jwt from "jsonwebtoken";
import { isEmpty,validatePassword } from "../middleware/validationhelper.js";
const authMiddleware = async (req, res, next) => {

    try {
        // get token from headers
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            })
        }

        // extract token
        const token = authHeader.split(" ")[1];
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user data to request
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded?.role || "USER",
        };
        next();

    } catch (err) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        })

    }


}

export const passwordValidator = (req, res, next) => {
    try {
        const { newPass } = req.body;

        if (isEmpty(newPass)) {
            return res.status(401).send({ success: false, message: "Please set New password" });
        }

        if(!validatePassword(newPass)){
            return res.send({success:false,message:"Password must be at least 6-digits"})
        }

        next();

    } catch (error) {

    }
}


export default authMiddleware;