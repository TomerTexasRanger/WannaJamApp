const multer = require('multer');

//Define storage for the images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/uploads/images');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
});

module.exports = upload;
