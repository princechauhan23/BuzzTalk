const Post = require("../models/post");
const Comment = require("../models/comment");


// controller for creating a post in DB
module.exports.create = async function(req,res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect("back");

    }catch{
        console.log("error",err);
        return;
    };
}


// controller for deleting a post from DB
module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            return res.redirect("back");
        }else{
            return res.redirect("back");
        }
    }catch{
        console.log("error",err);
        return;
    }
};