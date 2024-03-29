const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");


// controller for creating a post in DB
module.exports.create = async function(req,res){
    try{
        // console.log(req.body, "******")
        // console.log(req.user.name, "******/")
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        // flash message
        req.flash("success", "Post published!");
        
        // postUser = await post.populate("user");
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: {
                        content: post.content,
                        userName: req.user.name,
                        post_id: post._id
                    }
                },
                message: "Post Created!"
            });
        }
        
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
        // console.log(req.params.id);
        if(post.user == req.user.id){

            // change :: delete the assciated likes for the post and all its comments' like too
            // await Like.deleteMany({likeable: post, onModel: 'Post'});
            // await Like.deleteMany({_id: {$in: post.comments}});


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