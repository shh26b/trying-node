const path = require("path");
const express = require("express");
const multer = require("multer");


const UPLOAD_DIRECTORY = "./uploads/";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIRECTORY)
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = `${Date.now()}` + "-" + file.originalname
            .replace(fileExt, '')
            .toLowerCase()
            .split(" ")
            .join("-");
        cb(null, fileName + fileExt);
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000, }, // 1MB
    fileFilter: (req, file, cb) => {
        // console.log(file.mimetype);
        if (file.fieldname === "avatar" || file.fieldname === "gallery") {
            if (
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg" ||
                file.mimetype === "text/plain"
            ) {
                cb(null, true);
            }
            else {
                cb(new Error("Only png, jpg, jpeg format allowed!"))
            }
        }
        else if (file.fieldname === "doc") {
            if (file.mimetype === "application/pdf") {
                cb(null, true);
            } else {
                cb(new Error("Only .pdf format allowed"))
            }
        }
        else {
            cb(new Error("There was an unknown error!"));
        }
    }
})

const app = express();


app.post("/single", upload.single("avatar"), (req, res) => {
    console.log(req.file);
    res.send("successful");
})

app.post("/multiple", upload.array("avatar", 5), (req, res) => {
    console.log(req.files);
    res.send("successful")
})

app.post("/many", upload.fields(
    [{ name: "avatar", maxCount: 1 }, { name: "gallery", maxCount: 5 }]
), (req, res) => {
    console.log(req.files);
    res.send("successful")
})

app.post("/nonfile", upload.none(), (req, res) => {
    console.log(req.body);
    res.send("successful")
})

app.post("/doc", upload.fields(
    [{ name: "avatar", maxCount: 1 }, { name: "doc", maxCount: 1 }]
), (req, res) => {
    console.log(req.files);
    res.send("successful");
})


app.use((err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send("There was an upload error!");
        }
        else {
            res.status(500).send(err.message);
        }
    } else {
        res.send("success")
    }
})


const port = 3000;
const protocol = "http";
const hostname = "localhost";
log = console.log;
app.listen(port, () => {
    console.log(`Listening on ${protocol}://${hostname}:${port}`)
});