// Password strength checker
// Returns percentage strength (0 - 100)

function checkPasswordStrength(password="") {
  let score = 0;

  // Minimum length
  if (password.length >= 6) score += 20;

  // Uppercase letter
  if (/[A-Z]/.test(password)) score += 20;

  // Lowercase letter
  if (/[a-z]/.test(password)) score += 20;

  // Number
  if (/[0-9]/.test(password)) score += 20;

  // Special character
  if (/[^A-Za-z0-9]/.test(password)) score += 20;

  return score;
}



export default checkPasswordStrength;
// Example
// const password = "MyPass@123";

// const strength = checkPasswordStrength(password);

// console.log("Strength:", strength + "%");