import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        // match: /pattern/,
        required: true,
    },
    category: {
        type: String,
        enum: ["web", "mobile", "network"],
        required: true,
        lowercase: true,
        trim: true
        // uppercase: true
    },
    author: String,
    tags: {
        type: [String],
        validate: {
            // validator: function (value) {
            //     return value && value.length > 0;
            // },
            validator: (value) => new Promise((resolve, reject) => {
                // async validator
                setTimeout(() => {
                    const result = value && value.length > 0;
                    resolve(result);
                }, 1000);
            }),
            message: "The course should have at least one tags."
        },
    },
    date: { type: Date, default: Date.now() },
    isPublished: Boolean,
    price: {
        type: Number,
        min: 10,
        max: 100,
        required: function () { return this.isPublished },
        get: (v) => Math.round(v),
        set: (v) => Math.round(v),
    },
});

/*
Schema types
    String
    Number
    Date
    Buffer
    Boolean
    ObjectID
    Array
*/

export const Course = mongoose.model("Course", courseSchema);
