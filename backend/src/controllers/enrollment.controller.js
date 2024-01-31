const Enrollment = require("../models/enrollment.model.js");
const { logger } = require("../utils/logger");

exports.addEnrollment = (req, res) => {
    const { academyId, userId, approved, instapayHandle } = req.body;
    
    const enrollment = new Enrollment(academyId, userId, approved, instapayHandle);
    
    Enrollment.create(enrollment, (err, data) => {
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

exports.deleteEnrollment = (req, res) => {
    const academyId = req.body.academyId;
    const userId = req.body.userId;
    logger.info(academyId);
    Enrollment.delete(academyId, userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `Enrollment with academyId ${academyId} and userId ${userId} was not found`
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
            message: `Enrollment with academyId ${academyId} and userId ${userId} was deleted successfully`
        });
    });
}


exports.updateEnrollment = (req, res) => {
    const enrollment = req.body;
    Enrollment.update(enrollment, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `Enrollment with academyId ${enrollment.academyId} and userId ${enrollment.userId} was not found`
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
            message: `Enrollment with academyId ${enrollment.academyId} and userId ${enrollment.userId} was updated successfully`
        });
    });
}

exports.getAllEnrollmentsByAcademyId = (req, res) => {
    const academyId = req.query.academyId;
    Enrollment.getAllEnrollmentsByAcademyId(academyId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `Enrollment with academyId ${academyId} was not found`
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

exports.getOneEnrollmentByAcademyIdAndUserId = (req, res) => {
    const academyId = req.query.academyId;
    const userId = req.query.userId;
    Enrollment.getOneEnrollmentByAcademyIdAndUserId(academyId, userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `Enrollment with academyId ${academyId} and userId ${userId} was not found`
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