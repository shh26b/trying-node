const router = require("express").Router();
const Joi = require("joi");


let courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
];

router.get("/", (req, res) => {
    return res.send(courses);
});


router.get("//:id", (req, res) => {
    const id = req.params.id;
    console.log(req.params);
    console.log(req.query);

    const course = courses.find((c) => c.id === parseInt(id));

    if (!course) return res.status(404).send("The with given id was not found");
    return res.status(200).send(course);
});

const validateCourse = (course) => Joi.validate(
    course,
    {
        name: Joi.string().min(3).required().max(30)
    }
);

router.post("/", (req, res) => {
    console.log(req.body);
    const { error, value } = validateCourse(req.body);
    if (error) {
        // 400 Bad Request
        const errors = error.details.reduce((t, c) => t + c.message + " ", "");
        return res.status(400).send(errors);
    }

    const course = {
        id: courses.length + 1,
        name: value.name,
    };
    courses.push(course);
    return res.status(201).send(course);
});

router.put("/:id", (req, res) => {
    // Look up the courses
    // if not existing, return 404
    const id = parseInt(req.params.id);
    const course = courses.find((c) => c.id === id);
    if (!course) return res.status(404).send("The with given id was not found");

    // Validate
    // if invalid, return 400
    const { error, value } = validateCourse(req.body);
    if (error) {
        // 400 Bad Request
        const errors = error.details.reduce((t, c) => {
            return t + c.message + " ";
        }, "");
        return res.status(400).send(errors);
    }

    // update course
    course.name = value.name;
    courses = courses.map((c) => c.id === id ? course : c);

    // Return the update course;
    return res.status(200).send(courses.find((c) => c.id === id));
});

router.delete("//:id", (req, res) => {
    // Look up the courses
    // if not existing, return 404
    const id = parseInt(req.params.id);
    const course = courses.find((c) => c.id === id);
    if (!course) return res.status(404).send("The with given id was not found");

    // delete course
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the update course;
    return res.status(200).send(course);
})

module.exports = router;