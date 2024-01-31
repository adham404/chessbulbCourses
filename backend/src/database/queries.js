const { DB_NAME } = require('../utils/secrets')

// const createDB = `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``;
// const dropDB = `DROP DATABASE IF EXISTS \`${DB_NAME}\``;\
const dropDB = `
DROP TABLE IF EXISTS enrollment;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS academy;
DROP TABLE IF EXISTS users;
`;

const createTableUsers = `
CREATE TABLE  IF NOT EXISTS users (
    userId VARCHAR(1000),
    name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    photoURL VARCHAR(1000),
    hasAcademy BOOLEAN,
    PRIMARY KEY (userId)
);
`;
const createTableAcademy = `
CREATE TABLE IF NOT EXISTS academy ( 
    academyId SERIAL,
    name VARCHAR(50),
    description VARCHAR(8000),
    subscriptionFee INT,
    ownerId VARCHAR(1000) UNIQUE,
    PRIMARY KEY (academyId),
    FOREIGN KEY (ownerId) REFERENCES users(userId)
);
`;

const createTableEnrollment = `
CREATE TABLE IF NOT EXISTS enrollment (
    academyId INT,
    userId VARCHAR(1000),
    approved BOOLEAN,
    instapayHandle VARCHAR(100),
    PRIMARY KEY (academyId, userId),
    FOREIGN KEY (academyId) REFERENCES academy(academyId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);
`;

const createTableCourse = `
CREATE TABLE IF NOT EXISTS course (
    courseId SERIAL,
    name VARCHAR(50),
    description VARCHAR(8000),
    videoURL VARCHAR(1000),
    academyId INT,
    PRIMARY KEY (courseId),
    FOREIGN KEY (academyId) REFERENCES academy(academyId) ON DELETE CASCADE
);
`;


// const createForeignKeys = `
// Alter table academy add foreign key (ownerId) references users(userId);
// Alter table enrollment add foreign key  (academyId) references academy(academyId);
// Alter table enrollment add foreign key  (userId) references users(userId);
// Alter table course add foreign key  (academyId) references academy(academyId);
// `;

// const createNewCustomer = `
// INSERT INTO customer VALUES(null, ?, ?, ?, ?, ?)
// `;

// const createNewCar = `
// INSERT INTO car VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?)
// `;

// const createNewReservation = `
// INSERT INTO reservation VALUES(null, ?, ?, ?, ?, ?, ?)
// `;


// const createNewAdmin = `
// INSERT INTO admin VALUES(null, ?, ?, ?, ?, ?, ?)
// `;

// const findCustomerByEmail = `
// SELECT * FROM customer WHERE email = ?
// `;

// const getAllCarsFiltered = `
// SELECT * FROM car WHERE active = false AND outOfService = false
// `;

// const getAllReservations = `
// SELECT * FROM reservation
// `;
// const getCustomers = `
// SELECT * FROM customer
// `;
// const getReservation  = `
// SELECT * FROM reservation where reservationDate=?
// `;

// const findReservationsByDates = `
// SELECT * FROM reservation WHERE pickupDate >= ? AND returnDate <= ?
// `;

// const findReservationsByDatesAndCarId = `
// SELECT * FROM reservation WHERE pickupDate = ? AND returnDate = ? AND carId = ?
// `;

// const findReservationByCustomerId = `
// SELECT * FROM reservation WHERE customerId = ?
// `;

// const findStatusOfAllCars = `
// SELECT c.active, c.outOfService, c.rented FROM car c WHERE 
// `;


// const findDailyPaymentsByDate = `
// SELECT paymentAmount FROM reservation WHERE reservationDate = ?
// `;

// const deleteCar = `
// DELETE FROM car WHERE carId = ?
// `;

// const updateCar = `
// UPDATE car SET plateId = ?, year = ?, model = ?, rented = ?, outOfService = ?, active = ?, pricePerDay = ?, officeId WHERE carId = ?
// `; 

// const deleteReservation =`
// DELETE FROM reservation WHERE reservationId = ?
// `;

// const deleteAdmin =`
// DELETE FROM admin WHERE adminId = ?
// `;

// const updateReservation = `
// UPDATE reservation SET  pickupDate = ?, returnDate = ?, carId = ?, paymentAmout = ?, customerId = ? WHERE reservationId  = ?
// `; 

// const updateAdmin = `
// UPDATE admin SET firstName = ?, lastName = ?, email = ?, password = ?, phoneNumber = ? WHERE adminId = ?
// `;

const createNewUser = `
INSERT INTO users (userId, name, email, photoURL, hasAcademy)
VALUES ($1, $2, $3, $4, $5);
`;

const getAllUsers = `
SELECT * FROM users
`;

const deleteUser = `
DELETE FROM users WHERE userId = $1
`;

const updateUser = `
UPDATE users SET name = $1, email = $2, photoURL = $3, hasAcademy = $4 WHERE userId = $5
`;

const createNewAcademy = `
INSERT INTO academy (name, description, subscriptionFee, ownerId) VALUES ($1, $2, $3, $4)
`;

const getAllAcademies = `
SELECT * FROM academy
`;

const deleteAcademy = `
DELETE FROM academy WHERE academyId = $1
`;

const updateAcademy = `
UPDATE academy SET name = $1, description = $2, subscriptionFee = $3, ownerId = $4 WHERE academyId = $5
`;

const getOneAcademy = `
SELECT * FROM academy WHERE ownerId = $1
`;

const getOneAcademyByAcademyId = `
SELECT * FROM academy WHERE academyId = $1
`;

const createNewCourse = `
INSERT INTO course (name, description, videoURL, academyId) VALUES ($1, $2, $3, $4)
`;

const getAllCoursesByAcademyId = `
SELECT * FROM course WHERE academyId = $1
`;

const deleteCourse = `
DELETE FROM course WHERE courseId = $1
`;

const updateCourse = `
UPDATE course SET name = $1, description = $2, videoURL = $3 WHERE courseId = $4
`;

const getOneCourseByCourseId = `
SELECT * FROM course WHERE courseId = $1
`;

const createNewEnrollment = `
INSERT INTO enrollment (academyId, userId, approved, instapayHandle) VALUES ($1, $2, $3, $4)
`;

const getAllEnrollmentsByAcademyId = `
SELECT * FROM enrollment WHERE academyId = $1
`;

const deleteEnrollment = `
DELETE FROM enrollment WHERE academyId = $1 AND userId = $2
`;

const updateEnrollment = `
UPDATE enrollment SET approved = $1, instapayHandle = $2 WHERE academyId = $3 AND userId = $4
`;

const getOneEnrollmentByAcademyIdAndUserId = `
SELECT * FROM enrollment WHERE academyId = $1 AND userId = $2
`;





module.exports = {
    // createDB,
    dropDB,
    
    createTableUsers,
    createTableAcademy,
    createTableEnrollment,
    createTableCourse,

    createNewUser,
    getAllUsers,
    deleteUser,
    updateUser,
    

    createNewAcademy,
    getAllAcademies,
    deleteAcademy,
    updateAcademy,
    getOneAcademy,
    getOneAcademyByAcademyId,


    createNewCourse,
    getAllCoursesByAcademyId,
    deleteCourse,
    updateCourse,
    getOneCourseByCourseId,

    createNewEnrollment,
    getAllEnrollmentsByAcademyId,
    deleteEnrollment,
    updateEnrollment,
    getOneEnrollmentByAcademyIdAndUserId,

    

    // createNewCustomer,
    // createNewAdmin,
    // createNewReservation,
    // createNewCar,
    
    // findCustomerByEmail,
    // findReservationsByDates,
    // findReservationsByDatesAndCarId,
    // findReservationByCustomerId,
    // findDailyPaymentsByDate,
    // findStatusOfAllCars,
    
    // getAllCarsFiltered,
    // getAllReservations,
    // getCustomers,
    // getReservation,
    
    // deleteCar,
    // deleteAdmin,
    // deleteReservation,
    
    // updateCar,
    // updateAdmin,
    // updateReservation
};