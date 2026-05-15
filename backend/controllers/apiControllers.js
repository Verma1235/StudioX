import jwt from "jsonwebtoken";
import db from "../config/sqlDb.js";
import { isDBconnected } from "../middleware/validationhelper.js";


//  fetch users by pagination and limit applicable
const fetchUsers = (req, res) => {

    try {

        if (!isDBconnected()) {
            return res.status(500).send({
                resolve: false,
                message: "Database connection Issue !!"
            })
        }

        let { page = 1, limit = 5 } = req.query;

        // Convert to numbers
        page = parseInt(page);
        limit = parseInt(limit);

        // Validation
        if (page < 1) page = 1;
        if (limit < 1) limit = 5;

        // Offset formula
        const offset = (page - 1) * limit;


        // Main query
        const sql = `
        SELECT * FROM users
        LIMIT ? OFFSET ?
    `;

        db.query(sql, [limit, offset], (err, users) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message,
                });
            }

            // Count query
            db.query(
                "SELECT COUNT(*) AS total FROM `users`",
                (countErr, countResult) => {

                    if (countErr) {
                        return res.status(500).json({
                            success: false,
                            message: "Count query failed",
                            error: countErr.message,
                        });
                    }

                    const totalUsers = countResult[0].total;

                    return res.status(200).json({
                        success: true,

                        pagination: {
                            currentPage: page,
                            limit,
                            totalUsers,
                            totalPages: Math.ceil(totalUsers / limit),
                        },

                        users,
                    });
                }
            );
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });

    }



}

// card data fetch

const cardData = (req, res) => {
    try {
        if (!isDBconnected()) {
            return res.status(500).send({
                resolve: false,
                message: "Database connection Issue !!"
            })
        }

    } catch (error) {

    }
}

const tokenValidator = (req, res) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Token not valid !!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Token successfully verified !!"
        });

    } catch (err) {

        console.log(err);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

const assignOptions=(req,res)=>{

    try{
        const {id,email,role}=req.user;

        sql=`SELECT ${role || 'USER' } FROM options WHERE ID = 16`;

        db.query(sql,(err,result)=>{

            
        })

    }catch(error){

    }



}

export { fetchUsers, cardData, tokenValidator , assignOptions};