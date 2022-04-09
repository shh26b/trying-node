const singleUploader = require("../../utils/singleUploader");

const avatarUpload = (req, res, next) => {
    const upload = singleUploader(
        "avatars",
        ["image/jpeg", "image/jpg", "image/png"],
        1000000,
        "Only .jpg, jpeg or .png format allowed"
    );

    upload.any()(req, res, err => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatar: { msg: err.message }
                }
            })
        } else {
            next();
        }
    })
}

module.exports = avatarUpload;