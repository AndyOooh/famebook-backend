import express from 'express';

import isAuth from '../middleware/is-auth.js';

import * as userController from '../controllers/user.js';

const router = express.Router();

// router.get('/', isAuth, userController.getUser);

// router.get('/:userId', isAuth, userController.getUser);
router.get('/:userId', userController.getUser);

router.put('/:userId', isAuth, userController.updateProfile);

export default router;
