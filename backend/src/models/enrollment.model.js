
const db = require('../config/db.config');
const { createNewEnrollment: createNewEnrollmentQuery, deleteEnrollment: deleteEnrollmentQuery, updateEnrollment: updateEnrollmentQuery , getAllEnrollmentsByAcademyId: getAllEnrollmentsByAcademyIdQuery, getOneEnrollmentByAcademyIdAndUserId: getOneEnrollmentByAcademyIdAndUserIdQuery} = require('../database/queries');
const { logger } = require('../utils/logger');

class Enrollment {
    constructor( academyId, userId, approved, instapayHandle) {
        this.academyId = academyId;
        this.userId = userId;
        this.approved = approved;
        this.instapayHandle = instapayHandle;
    }

    static create(newEnrollment, cb) {
        db.query(createNewEnrollmentQuery, 
            [
                newEnrollment.academyId,
                newEnrollment.userId,
                newEnrollment.approved,
                newEnrollment.instapayHandle
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                logger.info(Object.values(res));
                cb(null, {
                    // get the userId from the response
                    ...newEnrollment
                });
        });
    }

    static delete(academyId,userId, cb) {

        db.query(deleteEnrollmentQuery, [academyId,userId], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                cb({ kind: "not_found" }, null);
                return;
            }
            cb(null, res);
        });

    }

    static update(enrollment, cb) {

        db.query(updateEnrollmentQuery, 
            [
                enrollment.instapayHandle,
                enrollment.approved,
                enrollment.academyId,
                enrollment.userId

            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                if (res.affectedRows == 0) {
                    cb({ kind: "not_found" }, null);
                    return;
                }

                cb(null, {
                    // get the userId from the response
                    ...enrollment
                });
        });
    }

    static getAllEnrollmentsByAcademyId(academyId, cb) {

        db.query(getAllEnrollmentsByAcademyIdQuery, [academyId], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.rows.length) {
                cb(null, res.rows);
                return;
            }
            console.log(res);
            cb({ kind: "not_found" }, null);
        })
    }

    static getOneEnrollmentByAcademyIdAndUserId(academyId, userId, cb) {

        db.query(getOneEnrollmentByAcademyIdAndUserIdQuery, [academyId, userId], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.rows.length) {
                cb(null, res.rows[0]);
                return;
            }
            console.log(res);
            cb({ kind: "not_found" }, null);
        })
    }
}

module.exports = Enrollment;