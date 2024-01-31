const User = require("../models/user.model.js");
const { logger } = require("../utils/logger");

exports.addUser = (req, res) => {
    const { userId, name, email, photoURL, hasAcademy } = req.body;
    
    const user = new User(userId, name, email, photoURL, hasAcademy);
    
    User.create(user, (err, data) => {
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
    };

exports.deleteUser = (req, res) => {
    const userId = req.body.userId;
    logger.info(userId);
    User.delete(userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with id ${userId} was not found`
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
            message: `User with id ${userId} was deleted successfully`
        });
    });
}

exports.updateUser = (req, res) => {
    const user = req.body;
    User.update(user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with id ${user.userId} was not found`
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
            // message: `User with id ${user.userId} was updated successfully`
            ...data
        });
    });
}

exports.getAllUsers = (req, res) => {
    User.getAllUsers((err, data) => {
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
exports.getUserById = (req, res) => {
    const userId = req.query.userId;
    logger.info(userId);
    User.findById(userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with id ${userId} was not found`
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

