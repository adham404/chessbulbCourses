const {faker} = require('@faker-js/faker');
const mysql = require('mysql');
const { logger } = require('../../utils/logger');
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require('../../utils/secrets');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
});


const numberOfOffices = 1000;


// Generate random car data using Faker.js
const generateCarData = () => {
    const carId = null;
    const plateId = faker.vehicle.vin();
    const year = faker.number.int({ min: 2000, max: 2023})
    const model = faker.vehicle.model();
    const rented = faker.datatype.boolean();
    const outOfService = faker.datatype.boolean();
    const active = faker.datatype.boolean();
    const rentPerDay = faker.number.int({ min: 50, max: 200 });
    const officeId = faker.number.int({ min: 1, max: 50 });

    return { carId,plateId, year, model, rented, outOfService, active, rentPerDay, officeId};
};


const generateOfficeData = () => {
    const officeId = null;
    const country = faker.address.country();


    return { officeId, country};
};

// Populate the "car" table with data


const populateOfficeTable = () => {
    const officeData = [];

    for (let i = 0; i < 100; i++) {
        officeData.push(Object.values(generateOfficeData()));
    }

    const query = 'INSERT INTO office VALUES ?';
    connection.query(query, [officeData], (error, results) => {
        if (error) {
            logger.error('Error populating office table:', error);
        } else {
            logger.info('office table populated successfully!');
        }

        // Close the database connection
        connection.end();
    });
};


const populateCarTable = () => {
    const carData = [];

    for (let i = 0; i < 100; i++) {
        carData.push(Object.values(generateCarData()));
    }

    const query = 'INSERT INTO car VALUES ?';
    connection.query(query, [carData], (error, results) => {
        if (error) {
            logger.error('Error populating car table:', error);
        } else {
            logger.info('Car table populated successfully!');
        }

        // Close the database connection
        connection.end();
        process.exit(0)
    });
};



populateOfficeTable();

// Call the populateCarTable function to start populating the table
populateCarTable();

