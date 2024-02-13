const app = require('./app');
const { logger } = require('./src/utils/logger');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	app.timeout = 60000000;
    logger.info(`Running on PORT ${PORT}`);
});
