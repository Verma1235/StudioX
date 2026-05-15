import jwt from "jsonwebtoken";

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
            role:decoded?.role || "USER",
        };
        next();

    } catch (err) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        })

    }


}


export default authMiddleware;