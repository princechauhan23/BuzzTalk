const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose")


const app = express();

// using the cookie parser
app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setting the view engine here
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
// to decode the encrypted data of form use urlEncoded
app.use(express.static("./assets"));

// use express router
app.use("/", require("./routes"));
// app.get('/', function (req, res) {
//     console.log(req.cookies);
//     res.send();
//   });


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on the port: ${port}`);
});