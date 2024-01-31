const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const userController = require('../controllers/user.controller');


router.route('/users/addUser').post(asyncHandler(userController.addUser));
router.route('/users/deleteUser').post(asyncHandler(userController.deleteUser));
router.route('/users/updateUser').put(asyncHandler(userController.updateUser));
router.route('/users/getAllUsers').get(asyncHandler(userController.getAllUsers));
router.route('/users/getUser').get(asyncHandler(userController.getUserById));

module.exports = router;