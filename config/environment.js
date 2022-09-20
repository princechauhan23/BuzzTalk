// const fs = require("fs");
// const rfs = require("rotating-file-stream");
// const path = require("path");

// const { fstat } = require("fs");


// const logDirectory = path.join(__dirname, "../production_logs");
// fs.existsSync(logDirectory) || fs.mkdirSync()

const development = {
    name: "development",
    asset_path: "./assets",
    session_cookie_key: 'blahsomething',
    db: "testing",
    smtp: {
        service: 'Gmail',
        host: 'smtp.gmail.com', // gmail domain 
        port: 587,// port number 
        secure: false,
        auth: {
            user: 'princechauhan0671@gmail.com', // User mail 
            pass: 'sohkjteodbvsvhtp'
        }
    },
    google_client_id: "960658095961-86hnjhrenvmrb7ilqsgtncr89obv7avv.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_URL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'test',

}


const production = {
    name: 'production',
    // asset_path: process.env.,
    session_cookie_key: '7456DFC9AAB77',
    db: "testing",
    smtp: {
        service: 'Gmail',
        host: 'smtp.gmail.com', // gmail domain 
        port: 587,// port number 
        secure: false,
        auth: {
            user: 'princechauhan0671@gmail.com', // User mail 
            pass: 'sohkjteodbvsvhtp'
        }
    },
    google_client_id: "960658095961-86hnjhrenvmrb7ilqsgtncr89obv7avv.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_URL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: '67DE9E9A19193', 
    // jwt secret will be saved in the process.env as path
}


module.exports = eval(process.env.testing_Environment) == undefined ? development : eval(process.env.testing_Environment) ;