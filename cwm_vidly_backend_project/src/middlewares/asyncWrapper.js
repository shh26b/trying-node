const asyncWrapper = handlerFunc => async (req, res, next) => {
    try {
        await handlerFunc(req, res, next);
    } catch (err) {
        return next(err);
    }
};

module.exports = asyncWrapper;