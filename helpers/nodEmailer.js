const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  // 25, 465, 2525
  secure: true,
  auth: {
    // user: "marchelo333@meta.ua",
    user: "marchelo222@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const nodEmailer = async (verifyEmail) => {
  const email = { ...verifyEmail, from: "marchelo222@meta.ua" };
  await transport.sendMail(email);
  return true;
};

module.exports = nodEmailer;
