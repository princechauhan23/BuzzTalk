const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const port = 8000;
const cors = require("cors");
const env = require("./config/environment");

const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
// used for session cookie
const session = require("express-session");
const passport = require("passport");
const pasportGoogle = require("./config/passport-google-oauth2-strategy");
const passportLocal = require("./config/passport-local-strategy");
const passportJWt = require("./config/passport-jwt-strategy");
const MongoStore = require("connect-mongo");
// const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

const app = express();

// app.use(sassMiddleware({
//     src: "./assets/scss",
//     dest: "./assets/css",
//     debug: true,
//     outputStyle: "extended",
//     prefix: "/css",
// }))

app.use(cors());

// to decode the encrypted data of form use urlEncoded
app.use(express.urlencoded({ extended: true }));
// using the cookie parser
app.use(cookieParser());

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setting the view engine here
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "test",
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/testing",
      autoRemove: "disabled",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use(express.static(env.asset_path));
// make the uploads path avilable to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on the port: ${port}`);
});
