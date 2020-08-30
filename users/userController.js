const postDb = require('../posts/postDb')
const db = require('./userDb')
const AppError = require('../utils/appError')

// ***USERS***

exports.postUser = async (req, res) => {
    if (!req.body.name) {
        res.status(400).json({
            status: 400,
            message: "Please provide a name"
        })
        return
    }
    try {
        let user = await db.insert({
            name: req.body.name
        })
        res.status(201).json({
            status: 201,
            payload: {
                user
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Unable to create user"
        })

    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.get()
        res.status(200).json({
            status: 200,
            results: users.length
            ,
            payload: {
                users
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Unable to retrieve users"
        })
    }
}


exports.getUser = async (req, res, next) => {
    res.status(200).json({
        status: 200,
        payload: {
            user: req.user
        }
    })
}

exports.updateUser = async (req, res, next) => {
    const { id } = req.user
    try {
        await db.update(id, {
            name: req.body.name
        })

        res.status(200).json({
            status: 200,
            message: "User has been updated"
        })
    } catch (error) {
        next(new AppError("User with that name already exists", 400))
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let userHasBeenDeleted = await db.remove(req.user.id)
        if (!userHasBeenDeleted) return next(new AppError("Unable to delete user", 500))

        res.status(200).json({
            status: 200,
            message: `${req.user.name} has been deleted`
        })

    } catch (error) {
        next(new AppError("Unable to delete user", 500))
    }
}




// ***POSTS***

exports.createPost = async (req, res, next) => {
    console.log(req.user)
    let newPost = {
        text: req.body.text,
        user_id: req.user.id
    }
    try {
        let post = await postDb.insert(newPost)
        res.status(200).json({
            status: 200,
            payload: {
                post
            }
        })
    } catch (error) {
        next(new AppError("Unable to create post", 500))
    }
}

exports.getUsersPost = async (req, res, next) => {
    const { id } = req.user

    try {
        let posts = await db.getUserPosts(id)
        res.status(200).json({
            status: 200,
            payload: {
                posts
            }
        })
    } catch (error) {
        next(new AppError(`Unable to retrieve posts from ${req.user.name}`, 500))
    }

    next()
}
