const Post = require("../models/post");
const { post } = require("../routes/posts");


module.exports.home = function(req, res){
    // populate the user of each post
    Post.find({})
    .populate("user")
    .populate({
        path: "comments",
        populate: {
            path: "user"
        }
    })
    
    
    .exec(function(err, posts){
        return res.render("../views/home",{
            title: "Test | Home",
            posts: posts
        });
    });

};




// module.exports.actionName = function(req, res){}
module.exports.practice = function(req, res){
    return res.render("../views/practice",{
        title: "let us practise"
    });
};