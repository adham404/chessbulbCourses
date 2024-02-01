const busboy = require('connect-busboy');



const uploadVideo = busboy({
  highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})

module.exports = uploadVideo;