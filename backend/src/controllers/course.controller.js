const Course = require("../models/course.model.js");
const { logger } = require("../utils/logger");

exports.addCourse = (req, res) => {
    const { courseId, name, description, videoURL, academyId } = req.body;
    
    const course = new Course(courseId, name, description, videoURL, academyId);
    
    Course.create(course, (err, data) => {
        if (err) {
        res.status(500).send({
            status: "error",
            message: err.message,
        });
        } else {
        res.status(201).send({
            // status: "success",
            ...data,
        });
        }
    });
    }

exports.deleteCourse = (req, res) => {
    const courseId = req.body.courseId;
    logger.info(courseId);
    Course.delete(courseId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `Course with id ${courseId} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        res.status(200).send({
            status: 'success',
            message: `Course with id ${courseId} was deleted successfully`
        });
    });
}


exports.updateCourse = (req, res) => {
    const course = req.body;
    Course.update(course, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `Course with id ${course.courseId} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        res.status(200).send({
            status: 'success',
            message: `Course with id ${course.courseId} was updated successfully`
        });
    });
}


exports.getAllCoursesByAcademyId = (req, res) => {
    const academyId = req.query.academyId;
    Course.getAllCoursesByAcademyId(academyId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `Courses for academy with id ${academyId} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        res.status(200).send({
            // status: 'success',
            ...data
        });
    });
}

exports.getOneCourseByCourseId = (req, res) => {
    const courseId = req.query.courseId;
    Course.getOneCourseByCourseId(courseId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `Course with id ${courseId} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        res.status(200).send({
            // status: 'success',
            ...data
        });
    });
}