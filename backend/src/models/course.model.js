
const db = require('../config/db.config');
const { createNewCourse: createNewCourseQuery, deleteCourse: deleteCourseQuery, updateCourse: updateCourseQuery , getAllCoursesByAcademyId: getAllCoursesByAcademyIdQuery, getOneCourseByCourseId: getOneCourseByCourseIdQuery} = require('../database/queries');
const { logger } = require('../utils/logger');

class Course {
    constructor( courseId,name, description, videoURL, academyId) {
        this.courseId = courseId;
        this.name = name;
        this.description = description;
        this.videoURL = videoURL;
        this.academyId = academyId;
    }

    static create(newCourse, cb) {
        // db.connect((err) => {
        //     if (err) logger.error(err.message);
        //     else logger.info('Database connected')
        // });
        db.query(createNewCourseQuery, 
            [
                newCourse.name,
                newCourse.description,
                newCourse.videoURL,
                newCourse.academyId
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                logger.info(Object.values(res));
                cb(null, {
                    // get the userId from the response
                    ...newCourse
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

    static delete(courseId, cb) {
        // db.connect((err) => {
        //     if (err) logger.error(err.message);
        //     else logger.info('Database connected')
        // });
        db.query(deleteCourseQuery, [courseId], (err, res) => {
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

    static update(course, cb) {
        // db.connect((err) => {
        //     if (err) logger.error(err.message);
        //     else logger.info('Database connected')
        // });
        db.query(updateCourseQuery, 
            [
                course.name,
                course.description,
                course.videoURL,
                course.courseId

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
                    ...course
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

    static getAllCoursesByAcademyId(academyId, cb) {
        // db.connect((err) => {
        //     if (err) logger.error(err.message);
        //     else logger.info('Database connected')
        // });
        db.query(getAllCoursesByAcademyIdQuery, [academyId], (err, res) => {
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
        // db.end((error) => {
        //     if (error) {
        //       console.error('Error closing PostgresSQL connection:', error);
        //       return;
        //     }
        
        //     console.log('PostgresSQL connection closed.');
        // });
    }

    static getOneCourseByCourseId(courseId, cb) {
        // db.connect((err) => {
        //     if (err) logger.error(err.message);
        //     else logger.info('Database connected')
        // });
        db.query(getOneCourseByCourseIdQuery, [courseId], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.rows.length) {
                cb(null, res.rows[0]);
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

module.exports = Course;