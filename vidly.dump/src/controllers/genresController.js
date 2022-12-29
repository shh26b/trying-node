const { Router } = require("express");
const asyncWrapper = require("../middlewares/asyncWrapper");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { Genre } = require("../models/genresModel");
const { createGenreSchema, updateGenreSchema } = require("../models/genresModel");
const validId = require("../middlewares/validId");

const createGenre = asyncWrapper(async (req, res, next) => {
    const genre = new Genre(req.body);
    await genre.save();
    return res.status(201).send(genre);
});

const getGenres = asyncWrapper(async (req, res, next) => {
    const genres = await Genre.find();
    // .limit(10)
    // .sort({ name: -1 })
    return res.status(200).send(genres);
});

const getGenre = asyncWrapper(async (req, res) => {
    const id = req.params.id;

    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).send("Genre not found");

    return res.status(200).send(genre);
});

const updateGenre = asyncWrapper(async (req, res) => {
    const id = req.params.id;

    let genre = await Genre.findById(id);
    if (!genre) return res.status(404).send({ message: "Genre not found" });

    genre = await Genre.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).send(genre);
});

const deleteGenre = asyncWrapper(async (req, res, next) => {
    const id = req.params.id;

    let genre = await Genre.findById(id);
    if (!genre) return res.status(404)
        .send({ message: "Genre not found in delete" });

    await Genre.findOneAndRemove(id);
    return res.status(200).send({ message: "deleted successfully" });
});

const genreRouter = Router();

genreRouter
    .route("/")
    .get(getGenres)
    .post(auth, validate(createGenreSchema), createGenre);

genreRouter
    .route("/:id")
    .all(validId)
    .get(getGenre)
    .put(auth, validate(updateGenreSchema), updateGenre)
    .delete(auth, admin, deleteGenre);

module.exports = genreRouter;
