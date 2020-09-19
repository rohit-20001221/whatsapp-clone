const multer = require("multer");
const aws = require("aws-sdk");
multerS3 = require("multer-s3");

// aws.config.update({
//   region: "us-east-2",
// });

s3 = new aws.S3();

//define the storage type here
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   },
// });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "18jj1a0515",
    key: function (req, file, cb) {
      console.log(file);
      cb(null, Date.now() + file.originalname); //use Date.now() for unique file keys
    },
  }),
}); // <-- multer middleware
module.exports = upload;
