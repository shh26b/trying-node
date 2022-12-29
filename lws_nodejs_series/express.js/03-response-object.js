const express = require("express");

const app = express();
app.listen(3000, () => console.log("On :3000"));
app.set("view engine", "ejs");


app.get("/about", (req, res) => {
    console.log(res.headersSent);
    res.locals.name = "Shihab Mahamub";
    res.render("about", {
        country: "Bangladesh",
    })
    console.log(res.headersSent);
})

app.get("/about2", (req, res) => {
    // res.send("This data");

    // res.end();

    // res.json({
    //     name: "Shihab Mahamud",
    //     country: "Bangladesh",
    // })

    // res.status(202);
    // res.end();

    res.sendStatus(400);
})


app.get("/about3", (req, res) => {
    res.format({
        "text/plain": () => {
            res.send("name: Shihab Mahamud, Country: Bangladesh");
        },
        "text/html": () => {
            res.render("about", {
                name: "Shihab Mahamud",
                country: "Bangladesh",
            })
        },
        "application/json": () => {
            res.json({
                name: "Shihab Mahamud",
                country: "Bangladesh",
            })
        },
        default: () => {
            res.status(406).send("Not acceptable");
        }
    })
})

app.get("/about4", (req, res) => {
    // res.cookie("Country", "Bangladesh!", {

    // });

    // res.location("/test");
    // res.end();

    // res.redirect("/test")

    res.set("Title", "Learn with Sumit");
    console.log(res.get("Title"));
    res.end();

})

app.get("/test", (req, res) => {
    res.send("This is test")
})