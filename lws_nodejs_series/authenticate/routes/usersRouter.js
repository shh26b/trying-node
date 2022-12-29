const router = require("express").Router();
const mongoose = require("mongoose");
const userSchema = require("./../schemas/userSchema")
const { err500, encrypt, matched, generateToken } = require("./utilities");


const User = mongoose.model("User", userSchema);


router.post("/signup", async (req, res) => {
    try {
        req.body.password = await encrypt(req.body.password);
        const user = User(req.body);
        const data = await user.save();
        data.password = undefined;
        res.status(201).json({ msg: "Signup successful", user: data });
    } catch (err) {
        err500(err, res);
    }
});


router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.find({ username: username });
        if (user && user.length > 0) {
            const isValidPassword = await matched(password, user[0].password);
            if (isValidPassword) {
                const payload = {
                    username: user[0].username,
                    user_id: user[0]._id
                }
                const token = generateToken(payload);
                res.status(201).json({
                    "access_token": token,
                    "message": "Login successful"
                })
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        err500(err, res);
    }
});


router.get("/all", async (req, res) => {
    try {
        const users = await User.find().populate("todos");
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "There was an error in sever side" })
    }
})

module.exports = router;