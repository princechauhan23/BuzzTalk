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
            
            // console.log(req.user,"user");
            commentWithUser = await comment.populate("user", 'name email');
            // console.log(commentWithUser,"llll");
            commentsMailer.newComment(commentWithUser);

            if (req.xhr){
                // Similar for comment to fetch the user's id
                // console.log(commentWithUser)
                return res.status(200).json({
                    data: {
                        comment: {
                            txt: commentWithUser.comment,
                            username: commentWithUser.user.name,
                            id: commentWithUser.id,
                            post_id: req.body.post
                        }
                    },
                    message: "Comment Created"
                });
            }
            return res.redirect("/");
        }
    }catch(err){
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

            // checking ajax req
            
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "comment deleted!"
                })
            }
            
            return res.redirect("back");
        }else{
            return res.redirect("back");
        }
    }catch{
        console.log("error", err);
        return;
    }
    
}
