const notRoute = (req, res) => {
    return res.status(404).send("route not found");
};

module.exports = notRoute;