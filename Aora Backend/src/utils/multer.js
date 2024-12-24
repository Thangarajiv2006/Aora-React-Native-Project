const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage }).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

module.exports = upload;
