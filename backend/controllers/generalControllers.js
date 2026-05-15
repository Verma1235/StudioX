import path from "path";
import { fileURLToPath } from "url";
import { result } from "../models/userModel.js"
import db from "../config/sqlDb.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// General controllers
const Home = (req, res) => {
  res.json({ data: "hii" });
  console.log(result());
}

const USERS = (req, res) => {
  db.query("SELECT * FROM `users`;", (err, rows) => {
    if (err) return res.status(500).send(err);


    if (rows.length === 0)

      res.send(rows);
  });
}

const addUser = (req, res) => {
  // [{"ID":1,"PHONE":"9693490785","PASS":"12345","ROLE":"DEVELOPER","SETTINGS":"11111"}]
  const { PHONE, PASS, ROLE, SETTINGS } = req.body;
  const sql = "INSERT INTO `users` ( `PHONE`, `PASS`, `ROLE`, `SETTINGS`)  VALUES (?,?,?,?)";
  db.query(sql, [PHONE, PASS, ROLE, SETTINGS], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({
      msg: "user registered!",
      id: result.insertId
    })
  })

}

const user = (req, res) => {

  const sql = "SELECT PHONE,ROLE,SETTINGS  FROM `users` WHERE id= ?";
  db.query(sql, [req.params.id], (err, result) => {

    if (err) return res.status(500).send({ "error": err });



    res.send(result);
  })

}

// INSERT INTO `files` (`FILES_ID`, `FILES_NAME`, `FILES_EXT`, `FILES_UPLOADER_ID`) VALUES (NULL, 'baby', 'jpg', '1');
const imgdata = (req, res) => {
  const sql = "SELECT * FROM `files` where FILES_UPLOADER_ID= ? ";
  db.query(sql, [req.params.id], (err, rows) => {
    if (err) return res.status(500).send({ msg: "Error in img query" });

    if (rows.length === 0) return res.status(404).send({ msg: "No Any files found!!" });

    res.send(rows);
  })
}


// const imgurl = (req, res) => {
//   // Map through the array and return a string combining name and extension
//   const data = req.body.map((val) => {
//     return `${val.FILES_NAME}.${val.FILES_EXT}`;
//   });

//   res.send(data);
// };

const imgurl = (req, res) => {
  const data = req.body.reduce((acc, val) => {
    // acc is the "accumulator" (our new object)
    // we use the FILES_ID as the key
    acc[val.FILES_ID] = `${val.FILES_NAME}.${val.FILES_EXT}`;
    return acc;
  }, {}); // {} initializes the accumulator as an empty object

  res.send(data);
};




export { Home, USERS, addUser, user, imgdata, imgurl };