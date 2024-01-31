const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// const authRoute = require('./src/routes/auth.route');

// const carRoute = require('./src/routes/car.route');

// const reservationRoute = require('./src/routes/reservation.route')

const userRoute = require('./src/routes/user.route')
const academyRoute = require('./src/routes/academy.route')
const videoRoute = require('./src/routes/video.route')
const courseRoute = require('./src/routes/course.route')
const enrollmentRoute = require('./src/routes/enrollment.route')
const adminRoute = require('./src/routes/admin.route')

const { httpLogStream } = require('./src/utils/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
app.use(cors());

// app.use('/api/auth', authRoute);
// app.use('/api', carRoute);
// app.use('/api', reservationRoute);

app.use('/api', userRoute);
app.use('/api', academyRoute)
app.use('/api', videoRoute)
app.use('/api', courseRoute)
app.use('/api', enrollmentRoute)
app.use('/api', adminRoute)


global.__basedir = __dirname;



app.get('/', (req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "API working fine"
        }
    });
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: "error",
        message: err.message
    });
    next();
});

module.exports = app;