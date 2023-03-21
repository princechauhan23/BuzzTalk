const test = require("dotenv").config();

const development = {
  name: "development",
  asset_path: "./assets",
  db: "testing",
  session_cookie_key: process.env.SESSION_COOKIE_KEY,
  smtp: {
    service: "Gmail",
    host: "smtp.gmail.com", // gmail domain
    port: 587, // port number
    secure: false,
    auth: {
      user: process.env.SMTP_AUTH_USER, // User mail
      pass: process.env.SMTP_AUTH_PASS,
    },
  },
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_callback_URL: process.env.GOOGLE_CALLBACK_URL,
  jwt_secret: process.env.JWT_SECRET,
};

module.exports = development;
