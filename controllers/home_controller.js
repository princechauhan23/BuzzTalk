module.exports.home = function(req, res){
    console.log(req.cookies);
    return res.end("<h1>Expresss is up for test!</h1>");
};

// module.exports.actionName = function(req, res){}
module.exports.practice = function(req, res){
    return res.render("../views/practice",{
        title: "let us practise"
    });
};