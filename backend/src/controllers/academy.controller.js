const Academy = require('../models/academy.model');
const { logger } = require('../utils/logger');

exports.addAcademy = (req, res) => {
    const { name, description, subscriptionFee, ownerId } = req.body;
    logger.info(description);
    
    const academy = new Academy(name, description, subscriptionFee, ownerId);
    
    Academy.create(academy, (err, data) => {
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

exports.deleteAcademy = (req, res) => {
    const academyId = req.body.academyId;
    logger.info(academyId);
    Academy.delete(academyId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `Academy with id ${academyId} was not found`
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
            message: `Academy with id ${academyId} was deleted successfully`
        });
    });
}

exports.updateAcademy = (req, res) => {
    const academyId = req.body.academyId;
    const academy = req.body;
    Academy.update(academyId, academy, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `Academy with id ${academyId} was not found`
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
            message: `Academy with id ${academyId} was updated successfully`
        });
    });
}

exports.getAllAcademies = (req, res) => {
    Academy.getAllAcademies((err, data) => {
        if (err) {
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

exports.getOneAcademy = (req, res) => {
    const ownerId = req.query.ownerId;
    Academy.getOneAcademy(ownerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `Academy with ownerId ${ownerId} was not found`
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

exports.getOneAcademyByAcademyId = (req, res) => {
    const academyId = req.query.academyId;
    Academy.getOneAcademyByAcademyId(academyId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `Academy with academyId ${academyId} was not found`
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

