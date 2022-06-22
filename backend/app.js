import dotenv from 'dotenv'
dotenv.config()

import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
// import dotenv from 'dotenv'

import countdownRoutes from './routes/countdown.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import * as conf from './util/app-config.js';
import { rootDir } from './util/globals.js';


console.log('DB:USER', process.env.DB_USER)
const app = express();

// dotenv.config()

app.use(bodyParser.json()); //take form data and convert to json on the frontend first I guess
// app.use(bodyParser.urlencoded({ extended: false })); //take form data and convert to json on the frontend first I guess
// app.use(multer({ storage: conf.fileStorage, fileFilter: conf.fileFilter }).single('image')); 
app.use(multer({ storage: conf.fileStorage, fileFilter: conf.fileFilter }).fields([{ name: 'profile-image', maxCount: 1 }, { name: 'cover-image', maxCount: 1 }]));
// single = we expect to received only 1 file. pass name of fronend input field filepicker as a string. multer stores incoming files on req.file. by passing an object with dest: 'path' we can store the file in that path. this also turns the Buffer into binary data. console.log(re .file) before/after adding this config to see the diff.
// Instead of dest, we can use multer.diskStorage (a storage engine) to set filename and path/destination. adding a file-extension will make it usable.
app.use('/assets/images', express.static(path.join(rootDir, '/assets/images')));

// app.options('*', cors(corsConfig)); // not needed apparently
app.use(cors(conf.corsConfig));

app.use('/auth', authRoutes);
app.use('/countdown', countdownRoutes);
app.use('/users', userRoutes);

app.use((error, req, res, next) => {
  console.log('inside error mid-ware in app.js');
  const status = error.statusCode || 500;
  const message = error.message; // Exists by default. Holds message we pass to cnstructor of error object.
  const data = error.data;
  res.status(status).json({ message: message, data: data });
  console.log('midware error-response sent');
});

mongoose
  .connect(conf.MONGO_URI)
  .then(result => {
    console.log(`Connnected to ${process.env.PORT} and MongoDB`);
    app.listen(process.env.PORT);
  })
  .catch(err => {
    console.log('Error connecting to MongoDB or starting app', err);
  });
