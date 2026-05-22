// index.js

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// Main function
async function sendMail({ email = 'testemail@gmail.com', text = 'Your verification code is', otp = "123456", subject = "STUDIOX PASSWORD CHANGING VERIFICATION CODE" }) {

    // STEP 1: Create Ethereal test account
      const testAccount = await nodemailer.createTestAccount();

      console.log("Ethereal Test Account Created:");
      console.log("User:", testAccount.user);
      console.log("Pass:", testAccount.pass);

    // STEP 2: Create transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    // STEP 3: Send email
    const info = await transporter.sendMail({
        from: '"StudioX" studioxbytechqv@gmail.com',
        to: email,
        subject: subject,
        text: `${text} ${otp}`,
        html: `
      <h1>Password Changing Verification code from StudioX </h1>
      <p>${text} ${otp}</p>
      <p>This email was recived from StudioX By Dinesh verma (TechQv Team) </p>
    `,
    });

    // STEP 4: Show results
    console.log("\nEmail Sent Successfully!");
    console.log("Message ID:", info.messageId);

    // STEP 5: Preview URL
      const previewUrl = nodemailer.getTestMessageUrl(info);

    console.log("\nPreview URL:");
    console.log("URL:",previewUrl);
}



export { sendMail }