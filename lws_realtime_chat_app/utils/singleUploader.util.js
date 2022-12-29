"use strict";
const multer = require("multer");
const createError = require("http-errors");
const path = require("path");

const singleUploader = (
    subfolder_path,
    allowed_file_types,
    max_file_size,
    error_msg
) => {
    const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}`;

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOADS_FOLDER);
        },
        filename: (req, file, cb) => {
            const file_ext = path.extname(file.originalname);
            let filename = file.originalname
                .replace(file_ext, "")
                .toLowerCase()
                .split(" ")
                .join("-")
            filename = `${Date.now()} - ${filename}`;

            cb(null, filename + file_ext)
        }
    })

    const fileFilter = (req, file, cb) => {
        if (allowed_file_types.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(createError(error_msg))
        }
    }

    const limits = {
        fieldSize: max_file_size
    }


    const upload = multer({ storage, limits, fileFilter })

    return upload;
}

module.exports = singleUploader
