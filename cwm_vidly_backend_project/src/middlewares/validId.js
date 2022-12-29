const mongoose = require("mongoose");

const validId = (req, res, next) => {
    const id = req.params.id;
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid)
        return res.status(404).send({ "message": "Param id is not valid" });
    return next();
}

module.exports = validId;