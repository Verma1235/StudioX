import db from "../config/sqlDb.js";


const validateEmail = (email) => {
  // Matches local-part, @, and domain with a 2+ character TLD
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailPattern.test(email);
};

const validateName = (name) => {
  // Pattern allows letters, spaces, hyphens, and apostrophes
  // Ensures name is between 2 and 50 characters long
  const namePattern = /^[a-zA-Z\s'-]{2,50}$/;

  return namePattern.test(name.trim());
};
const isEmpty = (value) => {

  if (!value || value.trim() === "" || value == undefined || value == null) {
    return true;
  }

  return false;
};

const isMatch = (str1, str2) => {
  if (str1 === str2) {
    return true;
  }
  else {
    return false;
  }
}

const validatePassword = (password) => {
  // At least 6 chars, 1 letter, 1 number
  const pattern =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (password.length >= 6) {
    return true;
  } else {
    return false;
  }


};

const isUserRegistered = async (
  VALUE,
  COLM = "EMAIL",
  TABLENAME = "users"
) => {

  try {

    const sql =
      `SELECT ${COLM} FROM ${TABLENAME} WHERE ${COLM} = ?`;

    const [result] = await db.promise().query(sql, [VALUE]);

    if (result.length > 0) {
      return true;
    } else {
      return false;
    }

  } catch (err) {
    console.log(err);
    return 2;
  }
};



const isDBconnected = async () => {
  try {
    const connection = await db.promise().getConnection();

    await connection.ping();

    connection.release();

    return true;
  } catch (err) {
    console.error("DB connection error:", err);

    return false;
  }
};


// Check if body exists
const isBodyEmpty = (req) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return true;
  }
  return false;
}

export { validateEmail, isEmpty, isMatch, validatePassword, isUserRegistered, isDBconnected, isBodyEmpty, validateName }