// Generate strong 6-digit OTP

import crypto from "crypto";

function generateOTP() {
  // Generates number between 100000 and 999999
  return crypto.randomInt(100000, 1000000).toString();
}

// Example




export {generateOTP};