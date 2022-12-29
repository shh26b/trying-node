const router = require("express").Router();
const mongoose = require("mongoose");
const checkLogin = require("../middlewares/checkLogin");
const todoSchema = require("./../schemas/todoSchema")
const { err500 } = require("./utilities");
const userSchema = require("./../schemas/userSchema")

const Todo = new mongoose.model("Todo", todoSchema);
const User = new mongoose.model("User", userSchema)


router.get("/", checkLogin, async (req, res) => {
    try {
        const todos = await Todo.find()
            .populate("user", "name username -_id").select({ __v: 0 }).limit(4);
        res.status(200);
        res.json({ todos: todos });
    } catch (err) {
        err500(err, res);
    }
});


router.get("/active", async (req, res) => {
    try {
        const todo = new Todo();
        const data = await todo.findActive();
        res.status(200).json(data);
    } catch (err) {
        err500(err, res);
    }
})


router.get("/active-callback", (req, res) => {
    const todo = new Todo();
    todo.findActiveCallback((err, data) => {
        if (err) {
            err500(err, res);
        } else {
            res.status(200).json(data);
        }
    });
})


router.get("/inactive", async (req, res) => {
    try {
        const data = await Todo.findInActiveStatic();
        res.status(200).json(data);
    } catch (err) {
        err500(err, res);
    }
})


router.get("/inactive-with-query", async (req, res) => {
    try {
        const data = await Todo.find().byInActive();
        res.status(200).json(data);
    } catch (err) {
        err500(err, res);
    }
})


router.get("/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        res.status(200);
        res.json({ todo: todo });
    } catch (err) {
        err500(err, res);
    }
});


router.post("/", checkLogin, async (req, res) => {
    try {
        const newTodo = new Todo({ ...req.body, user: req.user_id });
        const todo = await newTodo.save();
        await User.updateOne({
            _id: req.user_id
        }, {
            $push: {
                todos: todo._id
            }
        });

        res.status(200);
        res.json({ msg: "Todo insert successfully", todo: todo })
    } catch (err) {
        err500(err, res);
    }
});


router.post("/many", async (req, res) => {
    try {
        const todos = await Todo.insertMany(req.body);
        res.status(200);
        res.json({ msg: "Todos insert successfully", todo: todos })
    } catch (err) {
        err500(err, res);
    }
});


router.put("/:id", async (req, res) => {
    try {
        const dt = await Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        console.log(dt);
        res.status(200);
        res.json({ msg: "Todos update successfully", todo: dt });
    } catch (err) {
        err500(err, res);
    }
});


router.delete("/:id", async (req, res) => {
    try {
        await Todo.deleteOne({ _id: req.params.id });
        res.status(201);
        res.json({ msg: "Todos deleted successfully" });
    } catch (err) {
        err500(err, res);
    }
});


module.exports = router;