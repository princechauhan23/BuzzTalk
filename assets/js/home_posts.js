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
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        }); 
    }

    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
            <p>
                ${ post.content }<br>
                <small>
                    ${ post.user.name }
                </small>

                <small>
                <a class="delete-post-button" href="/posts/destroy/${ post.id}">delete</a>
                </small>
                
            </p>
                <form action="/comment/create" id="comment-post-form" method="post">
                    <input name="comment" placeholder="type here to add comment" required>
                    <input type="hidden" name="post" value="${ post._id }">
                    <input type="submit" value="add comment">
                </form>
        
            <div class="post-comment-list">
                <ul id="post-comments-${ post._id }">
                    
                </ul>
            </div>
        </li>`)
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
                    let newComment = newCommentDom(data.data.post);
                    $("#post-comment-list>ul").prepend(newComment);
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        }); 
    }

    let newCommentDom = function(comment){
        return $(`<li>
        <p>
            ${ comment.comment }
            <br>
            <small>
                ${ comment.user.name }
            </small>
            <small>
                <a href="/comment/destroy/${ comment.id }">delete</a>
            </small>
        </p>
    </li>`)
    }




    createPost();
    createComment();
}