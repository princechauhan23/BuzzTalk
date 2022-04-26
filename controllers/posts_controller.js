const Post = require("../models/post");
const Comment = require("../models/comment");


// controller for creating a post in DB
module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        postUser = await post.populate("user");
        // console.log(postUser)
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: {
                        content: postUser.content,
                        userName: postUser.user.name,
                        post_id: postUser.id
                    }
                },
                message: "Post Created!"
            });
        }
        req.flash("success", "Post published!");
        return res.redirect("back");

    }catch{
        req.flash("error", err);
        return res.redirect("back");
    };
}


// controller for deleting a post from DB
module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted" 
                })
            }


            req.flash("success", "Post and associated comments deleted!");

            return res.redirect("back");
        }else{
            req.flash("error", "You can't delete this post!");
            return res.redirect("back");
        }
    }catch{
        req.flash("error", err);
        return res.redirect("back");
    }
};