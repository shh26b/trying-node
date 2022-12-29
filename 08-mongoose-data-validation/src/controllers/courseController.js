import { Course } from "../models/courseModel.js";

export const getCourses = async (req, res, next) => {
    try {
        /**
         * Comparison operator in mongodb:
         *    eq (equal)
         *    ne (not equal)
         *    gt (greater than)
         *    gte (greater than or qual to)
         *    lt (less than)
         *    lte (less than or equal to)
         *    in 
         *    nin (not in)
         * Logical operator in mongodb:
         *    or
         *    and
         */

        const pageNumber = 2;
        const pageSize = 10;

        const courses = await Course
            // .find({ author: "Mosh", is_published: true })
            // .find({ price: { $gte: 12, $lte: 15 } })
            // .find({ price: { $in: [10, 15, 20] } })
            // .find().or([{ author: "Mosh" }, { is_published: true }])
            // .find({ author: /^Mosh/ }) // Start with Mosh and Ends with Hamedani 
            // .find({ author: /^Hamedani/i }) // Ends with Hamedani with case insensitive 
            .find({ author: /.*Mosh.*/i }) // Contains with Mosh with case insensitive
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .sort({ price: 1 })
            .select({ name: 1, author: 1, is_published: 1, price: 1 });
        // .count();

        return res.status(200).json({ courses });
    } catch (err) {
        return next(err);
    }
};

export const getCourses2 = async (req, res, next) => {
    try {
        const courses = await Course.find()
        res.status(200).json({ courses });
    } catch (err) {
        next(err);
    }
};

export const exercise7_14 = async (req, res, next) => {
    try {
        const courses = await Course
            .find({ tags: "backend", isPublished: true })
            .sort({ name: 1 })
            .select({ name: 1, author: 1, tags: 1 });

        return res.status(200).json({ courses });
    } catch (err) {
        return next(err);
    }
};

export const exercise7_15 = async (req, res, next) => {
    try {
        const courses = await Course
            // .find({ isPublished: true })
            // .or([{ tags: "backend" }, { tags: "frontend" }])
            .find({ isPublished: true, tags: { $in: ["backend", "frontend"] } })
            .sort({ price: -1 })
            .select({ name: 1, author: 1, tags: 1, price: 1, _id: 0 });

        return res.status(200).json({ courses });
    } catch (err) {
        return next(err);
    }
};

export const exercise7_16 = async (req, res, next) => {
    try {
        const courses = await Course
            .find({ isPublished: true })
            .or([
                { price: { $gte: 15 } },
                { name: /.*by.*/i }
            ])
            .sort('-price')
            .select('name author price');

        return res.status(200).json({ courses });
    } catch (err) {
        return next(err);
    }
};

export const createCourse = async (req, res, next) => {
    const course = new Course(req.body);
    try {
        await course.validate()
        const savedCourse = await course.save();
        return res.status(201).send(savedCourse);
    } catch (err) {
        for (const field in err.errors) {
            console.log(err.errors[field].message)
        }
        return next(err);
    }
};

export const createManyCourse = async (req, res, next) => {
    try {
        const payloads = req.body;
        const result = payloads.map(payload => {
            const course = new Course(payload);
            return course.save();
        });
        console.log(result);
        const savedCourses = await Promise.all(result);
        return res.status(201).send(savedCourses);
    } catch (err) {
        return next(err);
    }
};

export const updateCourse = async (req, res, next) => {
    try {
        const payload = req.body;
        const courseId = req.params.courseId;
        console.log(courseId);
        const course = await Course.findOne({ _id: courseId });
        console.log(course);
        if (!course) throw new Error("no course found the id");
        course = { ...course, ...payload };
        const updatedCourse = await course.save();
        return res.status(201).send(updatedCourse);
    } catch (err) {
        return next(err);
    }
};

export const updateCourse2 = async (req, res, next) => {
    try {
        const payload = req.body;
        const courseId = req.params.courseId;
        const updatedCourse = await Course.findByIdAndUpdate(courseId, payload, { new: true });
        return res.status(201).send(updatedCourse);
    } catch (err) {
        return next(err);
    }
};

export const removeCourse = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;
        // const result = await Course.deleteOne({ _id: courseId });
        // const result = await Course.deleteMany({ _id: courseId });
        // const result = await Course.deleteMany({ _id: courseId });
        // return res.status(200).send(result);
        const course = await Course.findByIdAndRemove(courseId);
        return res.status(200).send({ course });
    } catch (err) {
        next(err);
    }
};

export const getCourse = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;
        console.log(courseId);
        const result = await Course.findById(courseId);
        return res.status(200).send({ result });
    }
    catch (err) {
        next(err);
    }
}