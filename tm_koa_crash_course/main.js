import Koa from "koa";
import Router from "koa-router";
import json from "koa-json";
import path from "node:path";
import ejs from "koa-ejs";
import bodyparser from "koa-bodyparser";

const app = new Koa();
const router = new Router();

const things = [
    "C/C++ Programming",
    "Python Programming",
    "Java Programming",
    "JavaScript Programming",
    "Go Programming",
];

app.use(json());
app.use(bodyparser());

// Simple middlewares
// app.use(async ctx => (ctx.body = { message: "Hello World" }));

// Add additional properties to the ctx
app.context.title = "This i love 2";
app.context.user = { name: "Shihab Mahamud" };

ejs(app, {
    root: path.join(path.resolve(), "views"),
    layout: "layout",
    viewExt: "ejs",
    cache: false,
    debug: false,
});

// index page
const index = async ctx => {
    await ctx.render("index", {
        title: ctx.title,
        things: things,
    });
};

const showAdd = async ctx => {
    await ctx.render("add");
};

const add = async ctx => {
    const body = ctx.request.body;
    things.push(body.thing);
    ctx.redirect("/");
};

router.get("/", index);
router.get("/add", showAdd);
router.post("/add", add);

router.get(
    "/test/:name",
    async ctx => (ctx.body = { msg: `Hello ${ctx.params.name}` })
);
router.get("/test", async ctx => (ctx.body = ctx.user));

// router middlewares
app.use(router.routes()).use(router.allowedMethods);

app.listen(3000, console.log("Running on port 3000"));
