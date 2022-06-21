import express from 'express';
import { body } from 'express-validator';

import isAuth from '../middleware/is-auth.js'; 

import * as countdownController from '../controllers/countdown.js';

const router = express.Router();

router.get('/', isAuth,  countdownController.getEvents); // isAuth here only for testing. It works. Remember we can still access the page in browser as it's on frontend server (localhost//:3000 and not here: 8080). It works drom Postman when sending to 8080.

router.post('/', countdownController.postEvents)

export default router;


// validation, import routes and set up as mid-ware in app.js, ...
