
const db = require('../config/db.config');
const { createNewAcademy: createNewAcademyQuery, deleteAcademy: deleteAcademyQuery, updateAcademy: updateAcademyQuery , getAllAcademies: getAllAcademiesQuery, getOneAcademy: getOneAcademyQuery, getOneAcademyByAcademyId: getOneAcademyByAcademyIdQuery} = require('../database/queries');
const { logger } = require('../utils/logger');

class Academy {
    constructor(name, description, subscriptionFee, ownerId) {
        // this.academyId = academyId;
        this.name = name;
        this.description = description;
        this.subscriptionFee = subscriptionFee;
        this.ownerId = ownerId;
    }

    static create(newAcademy, cb) {
        // db.connect((err) => {
        //     if (err) logger.error(err.message);
        //     else logger.info('Database connected')
        // });
        db.query(createNewAcademyQuery, 
            [
                newAcademy.name,
                newAcademy.description,
                newAcademy.subscriptionFee,
                newAcademy.ownerId
                
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                logger.info(Object.values(res));
                cb(null, {
                    // get the userId from the response
                    ...newAcademy
                });
        });
        // db.end((error) => {
        //     if (error) {
        //       console.error('Error closing PostgresSQL connection:', error);
        //       return;
        //     }
        
        //     console.log('PostgresSQL connection closed.');
        // });
    }

    static delete(academyId, cb) {
        // db.connect((err) => {
        //     if (err) logger.error(err.message);
        //     else logger.info('Database connected')
        // });
        db.query(deleteAcademyQuery, [academyId], (err, res) => {
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
        // db.end((error) => {
        //     if (error) {
        //       console.error('Error closing PostgresSQL connection:', error);
        //       return;
        //     }
        
        //     console.log('PostgresSQL connection closed.');
        // });
    }

    static update(academyId, academy, cb) {
        // db.connect((err) => {
        //     if (err) logger.error(err.message);
        //     else logger.info('Database connected')
        // });
        db.query(updateAcademyQuery, 
            [
                academy.name,
                academy.description,
                academy.subscriptionFee,
                academy.ownerId,
                academyId
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
                    academyId: academyId,
                    ...academy
                });
        });
        // db.end((error) => {
        //     if (error) {
        //       console.error('Error closing PostgresSQL connection:', error);
        //       return;
        //     }
        
        //     console.log('PostgresSQL connection closed.');
        // });
    }



    static getAllAcademies(cb) {
        // db.connect((err) => {
        //     if (err) logger.error(err.message);
        //     else logger.info('Database connected')
        // });
        db.query(getAllAcademiesQuery, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.rows.length) {
                cb(null, res.rows);
                logger.info(res.rows);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
        // db.end((error) => {
        //     if (error) {
        //       console.error('Error closing PostgresSQL connection:', error);
        //       return;
        //     }
        
        //     console.log('PostgresSQL connection closed.');
        // });
    }

    static getOneAcademy(ownerId, cb) {
        // db.connect((err) => {
        //     if (err) logger.error(err.message);
        //     else logger.info('Database connected')
        // });
        db.query(getOneAcademyQuery, [ownerId], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.rows.length) {
                cb(null, res.rows[0]);
                logger.info(res.rows[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
        // db.end((error) => {
        //     if (error) {
        //       console.error('Error closing PostgresSQL connection:', error);
        //       return;
        //     }
        
        //     console.log('PostgresSQL connection closed.');
        // });
    }

    static getOneAcademyByAcademyId(academyId, cb) {
        // db.connect((err) => {
        //     if (err) logger.error(err.message);
        //     else logger.info('Database connected')
        // });
        db.query(getOneAcademyByAcademyIdQuery, [academyId], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.rows.length) {
                cb(null, res.rows[0]);
                logger.info(res.rows[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
        // db.end((error) => {
        //     if (error) {
        //       console.error('Error closing PostgresSQL connection:', error);
        //       return;
        //     }
        
        //     console.log('PostgresSQL connection closed.');
        // });
    }
}

module.exports = Academy;