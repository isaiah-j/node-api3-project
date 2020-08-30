const express = require('express')
const app = express()
const userRouter = require('./users/userRouter')


function logger(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url}`
    )
    next()
}

app.use(express.json())
app.use(logger)

// ROUTES
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        api: 'up',
        message: "Welcome"
    })
})
app.use('/api/users', userRouter)


// error handling

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })

})

module.exports = app