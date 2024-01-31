const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const courseController = require('../controllers/course.controller');


router.route('/courses/addCourse').post(asyncHandler(courseController.addCourse));
router.route('/courses/deleteCourse').post(asyncHandler(courseController.deleteCourse));
router.route('/courses/updateCourse').put(asyncHandler(courseController.updateCourse));
router.route('/courses/getAllCoursesByAcademyId').get(asyncHandler(courseController.getAllCoursesByAcademyId));
router.route('/courses/getOneCourseByCourseId').get(asyncHandler(courseController.getOneCourseByCourseId));

module.exports = router;