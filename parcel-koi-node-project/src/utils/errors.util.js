class GeneralError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = "GeneralError";
    }
    getCode = () => 400;
}

class BadRequestError extends GeneralError {
    constructor(message) {
        super(message);
        this.name = "BadRequest";
    }
    getCode = () => 400;
}

class NotFoundError extends GeneralError {
    constructor(message) {
        super(message);
        this.name = "NotFound";
    }
    getCode = () => 404;
}

module.exports = {
    GeneralError,
    BadRequestError,
    NotFoundError,
};
