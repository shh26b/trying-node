const userPost = (req, res) => {
    console.log(req.body);
    console.log(req.cookies);
    console.log(req.secure);
    console.log(req.app.get("coder"));
    console.log(req.route);
    console.log(req.accepts("json"));
    console.log(req.get("connection"));
    res.send("in user post");
}

module.exports = userPost;