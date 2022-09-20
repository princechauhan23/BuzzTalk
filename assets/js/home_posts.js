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

                    // CHANGE :: enable the functionality of the toggle like button on the  new post
                    new ToggleLike($(' .likeBtn', newPost));

                    new Noty({
                        theme: "relax",
                        text: "Post published!",
                        type: "success",
                        layout: "topRight",
                        timeout: 1500
                    }).show();

                },error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }

    // method to create a post in DOM
    let newPostDom = function(post){
        // console.log(post)
        // CHANGE :: show the count of zero likes on this post 
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
                    <a class="likeBtn" data-likes="0" href="/likes/toggle/?id=${post.post_id}&type=Post">
                        <i id="like" class="fa-regular fa-heart"></i>
                        <span> 0 Likes </span>
                    </a>
                </p>
            </div>
            <div class="delete-btn-container">
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post.post_id}">
                        <i class="fa-solid fa-trash-can"></i>
                    </a>
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

                    new Noty({
                        theme: "relax",
                        text: "Post and associated comments deleted!",
                        type: "success",
                        layout: "topRight",
                        timeout: 1500
                    }).show();

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

                    // CHANGE ::enable the functionality of the toggle like button on the new comment
                    new ToggleLike($(' .likeBtn', newComment));
                    new Noty({
                        theme: "relax",
                        text: "Comment published!",
                        type: "success",
                        layout: "topRight",
                        timeout: 1500
                    }).show();

                },error: function(error){
                    console.log(error.responseText);
                }
            })
        }); 
    }

    let newCommentDom = function(comment){
        // CHANGE :: show the count of zero likes on this comment 

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

        <a id="like-btn" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
            <i class="fa-regular fa-heart"></i>
            <p id="like-para">0</p>
        </a>

        <div class="comment-delete-btn-container">
            <a class="delete-comment-button" href="/comments/destroy/${comment.id}">
                <i class="fa-solid fa-trash-can"></i>
            </a>
        </div>
    </li>`)
    }


    let deleteComment = function(deleteCommentLink){
        console.log(deleteCommentLink, '****');
        $(deleteCommentLink).click(function(e){
            e.preventDefault();

            console.log("ajax req *****");
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


    // const likeFunction = () => {
    //     $(".likeBtn").click(function(e){
    //         e.preventDefault()
            
    //         $.ajax({
    //             type: "post",
    //             url: "/likes/toggle?id=<%=post._id%>&type=Post",
    //             data: {
    //                 id : "<%=post._id%>",
    //                 type: "Post"
    //             }
    //             success: function(data){
    //                 $('#like').removeClass('fa-regular').addClass('fa-solid')
    //             },error: function(error){
    //                 console.log("error", error);
    //             }
    //         })
    //     });

    // }



    createPost();
    createComment();
    // likeFunction();
}