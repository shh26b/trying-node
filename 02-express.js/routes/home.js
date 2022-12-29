const router = require("express").Router()

router.get("/", (req, res) => {
    return res.render("index",
        { _title: "My express App", _message: "hello World" });
});

module.exports = router;
