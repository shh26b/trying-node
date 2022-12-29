const mongoose = require("mongoose")

mongoose
    .connect("mongodb://localhost:27017/the-complete-node-course")
    .then(() => console.log("connection successful to mongodb"))
    .catch(er => console.log("could not connected mongodb", er));

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: String,
    website: String
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model("Course", new mongoose.Schema({
    name: String,
    authors: {
        type: [authorSchema]
    }
}));

const createCourse = async (name, authors) => {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
};

const addAuthor = async (courseId, author) => {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    const result = await course.save();
    console.log(result);
};

const removeAuthor = async (courseId, authorId) => {
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    const updatedCourse = await course.save();
    console.log(updatedCourse);
};

createCourse("Node Course", [
    new Author({ name: "Mosh" }),
    new Author({ name: "John" })
]);
addAuthor("62b47c058a74156ec6405dc7", new Author({ name: "Hello" }));
removeAuthor("62b47c058a74156ec6405dc7", "62b47dc4e6cf6856f16322bc");
