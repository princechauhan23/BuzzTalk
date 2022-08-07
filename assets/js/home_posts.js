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
        return $(`<li id="post-${ post.post_id}" class="posts-list-item">
        <div class="posts-list-item-container">
            <div class="post-list-profile-picture">
                <img src="../images/12345.png" alt="profile picture"> 
            </div>
            <div class="posts-content-conatiner">
                <p class="content-user">
                    <small >
                        ${ post.userName }
                    </small>
                    <div class="posts-list-item-content">${ post.content }</div><br>
                </p>
            </div>
            <div class="delete-btn-container">
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post.post_id}">delete</a>
                    </small>
            </div>
        </div>
        <div class="posts-comment-container">
            <div class="posts-comment-form-container">
                    <form action="/comments/create" id="comment-post-form" method="post">
                        <input class="comment-input" name="comment" placeholder="type here to add comment" required>
                        <input type="hidden" name="post" value="${ post.post_id }">
                        <input class="comment-submit-button" type="submit" value="add comment">
                    </form>
            </div>
            <div class="comment-list-container" id="post-comment-${ post.post_id }">
                <ul id="post-comments-list">

                </ul>
            </div>
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
        return $(`<li class="comment-list" id="comment-${comment.id }">
        <div class="comment-profile-picture-container">
            <img class="comment-profile-picture" src="../images/12345.png" alt="profile picture"> 
        </div>
        <p class="comment-content">
            <small>
                ${ comment.username }
            </small>
            <br>
            ${ comment.txt }
        </p>
        <div class="comment-delete-btn-container">
            <small>
                <a class="delete-comment-button" href="/comments/destroy/${ comment.id }">delete</a>
            </small>
        </div>
    </li>`)
    }


    let deleteComment = function(deleteCommentLink){
        $(deleteCommentLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: "get",
                url: $(deleteCommentLink).prop("href"),
                // console.log(data, "ajax data");
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