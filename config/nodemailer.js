const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");



let transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com', // gmail domain 
    port: 587,// port number 
    secure: false,
    auth: {
        user: 'princechauhan0671@gmail.com', // User mail 
        pass: 'sohkjteodbvsvhtp' // password
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, "../views/mailers", relativePath),
        data,
        function(err, template){
            if (err){ console.log("error in rendering template"); return;}
            mailHTML = template;
        }
    )
    return mailHTML;    
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}