const nodemailer = require("nodemailer");
const config = require("./config");

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: Number(config.SMTP_PORT),
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

module.exports = transporter;
