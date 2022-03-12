const Post = require("../models/post");
const { post } = require("../routes/posts");
const User = require("../models/user");


module.exports.home = async function(req, res){
    // populate the user of each post
    try{
        let posts = await Post.find({})
        .populate("user")
        .populate({
            path: "comments",
            populate: {
                path: "user"
            }
        })
        let users = await User.find({})

        return res.render("../views/home",{
            title: "Test | Home",
            posts: posts,
            all_users: users
        });
    }catch(err){
        console.log("error", err);
        return;
    }
};




// module.exports.actionName = function(req, res){}
module.exports.practice = function(req, res){
    return res.render("../views/practice",{
        title: "let us practise"
    });
};