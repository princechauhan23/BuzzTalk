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

    createPost();
}