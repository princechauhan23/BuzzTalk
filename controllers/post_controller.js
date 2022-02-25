module.exports.post = function(req, res){
    return res.render("../views/post",{
        title: "new posts"
    });
};