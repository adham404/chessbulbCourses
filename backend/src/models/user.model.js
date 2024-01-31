
const db = require('../config/db.config');
const { createNewUser: createNewUserQuery, deleteUser: deleteUserQuery, updateUser: updateUserQuery , getAllUsers: getAllUsersQuery} = require('../database/queries');
const { logger } = require('../utils/logger');

class User {
    constructor( userId, name, email, photoURL, hasAcademy) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.photoURL = photoURL;
        this.hasAcademy = hasAcademy;
    }

    static create(newUser, cb) {
        // db.connect((err) => {
        //     if (err) logger.error(err.message);
        //     else logger.info('Database connected')
        // });
        db.query(createNewUserQuery, 
            [
                newUser.userId,
                newUser.name,
                newUser.email,
                newUser.photoURL,
                newUser.hasAcademy
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                logger.info(Object.values(res));
                cb(null, {
                    // get the userId from the response
                    ...newUser
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

    static delete(userId, cb) {
        // db.connect((err) => {
        //     if (err) logger.error(err.message);
        //     else logger.info('Database connected')
        // });
        db.query(deleteUserQuery, userId, (err, res) => {
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

    static update(user, cb) {
        // db.connect((err) => {
        //     if (err) logger.error(err.message);
        //     else logger.info('Database connected')
        // });
        db.query(updateUserQuery, 
            [
                
                user.name,
                user.email,
                user.photoURL,
                user.hasAcademy,
                user.userId
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
                    userid: user.userId,
                    name: user.name,
                    email: user.email,
                    photourl: user.photoURL,
                    hasacademy: user.hasAcademy,

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

    static getAllCarsFiltered(filter, cb) {

        let string_condition = ''
        
        string_condition = string_condition + 'WHERE '

        logger.info(filter.pickUpDate);
        logger.info(filter.returnDate);
        logger.info(filter.year);
        logger.info(filter.model);
        logger.info(filter.carId);
        logger.info(filter.country);
        logger.info(filter.minRentPerDay);
        logger.info(filter.maxRentPerDay);

        string_condition = filter.year !== "null" ? string_condition + `C.year = ${filter.year} AND ` : string_condition;
        string_condition = filter.model !== "null" ? string_condition + `C.model = "${filter.model}" AND ` : string_condition;
        string_condition = filter.carId !== "null" ? string_condition + `C.carId = "${filter.carId}" AND ` : string_condition;
        string_condition = filter.country !== "null" ? string_condition + `C.officeId IN (SELECT officeId FROM office WHERE country = "${filter.country}") AND ` : string_condition;
        string_condition = filter.minRentPerDay !== "null" ? string_condition + `C.rentPerDay > ${filter.minRentPerDay} AND ` : string_condition;
        string_condition = filter.maxRentPerDay !== "null" ? string_condition + `C.rentPerDay < ${filter.maxRentPerDay} AND ` : string_condition;
        
        //         const conditions = [];


        // if (filter.year !== "null") {
        //   conditions.push(`C.year = ${filter.year}`);
        // }

        // if (filter.model !== "null") {
        //   conditions.push(`C.model = "${filter.model}"`);
        // }

        // if (filter.carId !== "null") {
        //   conditions.push(`C.carId = "${filter.carId}"`);
        // }

        // if (filter.country !== "null") {
        //   conditions.push(`C.officeId IN (SELECT officeId FROM office WHERE country = "${filter.country}")`);
        // }

        // if (filter.minRentPerDay !== "null") {
        //   conditions.push(`C.rentPerDay > ${filter.minRentPerDay}`);
        // }

        // if (filter.maxRentPerDay !== "null") {
        //   conditions.push(`C.rentPerDay < ${filter.maxRentPerDay}`);
        // }

        // Join the conditions into the string_condition
        // string_condition = conditions.join(' AND ');

        // Add the WHERE keyword if conditions are present
        // if (string_condition.length > 0) {
        //   string_condition = 'WHERE ' + string_condition;
        // }

        console.log(filter.pickUpDate);
        // print type of filter.pickUpDate
        console.log(typeof filter.pickUpDate);


        let getAllCarsFilteredQuery = `
        SELECT *
        FROM car AS C
        ${string_condition} NOT EXISTS 
        (
          SELECT R.carId
          FROM reservation AS R
          WHERE R.carId = C.carId 
          AND (R.pickUpDate >= ${(filter.pickUpDate != "null" && filter.pickUpDate != '') ? `"${filter.pickUpDate}"` : '9999-99-99'} AND R.returnDate <= ${(filter.returnDate != "null" && filter.returnDate != '') ? `"${filter.returnDate}"`: '0000-00-00'})
        );
        `;
        // let getAllCarsFilteredQuery = `SELECT * FROM car`;

        logger.info(getAllCarsFilteredQuery);






        db.query(getAllCarsFilteredQuery, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            // if (res.length) {
                cb(null, res);
                logger.info(res);
                return;
            // }
            // cb({ kind: "not_found" }, null);
        })
    }


    static getAllUsers(cb) {

        // let string_condition = ''
        
        // string_condition = string_condition + 'WHERE '

        // logger.info(filter.pickUpDate);
        // logger.info(filter.returnDate);
        // logger.info(filter.year);
        // logger.info(filter.model);
        // logger.info(filter.carId);
        // logger.info(filter.country);
        // logger.info(filter.minRentPerDay);
        // logger.info(filter.maxRentPerDay);

        // string_condition = filter.year !== "null" ? string_condition + `C.year = ${filter.year} AND ` : string_condition;
        // string_condition = filter.model !== "null" ? string_condition + `C.model = "${filter.model}" AND ` : string_condition;
        // string_condition = filter.carId !== "null" ? string_condition + `C.carId = "${filter.carId}" AND ` : string_condition;
        // string_condition = filter.country !== "null" ? string_condition + `C.officeId IN (SELECT officeId FROM office WHERE country = "${filter.country}") AND ` : string_condition;
        // string_condition = filter.minRentPerDay !== "null" ? string_condition + `C.rentPerDay > ${filter.minRentPerDay} AND ` : string_condition;
        // string_condition = filter.maxRentPerDay !== "null" ? string_condition + `C.rentPerDay < ${filter.maxRentPerDay} AND ` : string_condition;
        
        //         const conditions = [];


        // if (filter.year !== "null") {
        //   conditions.push(`C.year = ${filter.year}`);
        // }

        // if (filter.model !== "null") {
        //   conditions.push(`C.model = "${filter.model}"`);
        // }

        // if (filter.carId !== "null") {
        //   conditions.push(`C.carId = "${filter.carId}"`);
        // }

        // if (filter.country !== "null") {
        //   conditions.push(`C.officeId IN (SELECT officeId FROM office WHERE country = "${filter.country}")`);
        // }

        // if (filter.minRentPerDay !== "null") {
        //   conditions.push(`C.rentPerDay > ${filter.minRentPerDay}`);
        // }

        // if (filter.maxRentPerDay !== "null") {
        //   conditions.push(`C.rentPerDay < ${filter.maxRentPerDay}`);
        // }

        // Join the conditions into the string_condition
        // string_condition = conditions.join(' AND ');

        // Add the WHERE keyword if conditions are present
        // if (string_condition.length > 0) {
        //   string_condition = 'WHERE ' + string_condition;
        // }

        // console.log(filter.pickUpDate);
        // // print type of filter.pickUpDate
        // console.log(typeof filter.pickUpDate);


        // let getAllCarsFilteredQuery = `
        // SELECT *
        // FROM car AS C
        // ${string_condition} NOT EXISTS 
        // (
        //   SELECT R.carId
        //   FROM reservation AS R
        //   WHERE R.carId = C.carId 
        //   AND (R.pickUpDate >= ${(filter.pickUpDate != "null" && filter.pickUpDate != '') ? `"${filter.pickUpDate}"` : '9999-99-99'} AND R.returnDate <= ${(filter.returnDate != "null" && filter.returnDate != '') ? `"${filter.returnDate}"`: '0000-00-00'})
        // );
        // `;
        // let getAllCarsFilteredQuery = `SELECT * FROM car`;

        // logger.info(getAllCarsFilteredQuery);



        // db.connect((err) => {
        //     if (err) logger.error(err.message);
        //     else logger.info('Database connected')
        // });


        db.query(getAllUsersQuery, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            // if (res.length) {
                cb(null, res);
                logger.info(res);
                return;
            // }
            // cb({ kind: "not_found" }, null);
        })
        // db.end((error) => {
        //     if (error) {
        //       console.error('Error closing PostgresSQL connection:', error);
        //       return;
        //     }
        
        //     console.log('PostgresSQL connection closed.');
        // });
    }


    static findById(userId, cb) {
        // db.connect((err) => {
        //     if (err) logger.error(err.message);
        //     else logger.info('Database connected')
        // });
        db.query(`select * from users where userId = $1;`,[userId], (err, res) => {
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
        // db.end((error) => {
        //     if (error) {
        //       console.error('Error closing PostgresSQL connection:', error);
        //       return;
        //     }
        
        //     console.log('PostgresSQL connection closed.');
        // });
    }
}

module.exports = User;