import { unlink } from 'fs/promises';

import User from '../models/User.js';

export const getUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }
    console.log('user', user);
    res.status(200).json({ user: user }); //sending user here
  } catch (error) {
    console.log('in catch block OF getUser', error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
  // TODO: get req to DB to fetch all user data (should be an array).
};

export const updateProfile = async (req, res, next) => {
  const { userId } = req.params;
  const { name, email, birthday, status } = req.body;
  const { 'cover-image': coverImage, 'profile-image': profileImage } = req.files;

  const profileImageUrl = profileImage ? profileImage[0].path : null;
  const coverImageUrl = coverImage ? coverImage[0].path : null;

  try {
    const user = await User.findById(userId);
    console.log('user before updating prof pic', user);

    // DELETE OLD IMAGE -------------------------------------------------
    let imageToDelete = '';
    if (profileImageUrl) {
      imageToDelete = user.profileImageUrl || '';
    } else if (coverImageUrl) {
      imageToDelete = user.coverImageUrl || '';
    }
    const pathToImageToDelete = './' + imageToDelete;
    if (imageToDelete) {
      unlink(pathToImageToDelete);
    }

    user.profileImageUrl = profileImageUrl || user.profileImageUrl;
    user.coverImageUrl = coverImageUrl || user.coverImageUrl;

    // should we update everything? how?
    const updatedUser = await user.save();
    // consider what to send
    return res.status(201).json({ data: { user: updatedUser } });
  } catch (error) {
    return next(error);
  }
  // Delete return to reach here.
  console.log('resposne to updateProf');
};
