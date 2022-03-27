const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require("../mailers/comments_mailer");


module.exports.create = async function(req, res){
    try{
        let post =await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                comment: req.body.comment,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            
            console.log(err);
            comment = await comment.populate("user", "name email").execPopulate();
            commentsMailer.newComment(comment);

            if (req.xhr){
                // Similar for comment to fetch the user's id

                return res.status(200).json({
                    data: {
                        comment: comment,
                    },
                    message: "Comment Created"
                });
            }
            res.redirect("/");
        }
    }catch{
        console.log("error", err);
        return;
    }
}


module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();

            let post = await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});

            return res.redirect("back");
        }else{
            return res.redirect("back");
        }
    }catch{
        console.log("error", err);
        return;
    }
    
}
