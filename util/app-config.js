console.log('inside app-config');
console.log('process.env.DB_USER inside app-config', process.env.DB_USER);
import multer from 'multer';

export const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rsgc2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
export const corsConfig = {
  origin: `${process.env.ORIGIN}`,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], //notice OPTIONS not needed for preflight req to pass
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Origin',
    'Content-Type',
    'Authorization',
    // 'X-Requested-With', //not sure what it is. came from SO
    // 'Accept', //not sure what it is. came from SO
  ],
  credentials: true,
};

//Old cors handling by Max
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin');
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }
//   next();
// });

export const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/images'); //null is an error we provide in case someting goes wrong, if not, multer will store the file in the provided path
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname); //originalname contains the file-extension and filename is a random hash, so we dont get duplicates if a file is uploaded twice
  },
});

export const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/gif' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
