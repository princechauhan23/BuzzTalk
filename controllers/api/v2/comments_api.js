module.exports.index = function(req, res){
    return res.json(200, {
        message: "list of comments",
        comments: []
    })
}