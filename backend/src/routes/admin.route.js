const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const adminController = require('../controllers/admin.controller');

router.post('/adminAuth/adminSignin', asyncHandler(adminController.adminSignin));



module.exports = router;