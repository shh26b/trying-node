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
    author: {
        type: authorSchema,
        required: true
    }
}));

const createCourse = async (name, author) => {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
};

const updateAuthor = async (courseId) => {
    // const course = await Course.findById(courseId);
    // course.author.name = "Updated Author";
    // const updatedCourse = await course.save();
    const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        { $set: { "author.name": "John doy2" } },
        { new: 1 }
    );

    console.log(updatedCourse);
};

const removeAuthor = async (courseId) => {
    // const removedAuthor = await Course.findByIdAndUpdate(
    //     courseId,
    //     { $unset: { "author.name": "" } },
    //     { new: 1 }
    // );
    const removedAuthor = await Course.findByIdAndUpdate(
        courseId,
        { $unset: { "author": "" } },
        { new: 1 }
    );

    console.log(removedAuthor);
};

// createCourse("Node Course", new Author({ name: "Mosh" }));
// updateAuthor("62b46224d3e69645c3455f5b");
removeAuthor("62b46224d3e69645c3455f5b");

