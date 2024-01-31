const { Client } = require('pg');
const { logger } = require('../utils/logger');
const { DB_HOST, DB_USER, DB_PASS } = require('../utils/secrets');

const connection = new Client({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASS,
    ssl: {
        rejectUnauthorized: false
    }
});

connection.connect((err) => {
    if (err) logger.error(err.message);
});

module.exports = connection;