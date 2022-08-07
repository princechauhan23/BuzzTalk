const Post = require("../../../models/post");
const Comment = require("../../../models/comment");
const { post } = require("../../../routes/posts");

module.exports.index = async function(req, res){
    try{
        let posts = await Post.find({})
        .populate("user")
        .sort("-createdAt")

        let post = [];
        for (let i in posts) {
            post.push({
                "content": posts[i].content,
                "user" : posts[i].user.name,
                "comments" : posts[i].comments
            })
        }
        // console.log(posts[2].comments);
        return res.json(200, {
            message: "list of posts",
            posts : post
        })
        }catch(err){
            console.log("error", err);
        }    
}

module.exports.destroy = async function(req,res){
    try{

        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            // if (req.xhr){
            //     return res.status(200).json({
            //         data: {
            //             post_id: req.params.id
            //         },
            //         message: "Post deleted" 
            //     })
            // }

            req.flash("success", "Post and associated comments deleted!");
            return res.json(200, {
                message: "Post and associated comments deleted!"
            })
        }else{
            return res.json(401, {
                message: "You can not delete this post!"
            })
        }
    }catch{
        req.flash("error", err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
};