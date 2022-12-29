const admin = (req, res, next) => {
    if (req.user.isAdmin !== true)
        return res.status(403).send({ "message": "Access denied." });
    return next();
};;

module.exports = admin;