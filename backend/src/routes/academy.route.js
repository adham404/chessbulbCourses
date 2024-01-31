const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const academyController = require('../controllers/academy.controller');


router.route('/academy/addAcademy').post(asyncHandler(academyController.addAcademy));
router.route('/academy/deleteAcademy').post(asyncHandler(academyController.deleteAcademy));
router.route('/academy/updateAcademy').put(asyncHandler(academyController.updateAcademy));
router.route('/academy/getAllAcademies').get(asyncHandler(academyController.getAllAcademies));
router.route('/academy/getOneAcademy').get(asyncHandler(academyController.getOneAcademy));
router.route('/academy/getOneAcademyByAcademyId').get(asyncHandler(academyController.getOneAcademyByAcademyId));


module.exports = router;