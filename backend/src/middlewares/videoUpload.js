const util = require("util");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/src/assets/");
  },
  filename: (req, file, cb) => {
    console.log("file is: ", "video");
    console.log("Video upload middleware is working")
    cb(null, "video");
  },
});

const uploadVideo = multer({
  storage: storage,
  // limits: { fileSize: 200 * 1024 * 1024 }, 
})

module.exports = uploadVideo;