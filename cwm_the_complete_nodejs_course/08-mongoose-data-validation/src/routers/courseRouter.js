import { Router } from "express";
import { createCourse, createManyCourse, exercise7_14, exercise7_15, exercise7_16, getCourses, getCourses2, updateCourse, getCourse, removeCourse, updateCourse2 } from "./../controllers/courseController.js";

const courseRouter = Router();

courseRouter
    .route("/many")
    .get(getCourses)
    .post(createManyCourse);

courseRouter
    .get("/exercise7_14", exercise7_14)
    .get("/exercise7_15", exercise7_15)
    .get("/exercise7_16", exercise7_16);

courseRouter
    .route("/")
    .get(getCourses2)
    .post(createCourse);

courseRouter
    .route("/:courseId")
    .patch(updateCourse2)
    .get(getCourse)
    .delete(removeCourse);

export default courseRouter;