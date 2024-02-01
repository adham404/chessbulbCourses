const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const videoController = require('../controllers/video.controller');
const videoUpload = require('../middlewares/videoUpload');

router.route('/videos/uploadVideo').post(asyncHandler(videoController.uploadVideo));

module.exports = router;