import jwt from "jsonwebtoken";
import db from "../config/sqlDb.js";
import bcrypt from "bcryptjs";

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
export { loginController, signupController };