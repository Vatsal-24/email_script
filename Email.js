const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const emailFunc = async (message, email, subject) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 2525,
    host: "smtp.ethereal.email",
    secure: true,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const emailOptions = {
    from: "vatsaldoshi11@gmail.com", // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    // text: message, // plain text body
    html: message, // ! Dont add http://
  };

  // send mail with defined transport object
  await transporter.sendMail(emailOptions);
  console.log("Message sent!");
};
module.exports = emailFunc;
