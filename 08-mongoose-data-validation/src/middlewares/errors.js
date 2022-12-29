export const errorHandler = (err, req, res, next) => {
    res.status(500).send(err.message);
};
export const notRoute = (req, res) => {
    res.status(404).send("route not found");
}
