import Koa from "koa";

const app = new Koa({ proxy: true });

app.proxy = false;

app.context.db = "This is db";

app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
});

app.use(async (ctx, next) => {
    console.log("line: 1");
    // throw new Error("Error here 1");
    await next();
    const rt = ctx.response.get("X-Response-Time");
    console.log("line: 5");
    console.log(ctx.db);
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
    console.log("line: 2");
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set("X-Response-Time", `${ms}ms`);
    console.log("line: 4");
});

app.use(async ctx => {
    console.log("line: 3");
    let sm = 0;
    for (let i = 1; i < Math.pow(10, 10); i++) {
        sm += i;
    }
    ctx.body = "Hello World \n";
    ctx.body += `Sum: ${sm}`;
});

export default app;
