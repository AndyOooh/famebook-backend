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
  console.log('backend updateProfile ');
  const { userId } = req.params;
  const { name, email, birthday, status } = req.body;
  // const profilePhoto = req.file;
  // const profilePhoto = req.files;
  const { 'cover-image': coverImage, 'profile-image': profileImage } = req.files;
  // const coverImage = req.files['cover-image'][0]

  console.log('req.body.image', req.body.image);
  console.log('userId', userId);
  console.log('profileImage', profileImage);
  console.log('coverImage', coverImage);

  // if(!profilePhoto) {
  //   throw new Error('No image-file was uploaded')
  //   return res.status(422)
  // }

  const profileImageUrl = profileImage ? profileImage[0].path : null;
  const coverImageUrl = coverImage ? coverImage[0].path : null;

  try {
    const user = await User.findById(userId);
    console.log('user before updating prof pic', user);
    user.profileImageUrl = profileImageUrl || user.profileImageUrl;
    // user.profileImageUrl = profileImageUrl;
    user.coverImageUrl = coverImageUrl || user.coverImageUrl
    // user.coverImageUrl = coverImageUrl;
    
    console.log('user.coverImageUrl', user.coverImageUrl);
    console.log('user.profileImageUrl', user.profileImageUrl);

    // should we update everything? how?
    const updatedUser = await user.save();
    console.log('user after updating prof pic', user);
    // consider what to send
    return res.status(201).json({ data: { user: updatedUser } });
  } catch (error) {
    return next(error);
  }

  console.log('resposne to updateProf');
};
