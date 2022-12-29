const validate = joiSchema => (req, res, next) => {
    const result = joiSchema.validate(req.body);
    if (result.error)
        return res.status(400).send({ message: result.error.details[0].message });
    req.body = result.value;
    return next();
};

module.exports = validate;
