const db = require('./userDb')
const AppError = require('../utils/appError')

function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}"
}


exports.validateUserId = async (req, res, next) => {
    const { id } = req.params
    try {
        let currentUser = await db.getById(id)

        if (!currentUser) return next(new AppError(`Unable to find user with id of ${id}`, 404))

        req.user = currentUser
        next()
    } catch (error) {
        next(new AppError('Unable to retrieve user from database', 500))
    }
}

exports.validateUser = (req, res, next) => {
    if (isEmptyObject(req.body)) return next(new AppError("Missing user data", 400))
    if (!req.body.name) return next(new AppError("missing required name field", 400))
    next()
}

exports.validatePost = (req, res, next) => {
    if (isEmptyObject(req.body)) return next(new AppError("Missing post data", 400))
    if (!req.body.text) return next(new AppError("missing required text field", 400))
    next()
}

