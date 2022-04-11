{
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $("#new-post-form");
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: "post",
                url: "/posts/create",
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data)
                    let newPost = newPostDom(data.data.post);
                    $("#posts-list-container>ul").prepend(newPost);
                    deletePost($(" .delete-post-button", newPost));
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }

    // method to create a post in DOM
    let newPostDom = function(post){
        // console.log(post)
        return $(`<li id="post-${ post.post_id}">
            <p>
                ${ post.content }<br>
                <small>
                    ${ post.userName }
                </small>

                <small>
                <a class="delete-post-button" href="/posts/destroy/${ post.post_id}">delete</a>
                </small>
                
            </p>
                <form action="/comment/create" id="comment-post-form" method="post">
                    <input name="comment" placeholder="type here to add comment" required>
                    <input type="hidden" name="post" value="${ post.post_id }">
                    <input type="submit" value="add comment">
                </form>
        
                <div id="post-comment-${ post.post_id }">
                    <ul id="post-comments-list">

                    </ul>
                </div>
        </li>`)
    }

    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: "get",
                url: $(deleteLink).prop("href"),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }



    // js for comment form
    let createComment = function(){
        let newCommentForm = $("#comment-post-form");
        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: "post",
                url: "/comments/create",
                data: newCommentForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newComment = newCommentDom(data.data.comment);
                    post_id = data.data.comment.post_id
                    $(`#post-comment-${ post_id }>ul`).prepend(newComment);
                    deleteComment($(" .delete-comment-button", newComment));
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        }); 
    }

    let newCommentDom = function(comment){
        return $(`<li>
        <p>
            ${ comment.txt }
            <br>
            <small>
                ${ comment.username }
            </small>
            <small>
                <a class="delete-comment-button" href="/comment/destroy/${ comment.id }">delete</a>
            </small>
        </p>
    </li>`)
    }


    let deleteComment = function(deleteCommentLink){
        $(deleteCommentLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: "get",
                url: $(deleteCommentLink).prop("href"),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }




    createPost();
    createComment();
}