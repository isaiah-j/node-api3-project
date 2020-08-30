const AppError = require('../utils/appError')
const express = require('express');
const userController = require('./userController')
const router = express.Router();
const db = require('./userDb')
const { validateUserId, validateUser, validatePost } = require('./userMiddleware')

router
  .route('/')
  .post(validateUser, userController.postUser)
  .get(userController.getAllUsers)

router
  .route('/:id')
  .get(validateUserId, userController.getUser)
  .patch(validateUserId, validateUser, userController.updateUser)
  .delete(validateUserId, userController.deleteUser)

router
  .route('/:id/posts')
  .post(validateUserId, validatePost, userController.createPost)
  .get(validateUserId, userController.getUsersPost)


module.exports = router;
