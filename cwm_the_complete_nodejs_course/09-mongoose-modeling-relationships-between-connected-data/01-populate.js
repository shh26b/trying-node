const mongoose = require("mongoose")

mongoose
    .connect("mongodb://localhost:27017/the-complete-node-course")
    .then(() => console.log("connection successful to mongodb"))
    .catch(er => console.log("could not connected mongodb", er));

const Author = mongoose.model("Author", new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

const Course = mongoose.model("Course", new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    }
}));

const createAuthor = async (name, boi, website) => {
    const author = new Author({ name, boi, website });

    const result = await author.save();
    console.log(result);
};

const createCourse = async (name, author) => {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
};

const listCourses = async () => {
    const course = await Course
        .find()
        .populate("author", { "name": 1, "website": 1, "_id": 0 })
        .select(["name", "author"]);
    console.log(course);
};

// createAuthor("Mosh", "My bio", "My website");

// createCourse("Node Course", "62b3727dff5e78f7f84da2f8");

listCourses()
