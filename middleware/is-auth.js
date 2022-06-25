import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
  console.log('in isAuth');
  console.log(req.get('Authorization'));
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    console.log('no authHeader');
    const error = new Error('Not Authorized');
    error.statusCode = 401;
    throw error;
  }
  console.log('past !authHeader check');
  const token = authHeader.split(' ')[1];
  console.log('token', typeof token, token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log('error', error);
    error.statusCode = 500;
    error.message = 'dasdasd';
    throw error;
  }
  if (!decodedToken) {
    const error = new Error('Not Authorized');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  // req.isAuth = true;  //used anywhere? seen in 27_finshed_graphql
  next();
};
export default isAuth;

//28_graphql below. Above is from 28_socket.io

// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const authHeader = req.get('Authorization');
//   if (!authHeader) {
//     req.isAuth = false;
//     return next();
//   }
//   const token = authHeader.split(' ')[1]; //Removing 'Bearer' and saving the token only. Not sure why we have Bearer in teh first place. max_ 'it's a convention
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, 'secret'); // verify() verifies AND decodes. There's also decode() only.
//   } catch (error) {
//     req.isAuth = false;
//     return next();
//   }
//   if (!decodedToken) {
//     req.isAuth = false;
//     return next();
//   }
//   req.userId = decodedToken.userId;
//   req.isAuth = true;
//   next();
// };
