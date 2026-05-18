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
        const { id, email, role } = req.user;
        if (role != "ADMIN" && role != "DEVELOPER" && role != "COADMIN") return res.status(401).send({ success: false, message: "you haven't permission to access Dashboard Analytics data", role: role });
        const sql = `
SELECT 
    COUNT(*) AS CLIENTS,

    COUNT(CASE WHEN \`STATUS\` = 1 THEN 1 END) AS ACTIVE_CLIENTS,
    COUNT(CASE WHEN \`STATUS\` = 0 OR  \`STATUS\` = 2 THEN 1 END) AS BLOCKED_CLIENTS,
  

    COUNT(CASE WHEN \`ROLE\` = 'USER' THEN 1 END) AS USERS,
    COUNT(CASE WHEN \`ROLE\` = 'EMPLOYEE' THEN 1 END) AS EMPLOYEES,
    COUNT(CASE WHEN \`ROLE\` = 'ADMIN' THEN 1 END) AS ADMINS,
    COUNT(CASE WHEN \`ROLE\` = 'COADMIN' THEN 1 END) AS COADMINS,
    COUNT(CASE WHEN \`ROLE\` = 'DEVELOPER' THEN 1 END) AS DEVELOPERS,

    COUNT(CASE WHEN \`ROLE\` = 'USER' 
        AND (\`STATUS\` = 0 OR \`STATUS\` = 2) 
    THEN 1 END) AS BLOCKED_USERS,

    COUNT(CASE WHEN \`ROLE\` = 'EMPLOYEE' 
        AND (\`STATUS\` = 0 OR \`STATUS\` = 2) 
    THEN 1 END) AS BLOCKED_EMPLOYEES,

    COUNT(CASE WHEN \`ROLE\` = 'ADMIN' 
        AND (\`STATUS\` = 0 OR \`STATUS\` = 2) 
    THEN 1 END) AS BLOCKED_ADMINS,

    COUNT(CASE WHEN \`ROLE\` = 'COADMIN' 
        AND (\`STATUS\` = 0 OR \`STATUS\` = 2) 
    THEN 1 END) AS BLOCKED_COADMINS,

    COUNT(CASE WHEN \`ROLE\` = 'DEVELOPER' 
        AND (\`STATUS\` = 0 OR \`STATUS\` = 2) 
    THEN 1 END) AS BLOCKED_DEVELOPERS

FROM \`users\`;
`;
        db.query(sql, [], (err, result) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "error in fetching all card data",
                    error: err,
                });
            }
            const sql2 = "SELECT * FROM `carddata`";
            db.query(sql2, (err2, result2) => {
                if (err2) {
                    return res.status(500).send({
                        success: false,
                        message: "server error while fetching card data !!",
                        error: err2,
                    })
                }
                res.status(200).send({
                    success: true,
                    message: "successfully all cardData fetched !!",
                    data: result,
                    carddata: result2,
                });
            });




        });

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            success: false,
            message: "error in fetching all card data"
        });
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

const assignOptions = (req, res) => {

    try {
        const { id, email, role } = req.user;

        sql = `SELECT ${role || 'USER'} FROM options WHERE ID = 16`;

        db.query(sql, (err, result) => {


        })

    } catch (error) {

    }



}

const fetchAllOptions = (req, res) => {
    try {
        const { id, email, role } = req.user;
        const sql = "SELECT * FROM `all_options` WHERE `role` IN (?, ?) AND `show` IN (?, ?)";

        db.query(sql, ["USER", role, 1, 2], (err, result) => {

            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "error in fetching all options",
                    error: err,
                });
            }

            res.status(200).send({
                success: true,
                message: "successfully all options fetched !!",
                data: result
            });
        });

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            success: false,
            message: "error in fetching all options"
        });
    }
}

const generalSettings = (req, res) => {
    try {
        const { id, email, role } = req.user;

        const sql = "SELECT * FROM `settings` where settings_id=?";
        db.query(sql, [1], (err, result) => {

            if (err) {
                return res.status(500).send({
                    success: false,
                    message: "Error occours in doing query to fetch settings ",
                    error: err,
                });

            }

            res.status(200).send({
                success: true,
                message: "settings fetched successfully from database ",
                data: result,
            })

        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Server error in fetching StudioX settings",
            error
        })
    }
}


const updateSettings = async (req, res) => {
    try {
        const { id, email, role } = req.user;
        const {
            settings_id,
            login,
            logout,
            signup,
            user_login,
            employee_login,
            admin_login,
            coadmin_login,
            developer_login,
            warning_msg,
            sms_allow,
            notificaton_allow,
            socketio_connection
        } = req.body;

        if (role !== 'ADMIN' && role !== 'COADMIN' && role !== 'DEVELOPER') {
            return res.status(401).send({
                success: false, // Changed from true to false
                message: "Unauthorized to process this task !!",
            });
        }

        const sql = "UPDATE `settings` SET `login`=?,`logout`=?,`signup`=?,`user_login`=?,`employee_login`=?,`admin_login`=?,`coadmin_login`=?,`developer_login`=?,`warning_msg`=?,`sms_allow`=?,`notificaton_allow`=?,`socketio_connection`=? WHERE `settings_id`=? ";
        db.query(sql, [login, logout, signup, user_login, employee_login, admin_login, coadmin_login, developer_login, warning_msg, sms_allow, notificaton_allow, socketio_connection, settings_id], (err, result) => {

            if (err) {
                console.log('Erroro1:');
                console.log(err);
                return res.status(500).send({
                    success: false,
                    message: "DB Error while updating settings !!",
                    error: err,
                })
            }

            res.status(200).send({
                success: true,
                message: "Successfully settings changed !!",
            })



        })

    } catch (error) {
        console.log('Erroro2:');
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Server error in Saving StudioX settings",
            error
        })
    }
}





export { fetchUsers, cardData, tokenValidator, assignOptions, fetchAllOptions, generalSettings, updateSettings };