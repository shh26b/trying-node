import mongoose from "mongoose"
import app from "./app.js"

app.listen(3000, async () => {
    console.log("Listening on port http://localhost:3000");
    const uri = "mongodb://localhost:27017/the-complete-node-course";
    try {
        await mongoose.connect(uri);
        console.log("Connection with mongodb successful! with", uri);
    } catch (err) {
        console.log("Mongodb connection failure!! with", uri);
    }
});
