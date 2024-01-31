const { Client } = require('pg');
const { logger } = require('../utils/logger');
const { DB_HOST, DB_USER, DB_PASS, DB_NAME , DB_PORT} = require('../utils/secrets');

const connection = new Client({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASS,
    database: DB_NAME,
    port: DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});


// restart the connection every 4 minutes
setInterval(() => {
    connection.query('SELECT 1', (err) => {
        if (err) {
            logger.error(err.message);
            connection.end();
            connection.connect((err) => {
                if (err) logger.error(err.message);
                else logger.info('Database connected')
            });
        }
    });
}, 4 * 60 * 1000);

connection.connect((err) => {
    if (err) logger.error(err.message);
    else logger.info('Database connected')
});



module.exports = connection;