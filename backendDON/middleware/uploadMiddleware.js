const multer = require('multer');

const storage = multer.memoryStorage(); // Store file in memory

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
