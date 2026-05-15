import db from "../config/sqlDb.js";

// const result =async () => {
//   const res_result= await db.query("SELECT * FROM `users`;", (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//         console.log(result)
//         return result;
//     })
//     console.log(res_result)
//     return res_result;
// }


// read all users
const result = () => {
    db.query("SELECT * FROM `users`;", (err, rows) => {
        if (err) {
            console.log("error in db query ")
            return "Database query error";
        }

        return rows;


    });
}


export { result };

// INSERT INTO `users` (`ID`, `PHONE`, `PASS`, `ROLE`, `SETTINGS`) VALUES (NULL, '9693490785', '12345', 'DEVELOPER', '11111');