const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    date: {
        type: Date,
        default: Date.now
    },
})

// instance methods
todoSchema.methods = {
    findActive: () => {
        return mongoose.model("Todo").find({ status: "active" });
    },
    findActiveCallback: (cb) => {
        return mongoose.model("Todo").find({ status: "active" }, cb);
    }
}

// static methods
todoSchema.statics = {
    findInActiveStatic: function () {
        return this.find({ status: "inactive" });
    }
}

// query helpers
todoSchema.query = {
    byInActive: function () {
        return this.find({ status: "inactive" })
    }
}

// console.log(todoSchema);

module.exports = todoSchema;