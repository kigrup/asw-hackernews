const express = require('express');
const app = express();
const db = require('./db/db');
const logger = require('./utils/logger');

const index = require('./routes/index');
const login = require('./routes/login');
const submit = require('./routes/submit');
const authenticateUser = require('./middlewares/authentication');

// Middlewares
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.static('public'));

// EJS
app.set('view engine', 'ejs');

// Routes
app.use('/', index);
app.use('/login', login);
app.use('/submit', authenticateUser, submit);

const port = process.env.PORT || 13001;

const start = async () => {
    try {
        logger.info('Testing database connection...');
        await db.sequelize.authenticate();
        logger.info('Connection has been established successfully.');
        logger.info('Syncing database...');
        db.sequelize.sync();
        logger.info('Syncronized database successfull.');
        app.listen(port, () =>
            logger.info(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        logger.info(error.message);
    }
};

start();
