const isEmpty = (value) => {

  if (!value || value.trim() === "" || value == undefined || value == null) {
    return true;
  }

  return false;
};
const validateEmail = (email) => {
  // Matches local-part, @, and domain with a 2+ character TLD
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailPattern.test(email);
};

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
export {isEmpty,validateEmail,validatePassword};