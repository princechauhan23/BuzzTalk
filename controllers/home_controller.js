module.exports.home = function(req, res){
    return res.render("../views/home",{
        title: "Home"
    })
};

// module.exports.actionName = function(req, res){}
module.exports.practice = function(req, res){
    return res.render("../views/practice",{
        title: "let us practise"
    });
};