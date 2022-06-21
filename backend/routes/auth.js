import express from 'express';
import { body } from 'express-validator';

import * as authController from '../controllers/auth.js';
import User from '../models/User.js';

const router = express.Router();

router.post(
  '/signup',
  [
    body('username').trim().isLength({ min: 3 }),
    body('email')
      .normalizeEmail()
      .isEmail()
      .withMessage('Please enter a valid email address')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(user => {
          if (user) {
            return Promise.reject('Email address already exists');
          }
        });
      }),
    body('password').trim().isLength({ min: 3 }),
  ],
  authController.signup
);

router.post('/login', authController.login); // no need to validate input for login

router.use('/', (res, req, next) => {
  console.log('inside use for /auth')
  const error = new Error('Not found aaaandyyy')
  error.statusCode = 404;
  // return next(error)
  throw error
})



export default router;
