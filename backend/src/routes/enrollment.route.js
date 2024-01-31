const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const enrollmentController = require('../controllers/enrollment.controller');

router.route('/enrollments/addEnrollment').post(asyncHandler(enrollmentController.addEnrollment));
router.route('/enrollments/deleteEnrollment').post(asyncHandler(enrollmentController.deleteEnrollment));
router.route('/enrollments/updateEnrollment').put(asyncHandler(enrollmentController.updateEnrollment));
router.route('/enrollments/getAllEnrollmentsByAcademyId').get(asyncHandler(enrollmentController.getAllEnrollmentsByAcademyId));
router.route('/enrollments/getOneEnrollmentByAcademyIdAndUserId').get(asyncHandler(enrollmentController.getOneEnrollmentByAcademyIdAndUserId));

module.exports = router;