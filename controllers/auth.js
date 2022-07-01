import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

// Signup controller
export const signup = async (req, res, next) => {
  const errors = validationResult(req);
  console.log('errors before check', errors);
  if (!errors.isEmpty()) {
    console.log('inside if errors array not empty')
    const error = new Error('Signup failed - andy.');
    error.statusCode = 422;
    error.data = errors.array(); // Look this func up. Add result to README
    return next(error);
    // throw error; //<-- caused a lot of trouble. See README for notes. Still can't figure out why Max' should work -it doesnøt when I download and run it.
  }
  console.log('outsie if errors array not empty')

  const { username, email, password } = req.body;

  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPw,
    });
    const savedUser = await newUser.save();
    console.log('savedUser', savedUser);
    res.status(201).json({
      message: 'User created',
      data: savedUser,
    });
  } catch (error) {
    console.log('in catch block OF SIGNUP');
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// LOGIN CONTROLLER ----------------------
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error('User not found. Are you using the correct email address?');
      error.statusCode = 401;
      return next(error);
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Password and email do not match');
      error.statusCode = 401;
      return next(error);
    }
    // TODO: read jsonwebtoken docs.

    const token = await jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    const expirationTime = new Date().getTime() + 60 * 60 * 1000; //add hours to date obj. getTime() returns number of secs since jan 1 1970
    // const expirationTime = new Date().getTime() + 10000;
    res
      .status(200)
      .json({ token: token, expirationTime: expirationTime, userId: user._id.toString() });
  } catch (error) {
    console.log('in catch block OF LOGIN');
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
