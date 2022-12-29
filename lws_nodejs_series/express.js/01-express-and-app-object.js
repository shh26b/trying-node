const express = require("express");
// const handle = require("./handle");

const app = express();

// app.use(express.json());
// app.use(express.raw());
// app.use(express.text());
// app.use(express.urlencoded());
// app.use(express.static(__dirname + "/public/", {index: "test.txt",}));

// const router = express.Router({ caseSensitive: true, strict: true });

// app.use(router);

// router.get("/about", (req, res) => {
//     res.send("This is about");
// })

// app.locals.title = "My app";


// const admin = express();

// admin.on("mount", parent => {
//     console.log(parent);
// })

// app.use("/admin", admin);

// admin.get("/dashboard", (req, res) => {
//     console.log(admin.mountpath);
//     console.log(app.mountpath);
//     res.send("This is Dashboard");
// })


// app.all("/all", (req, res) => {
//     res.send("Allowed all methods");
// })

// app.enable("case sensitive routing");
// console.log(app.enabled("case sensitive routing"))
// console.log(app.disabled("case sensitive routing"))
// app.disable("case sensitive routing");

// app.get("/about", (req, res) => {
//     res.send("This is about");
// })

// app.set("name", "Shihab Mahamud");
// console.log(app.get("name"));



// app.param("id", (req, res, next, id) => {
//     req.id = id;
//     next();
// })

// app.get("/users/:id", (req, res) => {
//     res.send(`You are the ${req.id}`);
// })



// const blog = express();
// const blogAdmin = express();

// app.use("/blog", blog);
// blog.use("/admin", blogAdmin);

// console.log(app.path()); // ""
// console.log(blog.path()); // "/blog"
// console.log(blogAdmin.path()); // "/blog/admin"


// const user_get = (req, res) => {
//     res.send("This is users get");
// }
// const user_post = (req, res) => {
//     res.send("This is users post");
// }

// const user_put = (req, res) => {
//     res.send("This is users put");
// }

// const user_delete = (req, res) => {
//     res.send("This is users delete");
// }

app.route("/users")
    .all((req, res, next) => {
        console.log("logging something")
        next();
    })
    .get(user_get)
    .post(user_post)
    .put(user_put)
    .delete(user_delete);






app.listen(3000, () => {
    console.log(`Listing on http://127.0.0.1:${3000}`);
});

app.get("/", (req, res) => {
    res.send("This is home page");
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.send("This is home page with post");
});
